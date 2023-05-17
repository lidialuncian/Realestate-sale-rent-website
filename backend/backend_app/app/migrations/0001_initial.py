# Generated by Django 4.2 on 2023-04-24 20:08

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Ads',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField()),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('surface', models.IntegerField()),
                ('no_rooms', models.IntegerField()),
                ('type', models.CharField(choices=[('house', 'House'), ('apartment', 'Apartment')], default='House', max_length=20)),
                ('ad_type', models.CharField(choices=[('sale', 'Sale'), ('rent', 'Rent')], default='Sale', max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(blank=True, max_length=100)),
                ('last_name', models.CharField(blank=True, max_length=100)),
                ('email', models.EmailField(max_length=254)),
                ('password', models.CharField(default='', max_length=100)),
                ('role', models.CharField(choices=[('client', 'Client'), ('admin', 'Admin')], default='Client', max_length=20)),
                ('prefered_ads', models.ManyToManyField(blank=True, related_name='clients', to='app.ads')),
            ],
        ),
    ]
