# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('promotions', '0005_auto_20150208_1528'),
    ]

    operations = [
        migrations.AddField(
            model_name='boxedrawhtml',
            name='style',
            field=models.CharField(default=b'', max_length=512),
            preserve_default=True,
        ),
    ]
