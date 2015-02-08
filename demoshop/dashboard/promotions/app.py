from oscar.apps.dashboard.promotions.app import *
from oscar.core.loading import get_class

class PromotionsDashboardApplication(PromotionsDashboardApplication):

    for klass in get_class('promotions.conf', 'PROMOTION_CLASSES'):
        locals()['create_{0}_view'.format(klass.classname())] \
            = get_class('dashboard.promotions.views', 'Create{0}View'.format(klass.__name__))
        locals()['update_{0}_view'.format(klass.classname())] \
            = get_class('dashboard.promotions.views', 'Update{0}View'.format(klass.__name__))
        locals()['delete_{0}_view'.format(klass.classname())] \
            = get_class('dashboard.promotions.views', 'Delete{0}View'.format(klass.__name__))

    def get_urls(self):
        urls = super(PromotionsDashboardApplication, self).get_urls()
        for klass in get_class('promotions.conf', 'PROMOTION_CLASSES'):
            code = klass.classname()
            urls.extend([
                url(r'create/{0}/'.format(code),
                    getattr(self, 'create_{0}_view'.format(code)).as_view(),
                    name='promotion-create-{0}'.format(code)),
                url(r'^update/(?P<ptype>{0})/(?P<pk>\d+)/$'.format(code),
                    getattr(self, 'update_{0}_view'.format(code)).as_view(),
                    name='promotion-update'),
                url(r'^delete/(?P<ptype>{0})/(?P<pk>\d+)/$'.format(code),
                    getattr(self, 'delete_{0}_view'.format(code)).as_view(),
                    name='promotion-delete'),
            ])
        return urls

application = PromotionsDashboardApplication()
