from dj_rest_auth.registration.serializers import RegisterSerializers
from rest_framework import serializers
from .models import User, Property, Room, Booking, RoomBooking, Review, Photo, PropertyType, Amenity, AmenityType


class CustomRegisterSerializer(RegisterSerializer):
    is_host = serializers.BooleanField(required=False)

    def get_cleaned_data(self):
        super(CustomRegisterSerializer, self).get_cleaned_data()
        return {
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'email': self.validated_data.get('email', ''),
            'is_host': self.validated_data.get('is_host', ''),
        }

    class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = User
            fields = ('username', 'first_name', 'Last_name', 'email', 'is_host',)
            (class) RoomSerializer



    class RoomSerializer(serializers.ModelSerializer):
        class Meta:
            Model = Room
            fields = '__all__'
    


    class BookingSerializer(serializers.ModelSerializer):
        class Meta:
            Model = Booking
            fields = '__all__'




    class RoomBookingSerializer(serializers.ModelSerializer):
        class Meta:
            Model = RoomBooking
            fields = '__all__'



    class ReviewSerializer(serializers.ModelSerializer):
        class Meta:
            Model = Review
            fields = '__all__'


    class PhotoSerializer(serializers.ModelSerializer):
        class Meta:
            Model = Photo
            fields = '__all__'



    class PropertyTypeSerializer(serializers.ModelSerializer):
        class Meta:
            Model = PropertyType
            fields = '__all__'


    class AmenitySerializer(serializers.ModelSerializer):
        class Meta:
            Model = Amenity
            fields = '__all__'


    class AmenityTypeSerializer(serializers.ModelSerializer):
        class Meta:
            Model = AmenityType
            fields = '__all__'



    class PropertySerializer(serializers.ModelSerializer):
        host = UserSerializer()
        class Meta:
            Model = Property
            fields = '__all__'
            depth = 1


