from typing import Any, AsyncGenerator, Dict
from uuid import UUID

from ariadne import (EnumType, MutationType, QueryType, SubscriptionType,
                     convert_kwargs_to_snake_case, gql)
from ariadne.types import GraphQLResolveInfo
from channels.layers import get_channel_layer
from todomvc.decorators import is_authenticated

from .models import Todo

todo_type_defs = gql(
    """
    type Todo {
        uuid: Uuid!
        user: User!
        title: String!
        completed: Boolean!
    }
    """
)

query = QueryType()
mutation = MutationType()
subscription = SubscriptionType()


@query.field("allTodos")
@is_authenticated
def resolve_all_todos(_, info):
    user = info.context.user
    return Todo.objects.filter(user=user)


@mutation.field("createTodo")
@is_authenticated
def resolve_create_todo(_, info, title):
    user = info.context.user
    return Todo.objects.create(user=user, title=title)


@mutation.field("updateTodo")
@is_authenticated
def resolve_update_todo(_, info, uuid, completed):
    user = info.context.user
    todo = Todo.objects.get(uuid=uuid, user=user)
    todo.completed = completed
    todo.save()
    return todo


@mutation.field("deleteTodo")
@is_authenticated
def resolve_delete_todo(_, info, uuid):
    user = info.context.user
    todo = Todo.objects.get(uuid=uuid, user=user)
    todo.delete()
    return todo

@subscription.source("createTodo")
@subscription.source("updateTodo")
@is_authenticated
async def subscription_generator(
    obj: Any, info: GraphQLResolveInfo
) -> AsyncGenerator[Dict, None]:
    channel_layer = get_channel_layer()
    subscription_source = info.context["subscription_source"]
    while True:
        msg = await channel_layer.receive(subscription_source)
        if "ContentType" in msg:
            if "uuid" in msg:
                msg["uuid"] = UUID(msg["uuid"])
            yield msg


@is_authenticated
@subscription.field("createTodo")
def create_card_scan_resolver(msg, info):
    if msg["ContentType"] == "Todo":
        user = info.context["request"].user
        if msg['user'] == user:
            return msg


@is_authenticated
@subscription.field("updateTodo")
def update_attendance_resolver(msg, info):
    if msg["ContentType"] == "Todo":
        user = info.context["request"].user
        if msg['user'] == user:
            return msg


schema = [query, mutation, subscription]
