from oscar.apps.promotions import conf as _conf
from oscar.apps.promotions.conf import *
from oscar.core.loading import get_class

_get_promotion_classes = get_promotion_classes
def get_promotion_classes():
    HTMLClass = get_class('promotions.models', 'BoxedRawHTML')
    return (HTMLClass,) + _get_promotion_classes()

PROMOTION_CLASSES = get_promotion_classes()
