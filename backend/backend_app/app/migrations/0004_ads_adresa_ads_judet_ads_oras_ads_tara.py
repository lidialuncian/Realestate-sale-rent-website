# Generated by Django 4.2 on 2023-05-02 14:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_programare'),
    ]

    operations = [
        migrations.AddField(
            model_name='ads',
            name='adresa',
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AddField(
            model_name='ads',
            name='judet',
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AddField(
            model_name='ads',
            name='oras',
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AddField(
            model_name='ads',
            name='tara',
            field=models.CharField(blank=True, max_length=200),
        ),
    ]