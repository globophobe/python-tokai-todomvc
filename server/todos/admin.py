from django.contrib import admin
from .models import Todo
from .forms import TodoForm


@admin.register(Todo)
class TodoAdmin(admin.ModelAdmin):
    list_display = ("title", "completed", "user")
    search_fields = ("title",)
    form = TodoForm
    fields = ("uuid", "user", ("title", "completed"))
    readonly_fields = ("uuid", "user")

    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj=obj, **kwargs)
        form.user = request.user
        return form
