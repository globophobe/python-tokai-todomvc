from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.conf.urls import url

from .consumers import WebSocketGraphQL
from .middleware import JWTAuthMiddlewareStack

application = ProtocolTypeRouter(
    {
        "websocket": JWTAuthMiddlewareStack(
            URLRouter(
                [
                    url(r"^gql", WebSocketGraphQL),
                ]
            )
        )
    }
)
