from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from .models import Memory
from .serializers import MemorySerializer, MemoryModerationSerializer
from events.models import Event

class MemoryViewSet(viewsets.ModelViewSet):
    """
    CRUD API for Memories.
    Includes moderation endpoints for the host.
    """
    
    def get_queryset(self):
        # We handle filtering in list() based on query params and user role
        if getattr(self, 'swagger_fake_view', False):
            return Memory.objects.none()
        return Memory.objects.all()

    def get_serializer_class(self):
        if self.action in ['moderate']:
            return MemoryModerationSerializer
        return MemorySerializer

    def get_permissions(self):
        if self.action in ['create', 'list_for_event']:
            return [permissions.AllowAny()]  # Let guests post/view
        return [permissions.IsAuthenticated()]  # Hosts need auth to manage/moderate

    # Host view of all memories for their events
    def list(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
            
        event_id = request.query_params.get('event_id')
        if event_id:
            queryset = Memory.objects.filter(event_id=event_id, event__host=request.user)
        else:
            queryset = Memory.objects.filter(event__host=request.user)
            
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    # Guest view of approved memories for an event
    @action(detail=False, methods=['get'], url_path='event/(?P<event_id>[^/.]+)', permission_classes=[permissions.AllowAny])
    def list_for_event(self, request, event_id=None):
        event = get_object_or_404(Event, pk=event_id)
        # Guests only see approved memories
        queryset = Memory.objects.filter(event=event, status='approved').order_by('-created_at')
        serializer = MemorySerializer(queryset, many=True)
        return Response(serializer.data)
        
    def perform_create(self, serializer):
        # Check if the event requires approval
        event = serializer.validated_data.get('event')
        assigned_status = 'pending' if event.settings.require_approval else 'approved'
        serializer.save(status=assigned_status)

    @action(detail=True, methods=['put'])
    def moderate(self, request, pk=None):
        """Host approves or rejects a memory."""
        memory = self.get_object()
        
        # Verify user is host
        if memory.event.host != request.user:
            return Response({"error": "Only the host can moderate"}, status=status.HTTP_403_FORBIDDEN)
            
        serializer = MemoryModerationSerializer(memory, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
