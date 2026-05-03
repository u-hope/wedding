from django.contrib import admin
from .models import Memory

class MemoryAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'event', 'status', 'created_at')
    list_filter = ('status', 'event', 'type')
    search_fields = ('content', 'guest__name')

admin.site.register(Memory, MemoryAdmin)
