from rest_framework import serializers
from .models import Event, EventSettings, EventAccess, Guest
from users.serializers import UserSerializer

class EventSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventSettings
        fields = ('primary_color', 'font_family', 'cover_image_url', 'theme', 'require_approval')

class EventAccessSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventAccess
        fields = ('access_type', 'access_code')
        extra_kwargs = {'access_code': {'write_only': True}} # Mostly for checking, don't expose lightly

class GuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guest
        fields = ('id', 'name', 'email', 'joined_at')
        read_only_fields = ('id', 'joined_at')

class EventSerializer(serializers.ModelSerializer):
    settings = EventSettingsSerializer(read_only=True)
    access_settings = EventAccessSerializer(read_only=True)
    host_details = UserSerializer(source='host', read_only=True)

    class Meta:
        model = Event
        fields = (
            'id', 'title', 'description', 'date', 'location', 
            'slug', 'join_code', 'is_published', 'created_at', 
            'settings', 'access_settings', 'host', 'host_details'
        )
        read_only_fields = ('id', 'slug', 'created_at', 'host')

class EventCreateUpdateSerializer(serializers.ModelSerializer):
    settings = EventSettingsSerializer(required=False)
    access_settings = EventAccessSerializer(required=False)

    class Meta:
        model = Event
        fields = (
            'title', 'description', 'date', 'location', 
            'join_code', 'is_published', 'settings', 'access_settings'
        )

    def create(self, validated_data):
        settings_data = validated_data.pop('settings', {})
        access_data = validated_data.pop('access_settings', {})
        
        event = Event.objects.create(**validated_data)
        EventSettings.objects.create(event=event, **settings_data)
        EventAccess.objects.create(event=event, **access_data)
        
        return event

    def update(self, instance, validated_data):
        settings_data = validated_data.pop('settings', None)
        access_data = validated_data.pop('access_settings', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if settings_data is not None:
            settings_instance, _ = EventSettings.objects.get_or_create(event=instance)
            for attr, value in settings_data.items():
                setattr(settings_instance, attr, value)
            settings_instance.save()

        if access_data is not None:
            access_instance, _ = EventAccess.objects.get_or_create(event=instance)
            for attr, value in access_data.items():
                setattr(access_instance, attr, value)
            access_instance.save()

        return instance
