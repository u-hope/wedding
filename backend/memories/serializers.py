from rest_framework import serializers
from .models import Memory
from events.serializers import GuestSerializer

class MemorySerializer(serializers.ModelSerializer):
    guest_details = GuestSerializer(source='guest', read_only=True)
    
    class Meta:
        model = Memory
        fields = ('id', 'event', 'guest', 'guest_details', 'type', 'content', 'media_url', 'status', 'created_at')
        read_only_fields = ('id', 'status', 'created_at')

# Serializer for hosts who can also update the status
class MemoryModerationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Memory
        fields = ('id', 'status')
