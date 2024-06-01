from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication

from comment_api.models import Comment

from comment_api.serializers import CommentSerializer



class CommentView(APIView):
    authentication_classes = [SessionAuthentication, JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = CommentSerializer

    def post(self, request, *args, **kwargs):
        temp_data = request.data.copy()
        temp_data['commentor'] = request.user.id

        serializer = self.serializer_class(data=temp_data)

        if serializer.is_valid():
            serializer.save()
        else:
            return Response(serializer.errors)

        return Response(serializer.data)

