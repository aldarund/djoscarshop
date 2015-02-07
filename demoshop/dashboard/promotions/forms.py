from django import forms
from oscar.core.loading import get_class
from oscar.apps.dashboard.promotions.forms import *

class PagePromotionForm(PagePromotionForm):
    class Meta(PagePromotionForm.Meta):
        model = get_class('promotions.models', 'ExtendedPagePromotion')
