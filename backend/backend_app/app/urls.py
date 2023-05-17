from django.urls import path
from .views import login, get_user, add_user, update_delete_user, get_all_users
from .views import get_all_ads, get_ad, add_ad, update_delete_ad
from .views import get_all_sales, get_all_rents
from .views import add_favourite, get_all_favourites, remove_favourite
from .views import add_programare, logout, get_all_programari_for_ad, search_by_date_and_hour

urlpatterns = [
    path('login', login),

    path('all-users', get_all_users),
    path('user/<str:pk>', get_user),
    path('add-user', add_user),
    path('update-user/<str:pk>', update_delete_user),
    path('delete-users/<str:pk>', update_delete_user),
    
    path('all-ads', get_all_ads),
    path('ad/<str:pk>', get_ad),
    path('add-ad', add_ad),
    path('update-ad/<str:pk>', update_delete_ad),
    path('delete-ads/<str:pk>', update_delete_ad),

    path('all-sales', get_all_sales),
    path('all-rents', get_all_rents),

    path('add-fav/<str:pka>/<str:pku>', add_favourite),
    path('all-fav/<str:pk>', get_all_favourites),
    path('remove-fav/<str:pka>/<str:pku>', remove_favourite),

    path('add-prog', add_programare),
    path('all-prog-date/<str:pk>', get_all_programari_for_ad),
    path('search-prog', search_by_date_and_hour),

    path('logout', logout),
]