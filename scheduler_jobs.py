from datetime import datetime
from pytz import utc
from django.core.management.base import BaseCommand
from django.utils import timezone
from frontend import views

class Command(BaseCommand):

    def handle1(self, *args, **kwargs):
        response = views.importCountries()
        print("execute country from outside ")
        self.stdout.write("Counties data have been imported Now: %s" % response)

    def handle2(self, *args, **kwargs):
        response = views.importCountries()
        print("execute State from outside")
        self.stdout.write("Counties data have been imported Now: %s" % response)

    def CountiesRecordhandle(self, *args, **kwargs):
        response = views.import_counties_data()
        print("execute State from outside")
        self.stdout.write("Counties data have been imported Now: %s" % response)


def handle1():
    response = views.importCountries()
    print("execute country from outside ")
    # self.stdout.write("Counties data have been imported Now: %s" % response)
def handle2():
    response = views.importStates()
    print("execute State from outside")
    # self.stdout.write("Counties data have been imported Now: %s" % response)

def CountiesRecordhandle():
    response = views.import_counties_data()
    print("execute CountiesRecordhandle from outside")
    # self.stdout.write("Counties data have been imported Now: %s" % response)


