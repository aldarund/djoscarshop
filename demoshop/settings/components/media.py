# -*- coding: utf-8 -*-
# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.7/howto/static-files/


STATIC_URL = '/static/'

MEDIA_URL = '/media/'
STATIC_ROOT = BASE_DIR + '/www/static'
MEDIA_ROOT = BASE_DIR + '/media'

STATICFILES_DIRS = (
    location('static'),
)
