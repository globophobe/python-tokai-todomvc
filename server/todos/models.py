from uuid import uuid4
from django.db import models
from django.conf import settings
from django.utils.translation import ugettext_lazy as _


class Todo(models.Model):
    uuid = models.UUIDField(default=uuid4)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, verbose_name=_("user")
    )
    title = models.CharField(_("title"), max_length=256)
    completed = models.BooleanField(_("completed"), default=False)

    def __str__(self):
        return self.title

    class Meta:
        db_table = "todo"
        verbose_name = _("todo")
        verbose_name_plural = verbose_name
