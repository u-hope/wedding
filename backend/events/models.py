from django.db import models
from django.conf import settings
from django.utils.text import slugify

class Event(models.Model):
    host = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='events')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    date = models.DateTimeField(null=True, blank=True)
    location = models.CharField(max_length=255, blank=True)
    slug = models.SlugField(unique=True, blank=True)
    join_code = models.CharField(max_length=20, unique=True, blank=True, null=True)
    is_published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title)
            slug = base_slug
            counter = 1
            while Event.objects.filter(slug=slug).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

class EventSettings(models.Model):
    event = models.OneToOneField(Event, on_delete=models.CASCADE, related_name='settings')
    primary_color = models.CharField(max_length=20, default='#E27D60') # Rose gold
    font_family = models.CharField(max_length=50, default='Playfair Display')
    cover_image_url = models.URLField(blank=True, null=True)
    theme = models.CharField(max_length=50, default='default')
    require_approval = models.BooleanField(default=False)
    
    def __str__(self):
        return f"Settings for {self.event.title}"

class EventAccess(models.Model):
    ACCESS_TYPES = (
        ('public', 'Public (Anyone with link)'),
        ('code', 'Access Code Required'),
        ('invite', 'Invite Only'),
    )
    event = models.OneToOneField(Event, on_delete=models.CASCADE, related_name='access_settings')
    access_type = models.CharField(max_length=20, choices=ACCESS_TYPES, default='public')
    access_code = models.CharField(max_length=50, blank=True, null=True)
    
    def __str__(self):
        return f"Access for {self.event.title}"

class Guest(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='guests')
    name = models.CharField(max_length=255)
    email = models.EmailField(blank=True, null=True)
    joined_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('event', 'email')
        
    def __str__(self):
        return f"{self.name} at {self.event.title}"
