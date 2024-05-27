from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from user_api.models import User

from user_api.serializers import UserSerializer


class UserRegistrationView(APIView):
    def post(self, request):
        request.data['role'] = 'blogger'
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()

            return Response({
                'message': 'User registered successfully',
            })

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
