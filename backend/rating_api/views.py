from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication

from rating_api.serializers import RatingSerializer



class RatingView(APIView):
    authentication_classes = [SessionAuthentication, JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = RatingSerializer


    def post(self, request, *args, **kwargs):
        temp_data = request.data.copy()
        temp_data['rater'] = request.user.id

        serializer = self.serializer_class(data=temp_data, context={'request': request})

        if serializer.is_valid():
            serializer.save()
        else:
            return Response(serializer.errors)

        return Response(serializer.data)
