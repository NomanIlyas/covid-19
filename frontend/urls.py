from django.urls import path
from django.conf.urls import url
from . import views
app_name="c19"
urlpatterns = [
    path('', views.index,name="index"),

    path('world/', views.world,name="world"),

    path('blogs', views.blogs,name="blogs"),

    path('news/', views.news,name="news"),

    # url(r'^world/(?P<name>[a-z]+)/$', views.country,name="world" ),

    url(r'^country/(?P<name>[0-9]+)/$', views.country,name="country"),
    # url(r'^states/(?P<state_id>[0-9]+)/$', views.states,name="states"),
    path('states/<state_id>/', views.states,name="states"),

    path('united_states/', views.united_states,name="united_states"),

    path('importStates/', views.importStates),

    path('importCountries/', views.importCountries),

    path('google_sheet/', views.google_sheet),

    path('vaccinecounts/', views.vaccinecounts),

    path('world_Country_province/', views.world_Country_province),

    path('national_employment/', views.national_employment),

    path('consumer_spending/', views.consumer_spending),

    path('import_counties_data/', views.import_counties_data),
]