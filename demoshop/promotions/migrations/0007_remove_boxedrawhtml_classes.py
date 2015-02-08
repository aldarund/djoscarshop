# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('promotions', '0006_boxedrawhtml_style'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='boxedrawhtml',
            name='classes',
        ),
    ]
