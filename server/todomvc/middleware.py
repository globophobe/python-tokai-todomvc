from channels.auth import AuthMiddlewareStack
from django.contrib.auth.models import AnonymousUser
from django.db import close_old_connections
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import (AuthenticationFailed,
                                                 InvalidToken)


class JWTAuthMiddleware:
    """
    Token authorization middleware for Django Channels 2
    """

    def __init__(self, inner):
        self.inner = inner

    def __call__(self, scope):
        headers = dict(scope["headers"])
        # Close old database connections to prevent usage of timed out connections
        close_old_connections()
        if b"authorization" in headers:
            try:
                key, value = headers[b"authorization"].decode().split()
                if key == "Token":
                    jwt_auth = JWTAuthentication()
                    token = jwt_auth.self.get_validated_token(value)
                    user = jwt_auth.get_user(token)
                    scope["user"] = user
            except (InvalidToken, AuthenticationFailed):
                scope["user"] = AnonymousUser()
        return self.inner(scope)


JWTAuthMiddlewareStack = lambda inner: JWTAuthMiddleware(AuthMiddlewareStack(inner))
