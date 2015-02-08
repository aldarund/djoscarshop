# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('promotions', '0003_auto_20150204_1503'),
    ]

    operations = [
        migrations.CreateModel(
            name='BoxedRawHTML',
            fields=[
                ('rawhtml_ptr', models.OneToOneField(parent_link=True, auto_created=True, primary_key=True, serialize=False, to='promotions.RawHTML')),
                ('wide', models.BooleanField(default=False)),
                ('classes', models.CharField(default=b'', max_length=512)),
            ],
            options={
                'abstract': False,
                'verbose_name': 'Promotion',
                'verbose_name_plural': 'Promotions',
            },
            bases=('promotions.rawhtml',),
        ),
    ]
