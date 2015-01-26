from django.conf.urls import patterns, include, url
from django.contrib import admin
from oscar.app import application
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = patterns('',
    url(r'^i18n/', include('django.conf.urls.i18n')),
    # Examples:
    # url(r'^$', 'demoshop.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'', include(application.urls)),
)

# urlpatterns += patterns('django.contrib.gis.sitemaps.views',
#     (r'^sitemap.xml$', 'index'),
#     (r'^sitemaps/(?P<section>\w+)\.xml$', 'sitemap'),
#     (r'^sitemaps/kml/(?P<label>\w+)/(?P<model>\w+)/(?P<field_name>\w+)\.kml$', 'kml'),
#     (r'^sitemaps/kml/(?P<label>\w+)/(?P<model>\w+)/(?P<field_name>\w+)\.kmz$', 'kmz'),
# )


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
