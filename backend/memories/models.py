from django.db import models
from events.models import Event, Guest

class Memory(models.Model):
    MEMORY_TYPES = (
        ('photo', 'Photo'),
        ('video', 'Video'),
        ('message', 'Text Message'),
    )
    
    STATUS_CHOICES = (
        ('pending', 'Pending Approval'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    )

    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='memories')
    guest = models.ForeignKey(Guest, on_delete=models.SET_NULL, null=True, related_name='memories')
    type = models.CharField(max_length=10, choices=MEMORY_TYPES, default='message')
    content = models.TextField(blank=True)
    media_url = models.URLField(blank=True, null=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='approved')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.get_type_display()} by {self.guest.name if self.guest else 'Unknown'} for {self.event.title}"
