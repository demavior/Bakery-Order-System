from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.middleware.csrf import get_token

# Get CSRF token for testing only
class GetCSRFToken(APIView):
    def get(self, request, format=None):
        return Response(get_token(request))

class CreateUser(APIView):
    # Allow any user (authenticated or not) to access this URL
    permission_classes = [AllowAny]

    #POST request to create a new user
    def post(self, request, format=None):
        username = request.data['username']
        password = request.data['password']
        first_name = request.data['first_name']
        last_name = request.data['last_name']
        email = request.data['email']
        
        if User.objects.filter(username=username).exists():
            return Response(f'User {username} already exists!', status=status.HTTP_400_BAD_REQUEST)
        
        # Create a new user
        user = User.objects.create_user(username, password=password, first_name=first_name, last_name=last_name, email=email)
        # Log the user in after creating the account
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return Response(f'User {user.username} created and logged in!', status=status.HTTP_201_CREATED)

class DeleteUser(APIView):
    # Require users to be authenticated to delete their account
    permission_classes = [IsAuthenticated]

    #DELETE request to delete the user
    def delete(self, request, format=None):
        username = request.user.username
        try:
            user = User.objects.get(username=username)
            user.delete()
            return Response(f'User {username} deleted!', status=status.HTTP_204_NO_CONTENT)
        except User.DoesNotExist:
            return Response(f'User {username} does not exist!', status=status.HTTP_404_NOT_FOUND)

class LoginUser(APIView):
    permission_classes = [AllowAny]

    #POST request to log in a user
    def post(self, request, format=None):
        username = request.data['username']
        password = request.data['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return Response(f'User {username} logged in successfully!', status=status.HTTP_200_OK)
        else:
            return Response('Invalid username or password!', status=status.HTTP_401_UNAUTHORIZED)
        
class IsLoggedInView(APIView):
    permission_classes = [AllowAny]  # Allow any user to access this view, regardless of authentication status

    def get(self, request, format=None):
        is_logged_in = request.user.is_authenticated
        if is_logged_in:
            return Response({"is_logged_in": True, "username": request.user.username})
        else:
            return Response({"is_logged_in": False})
        
class LogoutUser(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        username = request.user.username
        logout(request)
        return Response(f'User {username} logged out!', status=status.HTTP_200_OK)