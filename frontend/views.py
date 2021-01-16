import datetime
import glob


from django.db.models import Sum, Avg,Count
from django.utils import timezone
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
import covid_daily
import requests
from django.db.models import Q
from frontend.models import Country, State, CovidVaccin, CovidMobility,WorldCountryProvinceRecord,WorldCountryProvinceRecord,NationalEmployment,ConsumerSpending,HistoricalCountiesRecord
import json
import itertools
from django.core import serializers
from django.db import connection
import dictfier
import os
import csv
import gspread
import pandas as pd


def vaccinecounts(request):
    url = 'template/VaccineCounts.csv'
    with open(url, 'r') as file:
        data = csv.reader(file)
        count = 0
        for key in data:
            status = key[0]
            stage1 = key[1]
            stage2 = key[2]
            s3Phase1 = key[3]
            s3Phase2 = key[4]
            s3Phase3 = key[5]
            stage4 = key[6]
            stage5 = key[7]
            mobilitydata = CovidVaccin.objects.create(status=status, stage1=stage1,
                                                        stage2=stage2,
                                                        s3Phase1=s3Phase1, s3Phase2=s3Phase2,
                                                        s3Phase3=s3Phase3, stage4=stage4,
                                                        stage5=stage5)
            mobilitydata.save()
    return HttpResponse("test")

def google_sheet(request):
    url = 'template/MobilityData.csv'
    with open(url, 'r') as file:
        data = csv.reader(file)
        count = 0
        for key in data:
            country = key[0]
            date = key[1]
            retailRecreation = key[2]
            groceryPharmacy = key[3]
            parks = key[4]
            transitStations = key[5]
            workplaces = key[6]
            residential = key[7]
            diving = key[8]
            transit = key[9]
            walking = key[10]
            mobilitydata = CovidMobility.objects.create(country=country,date=date,
                                                        retailRecreation=retailRecreation,
                                                        groceryPharmacy=groceryPharmacy,
                                                        parks=parks,transitStations=transitStations,
                                                        workplaces=workplaces,residential=residential,
                                                        diving=diving,transit=transit,walking=walking)
            mobilitydata.save()
    return HttpResponse("test")


def index(requests):
    overview = covid_daily.overview(as_json=True)
    # print(overview)
    data = []
    state_records = State.objects.all()[:30]
    updated_date = State.objects.get(pk=54)
    print("\t======================\t",updated_date.lastUpdatedDate)
    world = Country.objects.all()
    cursor = connection.cursor()
    cursor.execute('SELECT sum(total_cases) from frontend_country limit 30')
    total_world_cases = cursor.fetchone()[0]
    cursor.execute('SELECT sum(active_cases) from frontend_country limit 30')
    mild_cases = cursor.fetchone()[0]
    cursor.execute('SELECT sum(serious_critical) from frontend_country limit 30')
    serious_critical = cursor.fetchone()[0]
    cursor.execute('SELECT sum(total_recovered) from frontend_country limit 30')
    total_recovered = cursor.fetchone()[0]
    cursor.execute('SELECT sum(total_death) from frontend_country limit 30')
    total_death = cursor.fetchone()[0]
    closed_cases = total_world_cases - mild_cases

    data = ['{:,}'.format(total_world_cases), '{:,}'.format(mild_cases), '{:,}'.format(serious_critical), '{:,}'.format(closed_cases), '{:,}'.format(total_recovered), '{:,}'.format(total_death)]

    ongoing = CovidVaccin.objects.get(status="Ongoing")
    success = CovidVaccin.objects.get(status="Success")
    print(ongoing.stage1)
    #
    nationalEmployment = NationalEmployment.objects.all().aggregate(Sum('emp_combined'))['emp_combined__sum']

    nationalEmploymentMiddle = NationalEmployment.objects.all().aggregate(Sum('emp_combined_incmiddle'))[
        'emp_combined_incmiddle__sum']

    nationalEmploymentMiddle = nationalEmploymentMiddle / 2

    nationalEmploymentLow = NationalEmployment.objects.all().aggregate(Sum('emp_combined_inclow'))[
        'emp_combined_inclow__sum']

    EmploymentLow = NationalEmployment.objects.values('emp_combined_inclow', 'emp_combined_incmiddle', 'emp_combined','month')
    SumEmploymentLow = NationalEmployment.objects.values('emp_combined_inclow').aggregate(Sum('emp_combined_inclow'))
    SumEmploymentmiddle = NationalEmployment.objects.values('emp_combined_incmiddle').aggregate(Sum('emp_combined_incmiddle'))
    SumEmploymenthigh = NationalEmployment.objects.values('emp_combined_inclow', 'emp_combined_incmiddle', 'emp_combined','month').aggregate(Sum('emp_combined_inclow'))

    emp_low = []
    emp_middle = []
    emp_high = []
    emp_month = []
    EmploymentState = []
    for emp in EmploymentLow:
        emp_low.append(emp['emp_combined_inclow'])
        emp_high.append(emp['emp_combined'])
        emp_middle.append(emp['emp_combined_incmiddle'])
        emp_month.append(emp['month'])
        EmploymentState.append(emp['emp_combined_inclow'])
        EmploymentState.append(emp['emp_combined'])
        EmploymentState.append(emp['emp_combined_incmiddle'])
    print("========= Employee Low  ==========\t\t:",emp_low)
    # country record
    country_name = []
    country_population = []
    country_total_cases = []
    countryId = []

    worldMapData = Country.objects.values('pk','name','population','total_cases')
    worldMapData2 = Country.objects.values('name').order_by('name')
    cntr = 1
    for wdata in worldMapData2:
        country_name.append(wdata['name'])
        cntr=cntr+1
    for wmd in worldMapData:
        countryId.append(wmd['pk'])

        country_population.append(wmd['total_cases'])
        country_total_cases.append(wmd['total_cases'])
    context = {
        # world map data
        'countryId':countryId,
        'country_name':country_name,
        'country_population':country_population,
        'country_total_cases':country_total_cases,
        # end
        'EmploymentState':EmploymentState,
        'nationalEmployment':nationalEmployment,
        'nationalEmploymentMiddle':nationalEmploymentMiddle,
        'nationalEmploymentLow':nationalEmploymentLow,
        'emp_low':emp_low,
        'emp_middle':emp_middle,
        'emp_high':emp_high,
        'emp_month':emp_month,
        'state_records':state_records,
        'updated_date':updated_date,
        'world':world,
        'data':data,
        'success':success,
        'ongoing':ongoing,
    }
    return render(requests,'index.html', context)

def country(requests,name):

    print(str(name))
    country_records = Country.objects.get(pk=name)

#     province_record2 = WorldCountryProvinceRecord.objects.values(country_region'') \
#     .annotate(WorldCountryProvinceRecord_retail_and_recreation_percent_change_from_baseline=Sum('province_record2 = WorldCountryProvinceRecord.objects.values(country_region=country_records.name) \
# ')) \
#     .order_by('-sub_region_1')
    # print("\t======================\t", province_record.sub_region_1)
    cursor = connection.cursor()
    # plot chart record
    # states FED Balance Sheet
    retail_recreation_data = []
    retail_recreation_labels = []
    queryset = CovidMobility.objects.values('date','retailRecreation')[:5]
    print(str(len(queryset)))
    for entry in queryset:
        retail_recreation_labels.append(entry['date'])
        retail_recreation_data.append(entry['retailRecreation'])
    # return JsonResponse(data={
    #     'retail_recreation_labels': retail_recreation_labels,
    #     'retail_recreation_data': retail_recreation_data,
    # })
    # updated_state = cursor.execute("SELECT ")
    retailrecreation = cursor.execute('SELECT retailRecreation from frontend_covidmobility where country = "United States" ')

    cur = connection.cursor()
    dateofretails = cur.execute('SELECT date from frontend_covidmobility where country = "United States" ')
    resident = connection.cursor()
    country_name = country_records.name
    print("country name get function ===================", country_name)
    us_covismobility_record = CovidMobility.objects.filter(Q(country=country_name))[:100]
    resid =[]
    grocery =[]
    park =[]
    transit =[]
    work_place =[]
    data = []
    label = []
    # ============== convert to list to plot graph =========== #
    # work_place
    for work in us_covismobility_record:
        work_place.append(work.workplaces)

    # transitStations
    for trans in us_covismobility_record:
        transit.append(trans.transitStations)
    # parks

    for prk in us_covismobility_record:
        park.append(prk.parks)

    # grocerypharmacy
    for groc in us_covismobility_record:
        grocery.append(groc.groceryPharmacy)

    # resident
    for resi in us_covismobility_record:
        resid.append(resi.residential)


    for entry in dateofretails:
        result = list(entry)
        label.append(result)

    for ent in retailrecreation:
        res = list(ent)
        data.append(res)

    #     key indicator graph ploting
    state_record = State.objects.all()
    # for a in state_record:
    #     print(a)

    countryCase = Country.objects.get(Q(name=country_name))
    CN = countryCase.name
    cntry_city = []

    cntry_city.append(countryCase.population)
    cntry_city.append(countryCase.new_cases)
    cntry_city.append(countryCase.total_death)
    cntry_city.append(countryCase.active_cases)
    cntry_city.append(countryCase.total_cases_1m_pop)
    lable_city = []
    lable_city.append("Population")
    lable_city.append("New Cases")
    lable_city.append("Total Death")
    lable_city.append("Active Cases")
    lable_city.append("Total Cases 1m pop")

    # states_record = State.objects.filter(Q('lastUpdatedDate')).annotate()
    # united state graphs
    actuallcases = State.objects.filter(Q(country=country_name))
    act_date = []
    act_cases = []
    act_death = []
    act_population = []
    act_infection = []
    testPositivityRatio = []
    hospitalBeds_currentUsageTotal = []

    for act in actuallcases:
        act_date.append(act.state)

    for act in actuallcases:
        act_cases.append(act.actuals_cases)

    for act in actuallcases:
        act_death.append(act.actuals_deaths)

    for act in actuallcases:
        act_population.append(act.population)

    for act in actuallcases:
        act_infection.append(act.metrics_infectionRate)

    for act in actuallcases:
        testPositivityRatio.append(act.metrics_testPositivityRatio)

    for act in actuallcases:
        hospitalBeds_currentUsageTotal.append(act.actuals_hospitalBeds_currentUsageTotal)

    # retail and recreation model record name:province_record
    countryretailrecreation = []

    countryResidential = []

    groceryPharmacy = []

    countryparks = []

    countryrTransit = []

    countryWorkplaces = []

    dateLabel = []

    province_record1 = WorldCountryProvinceRecord.objects.filter(country_region=country_records.name).count()

    fourth = (province_record1*4)/100
    print(fourth)
    province_record = WorldCountryProvinceRecord.objects.filter(country_region=country_records.name)[:50]
    # countryretailrecreationtest = WorldCountryProvinceRecord.objects.filter(Q(country_region=country_records.name)).annotate(dcount=Count('sub_region_1'))
    # countryretailrecreationtest = Count('worldcountryprovincerecord', filter=Q(worldcountryprovincerecord_country_region=country_records.name))
    cursor = connection.cursor()
    # countryretailrecreationtest = cursor.execute('SELECT avg(retail_and_recreation_percent_change_from_baseline),sub_region_1 from WorldCountryProvinceRecord having country_region = country_records.name GROUP BY  sub_region_1')
    countryretailrecreationtest= WorldCountryProvinceRecord.objects.filter(country_region=country_records.name)[:50]

    print(countryretailrecreation)
    for re in countryretailrecreationtest:
        countryretailrecreation.append(re.retail_and_recreation_percent_change_from_baseline)

    for province in province_record:

        dateLabel.append(province.date)
        # countryretailrecreation.append(province.retail_and_recreation_percent_change_from_baseline)
        countryResidential.append(province.residential_percent_change_from_baseline)
        groceryPharmacy.append(province.grocery_and_pharmacy_percent_change_from_baseline)
        countryparks.append(province.parks_percent_change_from_baseline)
        countryrTransit.append(province.transit_stations_percent_change_from_baseline)
        countryWorkplaces.append(province.workplaces_percent_change_from_baseline)
    # print(countryretailrecreation)

    context = {
        'country_records':country_records,

        'data': data, 'label': label,

        'retail_recreation_labels': retail_recreation_labels,

        'retail_recreation_data': retail_recreation_data,

        'act_cases': act_cases,

        'act_date': act_date,

        'act_death': act_death,

        'act_population': act_population,

        'act_infection': act_infection,

        'testPositivityRatio': testPositivityRatio,

        'hospitalBeds_currentUsageTotal': hospitalBeds_currentUsageTotal,

        'cntry_city': cntry_city,
        'lable_city': lable_city,
        'CN': CN,
        'countryretailrecreation': countryretailrecreation,
        'dateLabel': dateLabel,
        'countryResidential': countryResidential,
        'groceryPharmacy': groceryPharmacy,
        'countryparks': countryparks,
        'countryrTransit': countryrTransit,
        'countryWorkplaces': countryWorkplaces,
    }
    return render(requests,'country.html',context)


def world(requests):
    world = Country.objects.all()
    context = {
        'world':world
    }
    return render(requests,'world.html',context)


def blogs(requests):
    return render(requests,'blogs.html')

def consumer_spending(request):
    path = "template/Region_Mobility_Report_CSVs/"
    a = 0
    fname = "template/EconomicTracker-main/Affinitystate.csv"
    with open(fname, 'r') as file:
            data = csv.reader(file)
            count = 0
            for key in data:
                mobilitydata = ConsumerSpending.objects.create(
                                                                 year=key[0],
                                                                 month=key[1],
                                                                 day=key[2],
                                                                 statefips=key[3],
                                                                 freq=key[4],
                                                                 spend_acf=key[5],
                                                                 spend_aer=key[6],
                                                                 spend_all=key[7],
                                                                 spend_apg=key[8],
                                                                 spend_grf=key[9],
                                                                 spend_hcs=key[10],
                                                                 spend_tws=key[11],
                                                                 spend_all_inchigh=key[12],
                                                                 spend_all_inclow=key[13],
                                                                 spend_all_incmiddle=key[14],
                                                                 spend_retail_w_grocery=key[15],
                                                                 spend_retail_no_grocery=key[16],
                                                                 provisional=key[17],
                                                                 )
                mobilitydata.save()
    return HttpResponse("success")

def news(requests):
    return render(requests,'news.html')


def united_states(requests):

    updated_date = Country.objects.get(name='USA')
    allState = State.objects.all()
    updated_state = State.objects.all().aggregate(Sum('actuals_hospitalBeds_currentUsageTotal'))
    print("=========================================================",updated_state)
    data = ['{:,}'.format(updated_date.total_cases), '{:,}'.format(updated_date.total_cases), '{:,}'.format(updated_date.new_cases),'{:,}'.format(updated_date.total_death), '{:,}'.format(updated_date.total_cases), '{:,}'.format(updated_date.total_cases)]
    print("==================================",updated_date.name)
    cursor = connection.cursor()
    # plot chart record
    # states FED Balance Sheet
    retail_recreation_data = []
    retail_recreation_labels = []
    queryset = CovidMobility.objects.values('date','retailRecreation')[:5]
    print(str(len(queryset)))
    for entry in queryset:
        retail_recreation_labels.append(entry['date'])
        retail_recreation_data.append(entry['retailRecreation'])
    # return JsonResponse(data={
    #     'retail_recreation_labels': retail_recreation_labels,
    #     'retail_recreation_data': retail_recreation_data,
    # })
    # updated_state = cursor.execute("SELECT ")
    retailrecreation = cursor.execute('SELECT retailRecreation from frontend_covidmobility where country = "United States" limit 50')

    cur = connection.cursor()
    dateofretails = cur.execute('SELECT date from frontend_covidmobility where country = "United States" limit 50')
    resident = connection.cursor()
    # us covid mobility recoord

    all_us_covismobility_record = CovidMobility.objects.filter(Q(country='United States')).count()
    two_months_us_covismobility=all_us_covismobility_record-30
    us_covismobility_record = CovidMobility.objects.filter(country='United States').order_by('-id')[:50]
    #
    resid =[]
    grocery =[]
    park =[]
    transit =[]
    work_place =[]
    data = []
    label = []
    # ============== convert to list to plot graph =========== #
    # work_place
    for work in us_covismobility_record:
        work_place.append(work.workplaces)

    # transitStations
    for trans in us_covismobility_record:
        transit.append(trans.transitStations)
    # parks

    for prk in us_covismobility_record:
        park.append(prk.parks)

    # grocerypharmacy
    for groc in us_covismobility_record:
        grocery.append(groc.groceryPharmacy)

    # resident
    for resi in us_covismobility_record:
        resid.append(resi.residential)


    for entry in dateofretails:
        result = list(entry)
        label.append(result)

    for ent in retailrecreation:
        res = list(ent)
        data.append(res)
    #     key indicator graph ploting
    state_record = State.objects.all()
    # for a in state_record:
    #     print(a)

    # states_record = State.objects.filter(Q('lastUpdatedDate')).annotate()
    # united state graphs
    actuallcases = State.objects.filter(Q(country='USA'))
    act_date = []
    act_cases = []
    act_death = []
    act_population = []
    act_infection = []
    testPositivityRatio = []
    hospitalBeds_currentUsageTotal = []

    for act in actuallcases:
        act_date.append(act.state)

    for act in actuallcases:
        act_cases.append(act.actuals_cases)

    for act in actuallcases:
        act_population.append(act.population)

    for act in actuallcases:
        act_death.append(act.actuals_deaths)

    for act in actuallcases:
        act_infection.append(act.metrics_infectionRate)

    for act in actuallcases:
        testPositivityRatio.append(act.metrics_testPositivityRatio)

    for act in actuallcases:
        hospitalBeds_currentUsageTotal.append(act.actuals_hospitalBeds_currentUsageTotal)

    allState
    # covid mobility
    allStateName = []
    allStatePopulation = []
    allStateInfectionRate = []
    allStateNewCases = []
    for st in allState:
        allStateName.append(st.state)
        allStatePopulation.append(st.population)
    test = State.objects.filter(metrics_testPositivityRatio = None)
    for t in test:
        if t.actuals_hospitalBeds_currentUsageTotal == None:
            t.actuals_hospitalBeds_currentUsageTotal = 0
            t.save()

        # string = "19 Nov 2015  18:45:00.000"
        # date = datetime.datetime.strptime(act['lastUpdatedDate'], '%Y-%m-%d %H:%M:%S.%f')
        # print("======================= \t\t\t\t\t",date.year)
        # data['Dates'] = pd.to_datetime(data['Date'], format='%Y:%M:%D').dt.date
        # print(data)

    # print("=================\t\t\t\t\t\n\n\n\n\n",act_cases)
    # emplpoyement emp_combined', 'emp_combined_inclow', 'emp_combined_incmiddle

    nationalEmployment = NationalEmployment.objects.all().aggregate(Sum('emp_combined'))['emp_combined__sum']

    nationalEmploymentMiddle = NationalEmployment.objects.all().aggregate(Sum('emp_combined_incmiddle'))['emp_combined_incmiddle__sum']

    nationalEmploymentMiddle = nationalEmploymentMiddle/2

    nationalEmploymentLow = NationalEmployment.objects.all().aggregate(Sum('emp_combined_inclow'))['emp_combined_inclow__sum']

    # business revenue
    spendeducation = ConsumerSpending.objects.all().aggregate(Sum('spend_aer'))['spend_aer__sum']
    spendhospitality = ConsumerSpending.objects.all().aggregate(Sum('spend_hcs'))['spend_hcs__sum']
    spendtransportation = ConsumerSpending.objects.all().aggregate(Sum('spend_tws'))['spend_tws__sum']
    EmploymentLow = NationalEmployment.objects.values('emp_combined_inclow','emp_combined_incmiddle','emp_combined','month')
    # EmploymentState = NationalEmployment.objects.values('emp_combined_inclow','emp_combined_incmiddle','emp_combined')
    emp_low = []
    emp_middle = []
    emp_high = []
    emp_month = []
    EmploymentState = []
    for emp in EmploymentLow:
        emp_low.append(emp['emp_combined_inclow'])
        emp_high.append(emp['emp_combined'])
        emp_middle.append(emp['emp_combined_incmiddle'])
        emp_month.append(emp['month'])
        EmploymentState.append(emp['emp_combined_inclow'])
        EmploymentState.append(emp['emp_combined'])
        EmploymentState.append(emp['emp_combined_incmiddle'])
    print(len(EmploymentState))
    # Cosumer spending graph chart
    EmployeeConsumerSpending = ConsumerSpending.objects.values('spend_apg', 'spend_hcs', 'spend_retail_w_grocery','spend_grf','spend_tws')[:53]

    spend_apparel = []
    spend_health_care = []
    spends_restaurents_hospitality = []
    spend_transportation = []
    spend_grocery = []

    for spends in EmployeeConsumerSpending:

        spend_apparel.append(spends['spend_apg'])
        spend_health_care.append(spends['spend_hcs'])
        spend_grocery.append(spends['spend_retail_w_grocery'])
        spends_restaurents_hospitality.append(spends['spend_grf'])
        spend_transportation.append(spends['spend_tws'])

    print(len(EmploymentState))
    context ={
             # business
             'spendeducation':spendeducation,
             'spendhospitality':spendhospitality,
             'spendtransportation':spendtransportation,

             # consumer spending
             'spend_apparel':spend_apparel,
             'spend_health_care':spend_health_care,
             'spends_restaurents_hospitality':spends_restaurents_hospitality,
             'spend_transportation':spend_transportation,
             'spend_grocery':spend_grocery,
              # end consumer
              'EmploymentState': EmploymentState,
              'emp_month': emp_month,
              'emp_low': emp_low,
              'emp_middle': emp_middle,
              'emp_high': emp_high,
              'nationalEmploymentLow': nationalEmploymentLow,
              'nationalEmploymentMiddle': nationalEmploymentMiddle,
              'nationalEmployment': nationalEmployment,
              'updated_date': updated_date,

              'data': data,'label': label,

              'updated_state': updated_state,

              'retail_recreation_labels': retail_recreation_labels,

              'retail_recreation_data': retail_recreation_data,

              'resid': resid,

              'grocery': grocery,

              'park': park,

              'transit': transit,

              'work_place': work_place,

              'act_cases': act_cases,

              'act_date': act_date,

              'act_death': act_death,

              'act_population': act_population,

              'act_infection': act_infection,

              'testPositivityRatio': testPositivityRatio,

              'hospitalBeds_currentUsageTotal': hospitalBeds_currentUsageTotal,

              'allState': allState,
              'allStateName': allStateName,
              'allStatePopulation': allStatePopulation,

              }
    return render(requests,'united-states.html', context)


def importStates(request):

    url = "https://api.covidactnow.org/v2/states.json?apiKey="

    apiKey = "3d6a9e2ce7af4fa39b3ee24f0d6074a3"

    objects = requests.get(url + apiKey).content

    data = json.loads(objects)

    states = State.objects.all()

    for key in data:
        fips = key.get('fips', 0)

        country = key.get('country', 0)

        state = key.get('state', 0)

        county = key.get('county', 0)

        level = key.get('level', 0)

        lat = key.get('lat', 0)

        long = key.get('long', 0)

        population = key.get('population', 0)

        metrics = key.get('metrics', 0)

        metrics_testPositivityRatio = metrics.get('testPositivityRatio', 0)

        metrics_caseDensity = metrics.get('caseDensity', 0)

        metrics_contactTracerCapacityRatio = metrics.get('contactTracerCapacityRatio', 0)
        metrics_infectionRate = metrics.get('infectionRate', 0)
        metrics_infectionRateCI90 = metrics.get('infectionRateCI90', 0)
        metrics_icuHeadroomRatio = metrics.get('icuHeadroomRatio', 0)
        metrics_icuHeadroomDetails = metrics.get('icuHeadroomDetails', 0)

        if metrics_icuHeadroomDetails:
            metrics_icuHeadroomDetails_currentIcuCovid = metrics_icuHeadroomDetails.get('currentIcuCovid', 0)
            metrics_icuHeadroomDetails_currentIcuCovidMethod = metrics_icuHeadroomDetails.get('currentIcuCovidMethod', 0)
            metrics_icuHeadroomDetails_currentIcuNonCovid = metrics_icuHeadroomDetails.get('currentIcuNonCovid', 0)
            metrics_icuHeadroomDetails_currentIcuNonCovidMethod = metrics_icuHeadroomDetails.get('currentIcuNonCovidMethod', None)

        else:
            metrics_icuHeadroomDetails_currentIcuCovid = 0
            metrics_icuHeadroomDetails_currentIcuCovidMethod = 0
            metrics_icuHeadroomDetails_currentIcuNonCovid = 0
            metrics_icuHeadroomDetails_currentIcuNonCovidMethod = 0

        actuals = key.get('actuals', 0)
        actuals_cases = actuals.get('cases', 0)
        actuals_deaths = actuals.get('deaths', 0)
        actuals_positiveTests = actuals.get('positiveTests', 0)
        actuals_negativeTests = actuals.get('negativeTests', 0)
        actuals_contactTracers = actuals.get('contactTracers', 0)

        hospitalBeds = actuals.get('hospitalBeds', 0)
        actuals_hospitalBeds_capacity = hospitalBeds.get('capacity', 0)
        actuals_hospitalBeds_currentUsageTotal = hospitalBeds.get('currentUsageTotal', 0)
        actuals_hospitalBeds_currentUsageCovid = hospitalBeds.get('currentUsageCovid', 0)
        actuals_hospitalBeds_typicalUsageRate = hospitalBeds.get('typicalUsageRate', 0)

        actuals_icuBeds = actuals.get('icuBeds', 0)
        actuals_icuBeds_capacity = actuals_icuBeds.get('capacity', 0)
        actuals_icuBeds_currentUsageTotal = actuals_icuBeds.get('currentUsageTotal', 0)
        actuals_icuBeds_currentUsageCovid = actuals_icuBeds.get('currentUsageCovid', 0)
        actuals_icuBeds_typicalUsageRate = actuals_icuBeds.get('typicalUsageRate', 0)
        # lastUpdatedDate = key.get('lastUpdatedDate', None)

        if states:

            State.objects.filter(state=state).update(fips=fips, country=country, county=county, level=level,
                                 lat=lat, long=long, population=population,
                                 metrics_testPositivityRatio=metrics_testPositivityRatio,
                                 metrics_caseDensity=metrics_caseDensity,
                                 metrics_contactTracerCapacityRatio=metrics_contactTracerCapacityRatio,
                                 metrics_infectionRate=metrics_infectionRate,
                                 metrics_infectionRateCI90=metrics_infectionRateCI90,
                                 metrics_icuHeadroomRatio=metrics_icuHeadroomRatio,
                                 metrics_icuHeadroomDetails_currentIcuCovid=metrics_icuHeadroomDetails_currentIcuCovid,
                                 metrics_icuHeadroomDetails_currentIcuCovidMethod=metrics_icuHeadroomDetails_currentIcuCovidMethod,
                                 metrics_icuHeadroomDetails_currentIcuNonCovid=metrics_icuHeadroomDetails_currentIcuNonCovid,
                                 metrics_icuHeadroomDetails_currentIcuNonCovidMethod=metrics_icuHeadroomDetails_currentIcuNonCovidMethod,
                                 actuals_cases=actuals_cases,
                                 actuals_hospitalBeds_capacity=actuals_hospitalBeds_capacity,
                                 actuals_deaths=actuals_deaths,
                                 actuals_positiveTests=actuals_positiveTests,
                                 actuals_negativeTests=actuals_negativeTests,
                                 actuals_contactTracers=actuals_contactTracers,
                                 actuals_hospitalBeds_currentUsageTotal=actuals_hospitalBeds_currentUsageTotal,
                                 actuals_hospitalBeds_currentUsageCovid=actuals_hospitalBeds_currentUsageCovid,
                                 actuals_hospitalBeds_typicalUsageRate=actuals_hospitalBeds_typicalUsageRate,
                                 actuals_icuBeds_capacity=actuals_icuBeds_capacity,
                                 actuals_icuBeds_currentUsageTotal=actuals_icuBeds_currentUsageTotal,
                                 actuals_icuBeds_currentUsageCovid=actuals_icuBeds_currentUsageCovid,
                                 actuals_icuBeds_typicalUsageRate=actuals_icuBeds_typicalUsageRate,
                                 lastUpdatedDate=datetime.datetime.today())
        else:
            covid_states = State.objects.create(fips=fips, country=country, state=state, county=county, level=level,
                                 lat=lat, long=long, population=population,
                                 metrics_testPositivityRatio=metrics_testPositivityRatio,
                                 metrics_caseDensity=metrics_caseDensity,
                                 metrics_contactTracerCapacityRatio=metrics_contactTracerCapacityRatio,
                                 metrics_infectionRate=metrics_infectionRate,
                                 metrics_infectionRateCI90=metrics_infectionRateCI90,
                                 metrics_icuHeadroomRatio=metrics_icuHeadroomRatio,
                                 metrics_icuHeadroomDetails_currentIcuCovid=metrics_icuHeadroomDetails_currentIcuCovid,
                                 metrics_icuHeadroomDetails_currentIcuCovidMethod=metrics_icuHeadroomDetails_currentIcuCovidMethod,
                                 metrics_icuHeadroomDetails_currentIcuNonCovid=metrics_icuHeadroomDetails_currentIcuNonCovid,
                                 metrics_icuHeadroomDetails_currentIcuNonCovidMethod=metrics_icuHeadroomDetails_currentIcuNonCovidMethod,
                                 actuals_cases=actuals_cases,
                                 actuals_hospitalBeds_capacity=actuals_hospitalBeds_capacity,
                                 actuals_deaths=actuals_deaths,
                                 actuals_positiveTests=actuals_positiveTests,
                                 actuals_negativeTests=actuals_negativeTests,
                                 actuals_contactTracers=actuals_contactTracers,
                                 actuals_hospitalBeds_currentUsageTotal=actuals_hospitalBeds_currentUsageTotal,
                                 actuals_hospitalBeds_currentUsageCovid=actuals_hospitalBeds_currentUsageCovid,
                                 actuals_hospitalBeds_typicalUsageRate=actuals_hospitalBeds_typicalUsageRate,
                                 actuals_icuBeds_capacity=actuals_icuBeds_capacity,
                                 actuals_icuBeds_currentUsageTotal=actuals_icuBeds_currentUsageTotal,
                                 actuals_icuBeds_currentUsageCovid=actuals_icuBeds_currentUsageCovid,
                                 actuals_icuBeds_typicalUsageRate=actuals_icuBeds_typicalUsageRate,
                                 lastUpdatedDate=datetime.datetime.today())
            covid_states.save()

    return HttpResponse('success')


def change_list():

    return HttpResponse()


def world_Country_province(requests):
    path = "template/Region_Mobility_Report_CSVs/"
    a=0
    for fname in glob.glob('template/Region_Mobility_Report_CSVs/*.csv'):
        with open(fname, 'r') as file:
            data = csv.reader(file)
            count = 0
            for key in data:
                country_region_code = key[0]
                country_region = key[1]
                sub_region_1 = key[2]
                sub_region_2 = key[3]
                metro_area = key[4]
                iso_3166_2_code = key[5]
                census_fips_code = key[6]
                date = key[7]
                retail_and_recreation_percent_change_from_baseline = key[8]
                grocery_and_pharmacy_percent_change_from_baseline = key[9]
                parks_percent_change_from_baseline = key[10]
                transit_stations_percent_change_from_baseline = key[11]
                workplaces_percent_change_from_baseline = key[12]
                residential_percent_change_from_baseline = key[13]
                mobilitydata = WorldCountryProvinceRecord.objects.create(country_region_code=country_region_code,
                                                          country_region=country_region,
                                                          sub_region_1=sub_region_1,
                                                          sub_region_2=sub_region_2,
                                                          metro_area=metro_area,
                                                          iso_3166_2_code=iso_3166_2_code,
                                                          census_fips_code=census_fips_code,
                                                          date=date,
                                                          retail_and_recreation_percent_change_from_baseline=retail_and_recreation_percent_change_from_baseline,
                                                          grocery_and_pharmacy_percent_change_from_baseline=grocery_and_pharmacy_percent_change_from_baseline,
                                                          parks_percent_change_from_baseline=parks_percent_change_from_baseline,
                                                          transit_stations_percent_change_from_baseline=transit_stations_percent_change_from_baseline,
                                                          workplaces_percent_change_from_baseline=workplaces_percent_change_from_baseline,
                                                          residential_percent_change_from_baseline=residential_percent_change_from_baseline,
                                                          )
                mobilitydata.save()
    return HttpResponse("success")


def national_employment(requests):
    path = "template/Region_Mobility_Report_CSVs/"
    a=0
    fname = 'template/EconomicTracker-main/Employmentnational.csv'
    with open(fname, 'r') as file:
        data = csv.reader(file)
        count = 0
        for key in data:
            year = key[0]
            month = key[1]
            day = key[2]
            emp_combined = key[3]
            emp_combined_inclow = key[4]
            emp_combined_incmiddle = key[5]
            emp_combined_inchigh = key[6]
            emp_combined_ss40 = key[7]
            emp_combined_ss60 = key[8]
            emp_combined_ss65 = key[9]
            emp_combined_ss70 = key[10]
            emp_combined_advance = key[11]

            mobilitydata = NationalEmployment.objects.create(year=year,
                                                      month=month,
                                                      day=day,
                                                      emp_combined=emp_combined,

                                                      emp_combined_inclow=emp_combined_inclow,
                                                      emp_combined_incmiddle=emp_combined_incmiddle,
                                                      emp_combined_inchigh=emp_combined_inchigh,
                                                      emp_combined_ss40=emp_combined_ss40,
                                                      emp_combined_ss60=emp_combined_ss60,
                                                      emp_combined_ss65=emp_combined_ss65,
                                                      emp_combined_ss70=emp_combined_ss70,
                                                      emp_combined_advance=emp_combined_advance,
                                                      )
            mobilitydata.save()
    return HttpResponse("success")
def states(requests,state_id):
    allState = HistoricalCountiesRecord.objects.filter(state=state_id)
    stateStatistic = State.objects.get(state=state_id)
    updatedDate = stateStatistic.lastUpdatedDate
    # print("============last \t\t\t:",lastUpdated['lastUpdatedDate'])
    context = {
        'updatedDate':updatedDate,
        'stateStatistic':stateStatistic,
        'allState':allState,
        'state_id':state_id,

    }
    print("================state name=========\t\t\t",state_id)
    return render(requests,'states.html',context)

def importCountries(request):
    overview = covid_daily.overview(as_json=True)
    country = Country.objects.all()
    for key in overview:
        if country:
            country.name = key.get('Country,Other', 0)
            country.total_cases = key.get('TotalCases', 0)
            country.new_cases = key.get('NewCases', 0)
            country.total_death = key.get('TotalDeaths', 0)
            country.new_death = key.get('NewDeaths', 0)
            country.total_recovered = key.get('TotalRecovered', 0)
            country.new_recovered = key.get('NewRecovered', 0)
            country.active_cases = key.get('ActiveCases', 0)
            country.serious_critical = key.get('Serious,Critical', 0)
            country.total_cases_1m_pop = key.get('TotCases/1M pop', 0)
            country.deaths_1m_pop = key.get('Deaths/1M pop', 0)
            country.total_test = key.get('TotalTests', 0)
            country.test_1m_pop = key.get('Tests/1M pop', 0)
            country.population = key.get('Population', 0)
            country.date = datetime.datetime.today()
            # covid_record= Country.objects.create(country_code=country_code,total_cases=total_cases,date=date)
            Country.objects.filter(name=country.name).update(name=country.name, total_cases=country.total_cases,
                                                             new_cases=country.new_cases,
                                                             new_recovered=country.new_recovered,
                                                             total_death=country.total_death,
                                                             new_death=country.new_death,
                                                             total_recovered=country.total_recovered,
                                                             active_cases=country.active_cases,
                                                             serious_critical=country.serious_critical,
                                                             total_cases_1m_pop=country.total_cases_1m_pop,
                                                             deaths_1m_pop=country.deaths_1m_pop,
                                                             total_test=country.total_test,
                                                             test_1m_pop=country.test_1m_pop,
                                                             population=country.population, date=country.date)
        else:
            name = key.get('Country,Other', 0)
            total_cases = key.get('TotalCases', 0)
            new_cases = key.get('NewCases', 0)
            total_death = key.get('TotalDeaths', 0)
            new_death = key.get('NewDeaths', 0)
            total_recovered = key.get('TotalRecovered', 0)
            new_recovered = key.get('NewRecovered', 0)
            active_cases = key.get('ActiveCases', 0)
            serious_critical = key.get('Serious,Critical', 0)
            total_cases_1m_pop = key.get('TotCases/1M pop', 0)
            deaths_1m_pop = key.get('Deaths/1M pop', 0)
            total_test = key.get('TotalTests', 0)
            test_1m_pop = key.get('Tests/1M pop', 0)
            population = key.get('Population', 0)
            date = datetime.datetime.today()
            covid_record = Country.objects.create(name=name, total_cases=total_cases, new_cases=new_cases,
                                                  new_recovered=new_recovered, total_death=total_death,
                                                  new_death=new_death, total_recovered=total_recovered,
                                                  active_cases=active_cases, serious_critical=serious_critical,
                                                  total_cases_1m_pop=total_cases_1m_pop, deaths_1m_pop=deaths_1m_pop,
                                                  total_test=total_test, test_1m_pop=test_1m_pop, population=population,
                                                  date=date)
            covid_record.save()
    return timezone.now().strftime('%X')

def import_counties_data(request):

    url = "https://api.covidactnow.org/v2/states.json?apiKey="
    apiKey = "3d6a9e2ce7af4fa39b3ee24f0d6074a3"
    objects = requests.get("https://api.covidactnow.org/v2/counties.json?apiKey=3d6a9e2ce7af4fa39b3ee24f0d6074a3").content
    data = json.loads(objects)
    # print("===== counties record ======",data)
    count = 0
    for key in data:
        count=count+1
        fips = key.get('fips', 0)
        country = key.get('country', 0)
        state = key.get('state', 0)
        county = key.get('county', 0)
        level = key.get('level', 0)
        lat = key.get('lat', None)

        locationId = key.get('locationId', 0)
        long = key.get('long', 0)
        population = key.get('population', 0)

        metrics = key.get('metrics', 0)
        metrics_testPositivityRatio = metrics.get('testPositivityRatio', 0)
        metrics_caseDensity = metrics.get('caseDensity', 0)
        metrics_contactTracerCapacityRatio = metrics.get('contactTracerCapacityRatio', 0)
        metrics_infectionRate = metrics.get('infectionRate', 0)
        metrics_infectionRateCI90 = metrics.get('infectionRateCI90', 0)

        metrics_icuHeadroomRatio = metrics.get('icuHeadroomRatio', 0)
        metrics_icuHeadroomDetails = metrics.get('icuHeadroomDetails', 0)
        # currentIcuCovid = icuHeadroomDetails.get('currentIcuCovid', 0)
        # currentIcuNonCovid = icuHeadroomDetails.get('currentIcuNonCovid', 0)
        #
        # metrics_icuHeadroomDetails = str(currentIcuCovid)+","+str(currentIcuNonCovid)

        riskLevels = key.get('riskLevels', 0)
        riskLevels = dict(riskLevels)
        riskLevels_overall = riskLevels.get('overall', 0)
        riskLevels_testPositivityRatio = riskLevels.get('testPositivityRatio', 0)
        riskLevels_caseDensity = riskLevels.get('caseDensity', 0)
        riskLevels_contactTracerCapacityRatio = riskLevels.get('contactTracerCapacityRatio', 0)
        riskLevels_infectionRate = riskLevels.get('infectionRate', 0)
        riskLevels_icuHeadroomRatio = riskLevels.get('icuHeadroomRatio', 0)

        actuals = key.get('actuals',0)

        # print("======actuals=====\n",actuals)

        actuals_cases = actuals.get('cases', 0)
        actuals_deaths = actuals.get('deaths', 0)
        actuals_positiveTests = actuals.get('positiveTests', 0)
        actuals_negativeTests = actuals.get('negativeTests', 0)
        actuals_contactTracers = actuals.get('contactTracers', 0)

        hospitalBeds = actuals.get('hospitalBeds', 0)

        actuals_hospitalBeds_capacity = hospitalBeds.get('capacity', 0)
        actuals_hospitalBeds_currentUsageTotal = hospitalBeds.get('currentUsageTotal', 0)
        actuals_hospitalBeds_currentUsageCovid = hospitalBeds.get('currentUsageCovid', 0)
        actuals_hospitalBeds_typicalUsageRate = hospitalBeds.get('typicalUsageRate', 0)

        icuBeds = actuals.get('icuBeds', 0)
        actuals_icuBeds_capacity = icuBeds.get('capacity', 0)
        actuals_icuBeds_currentUsageTotal = icuBeds.get('currentUsageTotal', 0)
        actuals_icuBeds_currentUsageCovid = icuBeds.get('currentUsageCovid', 0)
        actuals_icuBeds_typicalUsageRate = icuBeds.get('typicalUsageRate', 0)

        print("=== ICU beds====\t\t\t\t:\n", actuals_icuBeds_typicalUsageRate)
        actuals_newCases = actuals.get('newCases', 0)
        lastUpdatedDate = datetime.datetime.today()


        # saving record
        historicalCountiesRecord = HistoricalCountiesRecord.objects.get(fips =fips)
        HistoricalCountiesRecord.objects.filter(fips=fips).update(fips=fips,
                                             country=country,
                                             state=state,
                                             county=county,
                                             level=level,
                                             lat=lat,
                                             locationId=locationId,
                                             long=long,
                                             population=population,
                                             metrics_testPositivityRatio=metrics_testPositivityRatio,
                                             metrics_caseDensity=metrics_caseDensity,
                                             metrics_contactTracerCapacityRatio=metrics_contactTracerCapacityRatio,
                                             metrics_infectionRate=metrics_infectionRate,
                                             metrics_infectionRateCI90=metrics_infectionRateCI90,
                                             metrics_icuHeadroomRatio=metrics_icuHeadroomRatio,
                                             metrics_icuHeadroomDetails=metrics_icuHeadroomDetails,
                                             riskLevels_overall=riskLevels_overall,
                                             riskLevels_testPositivityRatio=riskLevels_testPositivityRatio,
                                             riskLevels_caseDensity=riskLevels_caseDensity,
                                             riskLevels_contactTracerCapacityRatio=riskLevels_contactTracerCapacityRatio,
                                             riskLevels_infectionRate=riskLevels_infectionRate,
                                             riskLevels_icuHeadroomRatio=riskLevels_icuHeadroomRatio,
                                             actuals_cases=actuals_cases,
                                             actuals_deaths=actuals_deaths,
                                             actuals_positiveTests=actuals_positiveTests,
                                             actuals_negativeTests=actuals_negativeTests,
                                             actuals_contactTracers=actuals_contactTracers,
                                             actuals_hospitalBeds_capacity=actuals_hospitalBeds_capacity,
                                             actuals_hospitalBeds_currentUsageTotal=actuals_hospitalBeds_currentUsageTotal,
                                             actuals_hospitalBeds_currentUsageCovid=actuals_hospitalBeds_currentUsageCovid,
                                             actuals_hospitalBeds_typicalUsageRate=actuals_hospitalBeds_typicalUsageRate,
                                             actuals_icuBeds_capacity=actuals_icuBeds_capacity,
                                             actuals_icuBeds_currentUsageTotal=actuals_icuBeds_currentUsageTotal,
                                             actuals_icuBeds_currentUsageCovid=actuals_icuBeds_currentUsageCovid,
                                             actuals_icuBeds_typicalUsageRate=actuals_icuBeds_typicalUsageRate,
                                             actuals_newCases=actuals_newCases,
                                             lastUpdatedDate=lastUpdatedDate)
        # create object
        # HistoricalCountiesRecord.objects.create(fips =fips,
        # country =country,
        # state = state,
        # county = county,
        # level = level,
        # lat = lat,
        # locationId = locationId,
        # long = long,
        # population = population,
        # metrics_testPositivityRatio = metrics_testPositivityRatio,
        # metrics_caseDensity = metrics_caseDensity,
        # metrics_contactTracerCapacityRatio = metrics_contactTracerCapacityRatio,
        # metrics_infectionRate = metrics_infectionRate,
        # metrics_infectionRateCI90 = metrics_infectionRateCI90,
        # metrics_icuHeadroomRatio = metrics_icuHeadroomRatio,
        # metrics_icuHeadroomDetails = metrics_icuHeadroomDetails,
        # riskLevels_overall =riskLevels_overall,
        # riskLevels_testPositivityRatio = riskLevels_testPositivityRatio,
        # riskLevels_caseDensity = riskLevels_caseDensity,
        # riskLevels_contactTracerCapacityRatio = riskLevels_contactTracerCapacityRatio,
        # riskLevels_infectionRate = riskLevels_infectionRate,
        # riskLevels_icuHeadroomRatio = riskLevels_icuHeadroomRatio,
        # actuals_cases = actuals_cases,
        # actuals_deaths = actuals_deaths,
        # actuals_positiveTests = actuals_positiveTests,
        # actuals_negativeTests = actuals_negativeTests,
        # actuals_contactTracers =actuals_contactTracers,
        # actuals_hospitalBeds_capacity = actuals_hospitalBeds_capacity,
        # actuals_hospitalBeds_currentUsageTotal = actuals_hospitalBeds_currentUsageTotal,
        # actuals_hospitalBeds_currentUsageCovid =actuals_hospitalBeds_currentUsageCovid,
        # actuals_hospitalBeds_typicalUsageRate =actuals_hospitalBeds_typicalUsageRate,
        # actuals_icuBeds_capacity =actuals_icuBeds_capacity,
        # actuals_icuBeds_currentUsageTotal =actuals_icuBeds_currentUsageTotal,
        # actuals_icuBeds_currentUsageCovid =actuals_icuBeds_currentUsageCovid,
        # actuals_icuBeds_typicalUsageRate =actuals_icuBeds_typicalUsageRate,
        # actuals_newCases =actuals_newCases,
        # lastUpdatedDate =lastUpdatedDate)
    print("total count\t:\t\n",count)
    return HttpResponse("success")
# errors
def error_404_view(request, exception):
    data = {"name": "127.0.0.1"}
    return render(request,'error_404.html', data)
