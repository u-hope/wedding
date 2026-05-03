from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Event, Guest, EventAccess
from .serializers import EventSerializer, EventCreateUpdateSerializer, GuestSerializer

class IsEventHost(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.host == request.user

class EventViewSet(viewsets.ModelViewSet):
    """
    CRUD API for Events (Host view).
    """
    def get_queryset(self):
        # Users only see their own events
        if getattr(self, 'swagger_fake_view', False):
            return Event.objects.none()
        if self.request.user.is_authenticated:
            return Event.objects.filter(host=self.request.user)
        return Event.objects.none()

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return EventCreateUpdateSerializer
        return EventSerializer

    def get_permissions(self):
        if self.action in ['join', 'public_info']:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated(), IsEventHost()]
        
    def perform_create(self, serializer):
        serializer.save(host=self.request.user)

    @action(detail=False, methods=['get'], url_path='by-slug/(?P<slug>[^/.]+)', permission_classes=[permissions.AllowAny])
    def public_info(self, request, slug=None):
        """Get public info about an event via slug"""
        event = get_object_or_404(Event, slug=slug, is_published=True)
        serializer = EventSerializer(event)
        # Strip sensitive data if needed, or create a specific PublicEventSerializer
        return Response(serializer.data)

    @action(detail=False, methods=['post'], url_path='by-slug/(?P<slug>[^/.]+)/join', permission_classes=[permissions.AllowAny])
    def join(self, request, slug=None):
        """Guest joins an event"""
        event = get_object_or_404(Event, slug=slug, is_published=True)
        
        # Check access code if required
        access_type = event.access_settings.access_type
        if access_type == 'code':
            provided_code = request.data.get('access_code')
            if provided_code != event.access_settings.access_code:
                return Response({"error": "Invalid access code"}, status=status.HTTP_403_FORBIDDEN)
                
        # Create Guest
        guest_name = request.data.get('name')
        guest_email = request.data.get('email', '')
        
        if not guest_name:
            return Response({"error": "Name is required"}, status=status.HTTP_400_BAD_REQUEST)
            
        guest, created = Guest.objects.get_or_create(
            event=event, 
            email=guest_email if guest_email else f"anon_{guest_name.lower().replace(' ', '_')}@temp.com",
            defaults={'name': guest_name}
        )
        
        # In a real app we might return a JWT just for this guest session
        # For simplicity, returning guest ID or setting a session cookie
        # We will use simple IDs for the React frontend demo
        
        return Response({
            "message": "Successfully joined", 
            "guest": GuestSerializer(guest).data,
            "event": EventSerializer(event).data
        })
