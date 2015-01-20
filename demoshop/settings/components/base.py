import oscar
from oscar.defaults import *
"""
Django settings for demoshop project.

For more information on this file, see
https://docs.djangoproject.com/en/1.7/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.7/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os
BASE_DIR = os.path.dirname(os.path.dirname(__file__))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.7/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '9+e8(=09@z29jyu(#$#_177d_7%ng4+k#2_wyah%edp^%rv+%+'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

TEMPLATE_DEBUG = True

ALLOWED_HOSTS = []

location = lambda dirname, BASE_DIR=BASE_DIR, os=os: os.path.join(BASE_DIR, '..', dirname)

ROOT_URLCONF = 'demoshop.urls'

WSGI_APPLICATION = 'demoshop.wsgi.application'
