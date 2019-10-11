from django import forms
from todos.models import Todo


class TodoForm(forms.ModelForm):
    def save(self, *args, **kwargs):
        kwargs["commit"] = False
        todo = super().save(*args, **kwargs)
        if not todo.pk:
            todo.user = self.user
        todo.save()
        return todo

    class Meta:
        model = Todo
        fields = ("user", "title", "completed")
