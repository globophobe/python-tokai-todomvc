from ariadne.contrib.django.views import GraphQLView
from django.conf import settings
from rest_framework.parsers import JSONParser
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication


class CsrfExemptSessionAuthentication(SessionAuthentication):
    def enforce_csrf(self, request):
        pass


class JWTGraphQLView(APIView, GraphQLView):
    if settings.DEBUG:
        authentication_classes = (CsrfExemptSessionAuthentication, JWTAuthentication)
    else:
        authentication_classes = (JWTAuthentication,)
    parser_classes = (JSONParser,)
    permission_classes = (AllowAny,)
