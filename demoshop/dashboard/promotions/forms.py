from django import forms
from oscar.core.loading import get_class
from oscar.apps.dashboard.promotions.forms import *
from django.utils.translation import ugettext_lazy as _

class PagePromotionForm(PagePromotionForm):
    class Meta(PagePromotionForm.Meta):
        model = get_class('promotions.models', 'ExtendedPagePromotion')

class BoxedRawHTMLForm(RawHTMLForm):
    class Meta(RawHTMLForm.Meta):
        model = get_class('promotions.models', 'BoxedRawHTML')

class PromotionTypeSelectForm(PromotionTypeSelectForm):
    choices = []
    for klass in get_class('promotions.conf', 'PROMOTION_CLASSES'):
        choices.append((klass.classname(), klass._meta.verbose_name))
    promotion_type = forms.ChoiceField(choices=tuple(choices),
                                       label=_("Promotion type"))
