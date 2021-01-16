from django.core.management.base import BaseCommand
from django.utils import timezone
from frontend import views

class Command(BaseCommand):

    def handle(self, *args, **kwargs):
        response = views.importStates()
        self.stdout.write("States data have been imported Now: %s" % response)