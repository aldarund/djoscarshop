import json
from django import template
from oscar.core.loading import get_model
from django.core.serializers.json import DjangoJSONEncoder
from django.utils.safestring import mark_safe
from oscar.templatetags.currency_filters import currency
from sorl.thumbnail.shortcuts import get_thumbnail

register = template.Library()

@register.assignment_tag()
def basket_to_json(request):
    lst = []
    for line in request.basket.all_lines():
        p_image = line.product.primary_image()
        lst.append({
            'id': line.product.pk,
            'thumbnail': get_thumbnail(p_image.original, '400x600', cut=True).url,
            'title': line.product.get_title(),
            'url': line.product.get_absolute_url(),
            'price': currency(line.unit_price_excl_tax, currency=request.basket.currency),
            'qty': line.quantity,
        })
    return mark_safe(json.dumps(lst, cls=DjangoJSONEncoder))
