from .serializers import *
from .models import User
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.decorators import api_view
from rest_framework import status
import jwt, datetime
# Create your views here.

@api_view(['POST'])
def login(request):
    email = request.data['email']
    password = request.data['password']
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
        
    if not user.check_password(password):
            raise AuthenticationFailed("Incorrect password")
    
    payload = {
        'id': user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
        'iat': datetime.datetime.utcnow()
    }

    token = jwt.encode(payload, 'secret', algorithm='HS256')
    response =  Response()
    response.set_cookie(key='jwt', value=token, httponly=True)
    response.data = {
        'jwt':token,
        'user_id': user.id,
        'role': user.role
    }
    
    context = {'request':request}
    user_ser = UserSerializer(user, context=context, many=False)
    return response
    

@api_view(['GET'])
def get_all_users(request):
    if request.method == 'GET':
        users = User.objects.all()
        context = {'request': request}
        user_ser = UserSerializer(users, context=context, many=True)

        return Response(user_ser.data)

@api_view(['GET'])
def get_user(request, pk):
    token = request.COOKIES.get('jwt')
    if not token:
        raise AuthenticationFailed("Unauthenticated")
    
    try: 
        payload = jwt.decode(token, 'secret', algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed("Unauthenticated")
    
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    context = {'request':request}
    user_ser = UserSerializer(user, context=context, many=False)
    return Response(user_ser.data)


@api_view(['POST'])
def add_user(request):
    email = request.data['email']
    password = request.data['password']
    try:
        user = User.objects.get(email=email, password=password)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    except User.DoesNotExist:
        user_ser = UserSerializer(data=request.data)
        if user_ser.is_valid():
            user_ser.save()
            return Response(user_ser.data, status=status.HTTP_201_CREATED)
        return Response(user_ser.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
def update_delete_user(request, pk):
    # token = request.COOKIES.get('jwt')
    # if not token:
    #     raise AuthenticationFailed("Unauthenticated")
    
    # try: 
    #     payload = jwt.decode(token, 'secret', algorithms=['HS256'])
    # except jwt.ExpiredSignatureError:
    #     raise AuthenticationFailed("Unauthenticated")
    
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'PUT':
        user_ser = UserSerializer(user, data=request.data)
        password = request.data['password']
        if password is '':
            return Response(status=status.HTTP_200_OK)
        
        if user_ser.is_valid():
            user_ser.save()
            return Response(user_ser.data, status=status.HTTP_200_OK)
        return Response(user_ser.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        user.delete()
        return Response(status=status.HTTP_200_OK)
    

# ADS

@api_view(['GET'])
def get_all_ads(request):
    if request.method == 'GET':
        ads = Ads.objects.all()
        context = {'request': request}
        ad_ser = AdsSerializer(ads, context=context, many=True)

        return Response(ad_ser.data)
    

@api_view(['GET'])
def get_ad(request, pk):
    try:
        ad = Ads.objects.get(pk=pk)
    except Ads.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    context = {'request':request}
    ad_ser = AdsSerializer(ad, context=context, many=False)
    return Response(ad_ser.data)


@api_view(['POST'])
def add_ad(request):
    token = request.COOKIES.get('jwt')
    if not token:
        raise AuthenticationFailed("Unauthenticated")
    
    try: 
        payload = jwt.decode(token, 'secret', algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed("Unauthenticated")
    
    ad_ser = AdsSerializer(data=request.data)
    if ad_ser.is_valid():
        ad_ser.save()
        return Response(status=status.HTTP_201_CREATED)
    return Response(ad_ser.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
def update_delete_ad(request, pk):
    token = request.COOKIES.get('jwt')
    if not token:
        raise AuthenticationFailed("Unauthenticated")
    
    try: 
        payload = jwt.decode(token, 'secret', algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed("Unauthenticated")
    
    try:
        ad = Ads.objects.get(pk=pk)
    except Ads.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'PUT':
        context={'request': request}
        ad_ser = AdsSerializer(ad, data=request.data,context=context)
        if ad_ser.is_valid():
            ad_ser.save()
            return Response(status=status.HTTP_200_OK)
        return Response(ad_ser.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        ad.delete()
        return Response(status=status.HTTP_200_OK)
    
@api_view(['GET'])
def get_all_sales(request):
    if request.method == 'GET':
        ads = Ads.objects.all().filter(ad_type='sale')
        context = {'request': request}
        ad_ser = AdsSerializer(ads, context=context, many=True)

        return Response(ad_ser.data)
    

@api_view(['GET'])
def get_all_rents(request):
    if request.method == 'GET':
        ads = Ads.objects.all().filter(ad_type='rent')
        context = {'request': request}
        ad_ser = AdsSerializer(ads, context=context, many=True)

        return Response(ad_ser.data)
    

@api_view(['POST'])
def add_favourite(request, pka, pku):
    token = request.COOKIES.get('jwt')
    if not token:
        raise AuthenticationFailed("Unauthenticated")
    
    try: 
        payload = jwt.decode(token, 'secret', algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed("Unauthenticated")
    
    if request.method == 'POST':
        try:
            user = User.objects.get(pk=pku)
            ad = Ads.objects.get(pk=pka)
        except User.DoesNotExist or Ads.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    
        user.prefered_ads.add(ad)
        return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
def get_all_favourites(request, pk):
    token = request.COOKIES.get('jwt')
    if not token:
        raise AuthenticationFailed("Unauthenticated")
    
    try: 
        payload = jwt.decode(token, 'secret', algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed("Unauthenticated")
    
    if request.method == 'GET':
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        fav = user.prefered_ads.all()
        context = {'request': request}
        fav_ser = AdsSerializer(fav, context=context, many=True)
        return Response(fav_ser.data)
        
@api_view(['PUT'])
def remove_favourite(request, pka, pku):
    token = request.COOKIES.get('jwt')
    if not token:
        raise AuthenticationFailed("Unauthenticated")
    
    try: 
        payload = jwt.decode(token, 'secret', algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed("Unauthenticated")
    
    if request.method == 'PUT':
        try:
            user = User.objects.get(pk=pku)
            ad = Ads.objects.get(pk=pka)
        except User.DoesNotExist or Ads.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    
        user.prefered_ads.remove(ad)
        return Response(status=status.HTTP_200_OK)
    

@api_view(['POST'])
def add_programare(request):
    token = request.COOKIES.get('jwt')
    if not token:
        raise AuthenticationFailed("Unauthenticated")
    
    try: 
        payload = jwt.decode(token, 'secret', algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed("Unauthenticated")
    
    if request.method == 'POST':
        id_ad = request.data['id_ad']
        id_user = request.data['id_user']

        try:
            user = User.objects.get(pk=id_user)
            ad = Ads.objects.get(pk=id_ad)
        except User.DoesNotExist or Ads.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    
        prog_ser = ProgramareSerializer(data=request.data)
        if prog_ser.is_valid():
            prog_ser.save()
            return Response(status=status.HTTP_200_OK)
        return Response(prog_ser.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET'])
def get_all_programari_for_ad(request, pk):
    token = request.COOKIES.get('jwt')
    if not token:
        raise AuthenticationFailed("Unauthenticated")
    
    try: 
        payload = jwt.decode(token, 'secret', algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed("Unauthenticated")
    
    if request.method == 'GET':

        programari = Programare.objects.all().filter(id_ad=pk)
        context = {'request': request}
        prog_ser = ProgramareSerializer(programari, context=context, many=True)

        return Response(prog_ser.data)
    

@api_view(['POST'])
def logout(request):
    response = Response()
    response.delete_cookie('jwt')
    response.data = {
        'message': 'success'
    }
    return response

@api_view(['GET'])
def search_by_date_and_hour(request):
    token = request.COOKIES.get('jwt')
    if not token:
        raise AuthenticationFailed("Unauthenticated")
    
    try: 
        payload = jwt.decode(token, 'secret', algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed("Unauthenticated")
    
    if request.method == 'GET':
        id_ad = request.data['id_ad']
        date = request.data['date']
        time = request.data['time']

        try:
            programari = Programare.objects.all().filter(id_ad=id_ad, date=date, time=time)
        except Programare.DoesNotExist:
            return Response({"message": "False"})
        
        return Response({"message": "True"})