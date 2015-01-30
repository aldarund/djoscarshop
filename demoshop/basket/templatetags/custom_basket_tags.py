import json
from django import template
from oscar.core.loading import get_model
from django.core.serializers.json import DjangoJSONEncoder
from django.utils.safestring import mark_safe
from oscar.templatetags.currency_filters import currency

register = template.Library()

@register.assignment_tag()
def basket_to_json(request):
    lst = []
    for line in request.basket.all_lines():
        lst.append({
            'id': line.product.pk,
            'thumbnail': 'http://127.0.0.1:8000/media/cache/d8/e8/d8e84ee4a19b823012d70d51e0b542ec.jpg',
            'title': line.product.get_title(),
            'url': line.product.get_absolute_url(),
            'price': currency(line.unit_price_excl_tax, currency=request.basket.currency),
            'qty': line.quantity,
        })
    return mark_safe(json.dumps(lst, cls=DjangoJSONEncoder))
