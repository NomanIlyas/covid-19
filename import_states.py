from django.core.management.base import BaseCommand
from django.utils import timezone
from frontend import views

class Command(BaseCommand):
    print("state commands is working")
    def handle2(self, *args, **kwargs):
        response = views.importStates()
        print("state commands is working")
        self.stdout.write("States data have been imported Now: %s" % response)
class StateCountiesRecord(BaseCommand):
    print("HistoricalCountiesRecord commands is working")
    def CountiesRecordhandle(self, *args, **kwargs):
        response = views.import_counties_data()
        print("HistoricalCountiesRecord commands is working")
        self.stdout.write("States data have been imported Now: %s" % response)