from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken

from user_api.models import User

from user_api.serializers import UserSerializer


class UserRegistrationView(APIView):
    def post(self, request, *args, **kwargs):
        request.data['role'] = 'blogger'
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()

            return Response({
                'message': 'User registered successfully',
            })

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        credential = request.data.get('credential')
        password = request.data.get('password')

        if not credential:
            return Response({
                'errors': ['Log in credential missing.'],
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            try:
                user = User.objects.get(email=credential)
            except:
                user = User.objects.get(cell_no=credential)
        except:
            try:
                user = User.objects.get(username=credential)
            except:
                user = None

        if user is None:
            return Response({
                'errors': ['User not found.'],
            }, status=status.HTTP_404_NOT_FOUND)

        if not user.check_password(password):
            return Response({
                'errors': ['Invalid password'],
            }, status=status.HTTP_401_UNAUTHORIZED)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        else:
            return Response({'detail': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)
        

class UserProfileView(APIView):
    def get(self, request, *args, **kwargs):
        pk = kwargs.get('pk')

        if pk:
            try:
                user = User.objects.get(pk=pk)
            except User.DoesNotExist:
                return Response({
                    'details': 'User not found',
                }, status=status.HTTP_404_NOT_FOUND)
            
            serializer = UserSerializer(user)

            return Response(serializer.data)
    
        user = request.user
        
        if user.is_anonymous:
            return Response({
                'details': 'User is not authenticated',
            }, status=status.HTTP_401_UNAUTHORIZED)

        serializer = UserSerializer(user)
        
        return Response(serializer.data)
    

