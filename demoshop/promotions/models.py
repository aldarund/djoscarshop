from django.db import models
from oscar.apps.promotions.models import *  # noqa
from django.utils.translation import ugettext_lazy as _

class ExtendedPagePromotion(PagePromotion):
    global_use = models.BooleanField(default=False)

class BoxedRawHTML(RawHTML):
    wide = models.BooleanField(default=False)
    animation = models.CharField(max_length=512, default='')
    style = models.CharField(max_length=512, default='')

    class Meta(RawHTML.Meta):
        verbose_name = _('Boxed Raw HTML')
        verbose_name_plural = _('Boxed Raw HTML')
