from graphql import GraphQLError

from .constants import AUTH_REQ


def is_authenticated(func):
    def wrapper(*args, **kwargs):
        info = args[1]
        user = info.context.user
        if user.is_authenticated:
            return func(*args, **kwargs)
        else:
            raise GraphQLError(AUTH_REQ)

    return wrapper
