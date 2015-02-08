# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('promotions', '0004_boxedrawhtml'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='boxedrawhtml',
            options={'verbose_name': 'Boxed Raw HTML', 'verbose_name_plural': 'Boxed Raw HTML'},
        ),
        migrations.AddField(
            model_name='boxedrawhtml',
            name='animation',
            field=models.CharField(default=b'', max_length=512),
            preserve_default=True,
        ),
    ]
