#========================================
# Scheduler Jobs
#========================================
from apscheduler.schedulers.background import BackgroundScheduler
from pytz import utc
import scheduler_jobs
import import_countries,import_states
from frontend.management.commands import import_countries, import_states
from frontend.models import CovidRecordUpdateSetting
scheduler = BackgroundScheduler()
scheduler.configure(timezone=utc)
# jobs
query = CovidRecordUpdateSetting.objects.filter(pk=1)

for q in query:
    print(q.days)
    d = q.days
    h = q.hour
    m = q.minutes
    s = q.seconds

scheduler.add_job(scheduler_jobs.handle1, 'interval', minutes=50)
scheduler.add_job(scheduler_jobs.handle2, 'interval', minutes=50)
scheduler.add_job(scheduler_jobs.CountiesRecordhandle, 'interval', minutes=50)

# scheduler.add_job(import_countries.Command, 'interval',seconds=10)

scheduler.add_job(import_states.Command, 'interval',seconds=10)

scheduler.start()
#========================================