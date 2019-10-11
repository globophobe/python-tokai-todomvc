from django.utils.translation import ugettext_lazy
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from graphql import GraphQLError
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from ariadne import (
    ScalarType,
    MutationType,
    gql,
    make_executable_schema,
    snake_case_fallback_resolvers,
)
from todos.schema import schema as todo_schema
from todos.schema import todo_type_defs

type_defs = gql(
    """
    scalar Uuid

    type User {
        lastName: String!
        firstName: String!
    }

    type Login {
        access: String
        refresh: String
    }

    type Query {
        allTodos: [Todo]!
    }

    type Mutation {
        login(username: String!, password: String!): Login
        refreshToken(token: String!): Login
        createTodo(title: String!): Todo!
        updateTodo(uuid: String!, completed: Boolean!): Todo!
        deleteTodo(uuid: String!): Todo!
    }
    """
    + todo_type_defs
)


uuid_scalar = ScalarType("Uuid")


@uuid_scalar.serializer
def serialize_uuid(value):
    return str(value.hex)


mutation = MutationType()


@mutation.field("login")
def resolve_login(_, info, username, password):
    user = None
    user = authenticate(username=username, password=password)
    if user:
        refresh = RefreshToken.for_user(user)
        return {"refresh": str(refresh), "access": str(refresh.access_token)}
    else:
        error = ugettext_lazy("Username or password incorrect")
        raise GraphQLError(error)


@mutation.field("refreshToken")
def resolve_refresh_token(_, info, token):
    data = {"refresh": token}
    serializer = TokenRefreshSerializer(data=data)
    if serializer.is_valid():
        return serializer.validated_data


schema = make_executable_schema(
    type_defs, [uuid_scalar, mutation, snake_case_fallback_resolvers] + todo_schema
)
