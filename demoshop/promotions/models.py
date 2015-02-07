from django.db import models
from oscar.apps.promotions.models import *  # noqa

class ExtendedPagePromotion(PagePromotion):
    global_use = models.BooleanField(default=False)
