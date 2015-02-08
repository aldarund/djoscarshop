from oscar.apps.promotions.admin import *  # noqa
from oscar.core.loading import get_class

admin.site.register(get_class('promotions.models', 'BoxedRawHTML'))
