from dj_rest_auth.registration.serializers import RegisterSerializers
from rest_framework import serializers


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
