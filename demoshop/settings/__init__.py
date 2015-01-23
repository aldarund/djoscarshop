# -*- coding: utf-8 -*-
import os
from split_settings.tools import optional, include

SITE_ID = 1
PROJECT_NAME = u'Shop'

def export_to(space=None):
    if space is None:
        space = locals()
        space['__file__'] = __file__
        space['SITE_ID'] = SITE_ID
        space['PROJECT_NAME'] = PROJECT_NAME

    include(
        'components/base.py',
        'components/auth.py',
        'components/locale.py',
        'components/media.py',
        'components/templates.py',
        'components/db.py',
        'components/apps.py',
        'components/logging.py',
        'components/oscar.py',

        optional('local_settings.py'),

        scope=space
    )
    return space

if os.environ['DJANGO_SETTINGS_MODULE'] == 'demoshop.settings':
    export_to(locals())
