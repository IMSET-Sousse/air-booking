from django.shortcuts import render
from .models import Property, Booking
from .serializers import PropertySerializer , BookingSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .permissions import IsownerOrReadOnly

#create your views here
class PropertyListCreateView(generics.ListCreateAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
   


def perform_create(self, serializer):
    serializer.save(host=self.request.user)


class PropertyDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = [IsAuthenticated, IsownerOrReadOnly]

class BookingListCreateView(generics.ListCreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated, IsownerOrReadOnly]

    def get_queryset(self):
        return Booking.objects.filter(user=self.request.user)
    
    

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class BookingDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated, IsownerOrReadOnly]


    def get_queryset(self):
        return Booking.objects.filter(guest=self.request.user)   


class UserDetailView(views.APIView):
    def get(self, request, token):
        user = get_user_model().objects.get(token=token)
        return Response({
            'username': user.username,
            'is_host': user.is_host
        })
    
   