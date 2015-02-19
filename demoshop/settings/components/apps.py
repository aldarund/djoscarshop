# Application definition

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.flatpages',
    'django.contrib.sitemaps',
    'compressor',
) + tuple(oscar.get_core_apps([
    'demoshop.basket',
    'demoshop.promotions',
    'demoshop.catalogue',
    'demoshop.dashboard',
    'demoshop.dashboard.promotions',
]))
