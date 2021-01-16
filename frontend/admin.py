import json

from django.contrib import admin
from .models import Country,CountryFlag,State,CovidRecordUpdateSetting
from django.core.serializers.json import DjangoJSONEncoder
from django.db.models import Count
from django.db.models.functions import TruncDay
from .models import Country,CountryFlag,State,CovidRecordUpdateSetting,CovidMobility,CovidVaccin,WorldCountryProvinceRecord,NationalEmployment,ConsumerSpending,HistoricalCountiesRecord

admin.site.site_header = "The Covid Center Admin Panel"
admin.site.site_title = "The Covid Center"
admin.site.index_title = "The Covid Center"


class CountryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', "total_cases", "new_cases", "total_death", "new_death", "total_recovered", "active_cases", "serious_critical", "total_cases_1m_pop", "deaths_1m_pop", "total_test", "test_1m_pop", "population", "date")
    search_fields = ('name', "total_cases", "new_cases", "total_death", )
    list_max_show_all = 25
    ordering = ['pk']
    list_filter = ("name",)
    list_display_links = ['name']
    change_list_template = 'change_list.html'
    def changelist_view(self, request, extra_context=None):
        # Aggregate new subscribers per day
        chart_data = (
            Country.objects.values('name','total_cases','new_cases')[:22]
        )
        # Serialize and attach the chart data to the template context
        as_json = json.dumps(list(chart_data), cls=DjangoJSONEncoder)
        extra_context = extra_context or {"chart_data": as_json}

        # Call the superclass changelist_view to render the page
        return super().changelist_view(request, extra_context=extra_context)
admin.site.register(Country,CountryAdmin)


class CountryFlagAdmin(admin.ModelAdmin):

    list_display = ('id', 'country_name', 'country_flag_image', 'country_code', )
    list_max_show_all = 25
    ordering = ['pk']
    list_filter = ("country_name",)


admin.site.register(CountryFlag, CountryFlagAdmin)

#
class StateAdmin(admin.ModelAdmin):

    list_display = ('id', 'fips', 'country', 'state', 'population',
                    'metrics_testPositivityRatio', 'metrics_caseDensity', 'metrics_contactTracerCapacityRatio',
                    'metrics_infectionRate', 'metrics_infectionRateCI90', 'metrics_icuHeadroomRatio',
                    'metrics_icuHeadroomDetails_currentIcuCovid',
                    'metrics_icuHeadroomDetails_currentIcuNonCovid',
                    'actuals_cases', 'actuals_deaths','actuals_positiveTests', 'actuals_negativeTests','actuals_contactTracers',
                    'actuals_hospitalBeds_capacity','actuals_hospitalBeds_currentUsageCovid',
                    'actuals_hospitalBeds_typicalUsageRate','actuals_icuBeds_capacity',
                    'actuals_icuBeds_currentUsageCovid', 'lastUpdatedDate',)
    list_max_show_all = 25
    list_filter = ['state']
    search_fields = ('country', 'state',)
    change_list_template = 'change_state_list.html'
    def changelist_view(self, request, extra_context=None):
        # Aggregate new subscribers per day
        chart_data = (
            State.objects.values('state','population','actuals_cases')
        )

        # Serialize and attach the chart data to the template context
        as_json = json.dumps(list(chart_data), cls=DjangoJSONEncoder)
        extra_context = extra_context or {"chart_data": as_json}

        # Call the superclass changelist_view to render the page
        return super().changelist_view(request, extra_context=extra_context)


admin.site.register(State, StateAdmin)

class CovidRecordUpdateSettingAdmin(admin.ModelAdmin):

    list_display = ('id', 'days', 'hour', 'minutes', 'seconds')
admin.site.register(CovidRecordUpdateSetting, CovidRecordUpdateSettingAdmin)



class CovidMobilityAdmin(admin.ModelAdmin):
    list_display = ('id', 'country', 'date', 'retailRecreation', 'groceryPharmacy', 'groceryPharmacy', 'parks', 'transitStations', 'workplaces', 'residential', 'diving', 'residential', 'transit', 'walking')
    list_max_show_all = 25
    ordering = ['pk']
    search_fields = ('country',)
    list_filter = ("country",)


admin.site.register(CovidMobility, CovidMobilityAdmin)



class CovidVaccinAdmin(admin.ModelAdmin):

    list_display = ('id', 'status', 'stage1', 'stage2', 's3Phase1', 's3Phase2', 's3Phase3', 'stage4', 'stage5',)
    list_max_show_all = 25
    ordering = ['pk']
    search_fields = ('status',)
    list_filter = ("status",)

admin.site.register(CovidVaccin, CovidVaccinAdmin)


class WorldCountryProvinceRecordAdmin(admin.ModelAdmin):

    list_display = ('country_region_code', 'country_region', 'sub_region_1', 'sub_region_2', 'metro_area', 'iso_3166_2_code', 'census_fips_code', 'retail_and_recreation_percent_change_from_baseline', 'grocery_and_pharmacy_percent_change_from_baseline', 'parks_percent_change_from_baseline', 'transit_stations_percent_change_from_baseline', 'workplaces_percent_change_from_baseline', 'residential_percent_change_from_baseline', 'date',)
    list_max_show_all = 25
    ordering = ['pk']
    search_fields = ('country_region_code', 'country_region')
    list_filter = ("country_region_code", 'country_region')

admin.site.register(WorldCountryProvinceRecord, WorldCountryProvinceRecordAdmin)


class NationalEmploymentAdmin(admin.ModelAdmin):

    list_display = ('year', 'month', 'day', 'emp_combined', 'emp_combined_inclow', 'emp_combined_incmiddle', 'emp_combined_ss40', 'emp_combined_ss60', 'emp_combined_ss65', 'emp_combined_ss70', 'emp_combined_advance')
    list_max_show_all = 25
    ordering = ['pk']
    search_fields = ('year', 'month')
    list_filter = ('year', 'month')

admin.site.register(NationalEmployment, NationalEmploymentAdmin)


class NationalEmploymentAdmin(admin.ModelAdmin):

    list_display = ('year', 'month', 'day', 'statefips', 'freq', 'spend_acf', 'spend_aer', 'spend_all', 'spend_apg', 'spend_grf', 'spend_hcs', 'spend_tws', 'spend_all_inchigh', 'spend_all_inclow', 'spend_all_incmiddle', 'spend_retail_w_grocery', 'spend_retail_no_grocery', 'provisional')
    list_max_show_all = 25
    ordering = ['pk']
    search_fields = ('year', 'month')
    list_filter = ('year', 'month')

admin.site.register(ConsumerSpending, NationalEmploymentAdmin)


class HistoricalCountiesRecordAdmin(admin.ModelAdmin):

    list_display = ('fips', 'country', 'state', 'county', 'level', 'lat', 'locationId',
                    'long', 'population', 'metrics_testPositivityRatio', 'metrics_caseDensity', 'metrics_contactTracerCapacityRatio', 'metrics_infectionRate', 'metrics_infectionRateCI90', 'metrics_icuHeadroomRatio',
                    'metrics_icuHeadroomDetails', 'riskLevels_overall', 'riskLevels_testPositivityRatio', 'riskLevels_caseDensity', 'riskLevels_contactTracerCapacityRatio', 'riskLevels_infectionRate', 'riskLevels_icuHeadroomRatio', 'actuals_cases',
                    'actuals_deaths', 'actuals_positiveTests', 'actuals_negativeTests', 'actuals_contactTracers', 'actuals_hospitalBeds_capacity', 'actuals_hospitalBeds_currentUsageTotal', 'actuals_hospitalBeds_currentUsageCovid', 'actuals_hospitalBeds_typicalUsageRate',
                    'actuals_icuBeds_capacity', 'actuals_icuBeds_currentUsageTotal', 'actuals_icuBeds_currentUsageCovid', 'actuals_icuBeds_typicalUsageRate', 'actuals_newCases', 'lastUpdatedDate')
    list_max_show_all = 25
    ordering = ['pk']
    search_fields = ('country', 'state',)
    list_filter = ('country', 'state',)

admin.site.register(HistoricalCountiesRecord, HistoricalCountiesRecordAdmin)

