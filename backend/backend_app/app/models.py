from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    ROLE = (
        ('client', 'Client'),
        ('admin', 'Admin')
    )
    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100, default="")
    role = models.CharField(max_length=20, choices=ROLE, default='client')
    prefered_ads = models.ManyToManyField('Ads', related_name='clients', blank=True)
    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return f'{self.email} {self.password}'


class Ads(models.Model):
    TYPE = (
        ('house', 'House'),
        ('apartment', 'Apartment')
    )

    AD_TYPE = (
        ('sale', 'Sale'),
        ('rent', 'Rent')
    )

    title = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    surface = models.IntegerField()
    no_rooms = models.IntegerField()
    type = models.CharField(max_length=20, choices=TYPE, default='house')
    ad_type = models.CharField(max_length=20, choices=AD_TYPE, default='sale')

    tara = models.CharField(max_length=200, blank=True)
    judet = models.CharField(max_length=200, blank=True)
    oras = models.CharField(max_length=200, blank=True)
    adresa = models.CharField(max_length=200, blank=True)
    


class Programare(models.Model):
    id_ad = models.ForeignKey(Ads, on_delete=models.CASCADE)
    id_user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField(blank=True)
    time = models.TimeField(blank=True)

    class Meta:
        unique_together = ('id_ad', 'date', 'time')
