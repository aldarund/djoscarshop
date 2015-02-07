from oscar.apps.promotions.context_processors import *
from oscar.core.loading import get_class

_promotions = promotions        # save original

def promotions(request):
    context = {
        'url_path': request.path,
    }
    promos = []
    for promo in get_request_promotions(request):
        try:
            promo.extendedpagepromotion
        except:
            promos.append(promo)
        else:
            continue
    split_by_position(promos, context)
    promos = get_global_promotions(request)
    split_by_position(promos, context)
    return context

def get_global_promotions(request):
    EClass = get_class('promotions.models', 'ExtendedPagePromotion')
    promos = EClass._default_manager.select_related() \
                                    .prefetch_related('content_object') \
                                    .filter(global_use=True) \
                                    .order_by('display_order')
    return [promo for promo in promos if request.path.startswith(promo.page_url)]
