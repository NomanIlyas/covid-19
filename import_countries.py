from django.core.management.base import BaseCommand
from django.utils import timezone
from frontend import views

class Command(BaseCommand):
    print("working")
    def handle1(self, *args, **kwargs):
        response = views.importCountries()
        print("working")
        self.stdout.write("Counties data have been imported Now: %s" % response)