from channels.generic.websocket import AsyncJsonWebsocketConsumer

from .schema import schema
from .websocket_graphql import WebSocketGraphQL


class JinjukuWebSocketGraphQL(WebSocketGraphQL):
    schema = schema

    async def graphql_subscription(self, msg):
        for subscription_source in self.subscription_sources:
            await self.channel_layer.send(subscription_source, msg)
