from ariadne import MutationType, QueryType, gql

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


schema = [query, mutation]
