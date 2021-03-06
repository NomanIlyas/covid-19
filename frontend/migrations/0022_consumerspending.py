# Generated by Django 2.2.5 on 2020-10-29 21:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('frontend', '0021_remove_nationalemployment_country_region'),
    ]

    operations = [
        migrations.CreateModel(
            name='ConsumerSpending',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('year', models.CharField(default=0, max_length=30)),
                ('month', models.CharField(default=0, max_length=30)),
                ('day', models.CharField(default=0, max_length=30)),
                ('statefips', models.CharField(default=0, max_length=30)),
                ('freq', models.CharField(default=0, max_length=30)),
                ('spend_acf', models.CharField(default=0, max_length=30)),
                ('spend_aer', models.CharField(default=0, max_length=30)),
                ('spend_all', models.CharField(default=0, max_length=30)),
                ('spend_apg', models.CharField(default=0, max_length=30)),
                ('spend_grf', models.CharField(default=0, max_length=30)),
                ('spend_hcs', models.CharField(default=0, max_length=30)),
                ('spend_tws', models.CharField(default=0, max_length=30)),
                ('spend_all_inchigh', models.CharField(default=0, max_length=30)),
                ('spend_all_inclow', models.CharField(default=0, max_length=30)),
                ('spend_all_incmiddle', models.CharField(default=0, max_length=30)),
                ('spend_retail_w_grocery', models.CharField(default=0, max_length=30)),
                ('spend_retail_no_grocery', models.CharField(default=0, max_length=30)),
                ('provisional', models.CharField(default=0, max_length=30)),
            ],
        ),
    ]
