from django.contrib import admin
from .models import Event, EventSettings, EventAccess, Guest

class EventSettingsInline(admin.StackedInline):
    model = EventSettings

class EventAccessInline(admin.StackedInline):
    model = EventAccess

class EventAdmin(admin.ModelAdmin):
    inlines = [EventSettingsInline, EventAccessInline]
    list_display = ('title', 'host', 'date', 'is_published')
    prepopulated_fields = {'slug': ('title',)}

admin.site.register(Event, EventAdmin)
admin.site.register(Guest)
