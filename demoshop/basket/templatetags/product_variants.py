import json
from django import template
from django.core.serializers.json import DjangoJSONEncoder
from django.utils.safestring import mark_safe
from oscar.apps.catalogue.models import *

register = template.Library()

@register.assignment_tag()
def get_variant_options(code):
    attr = ProductAttribute.objects.filter(option_group__isnull=False, code=code)
    return {
        'group': attr,
        'options': attr[0].option_group.options.all(),
    }

@register.filter()
def get_variant_values(product, attr_name):
    if product.children:
        return [getattr(child.attr, attr_name) for child in product.children.all()]
    else:
        return [getattr(product.attr, attr_name)]
