# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('promotions', '0002_globalpromotion'),
    ]

    operations = [
        migrations.CreateModel(
            name='ExtendedPagePromotion',
            fields=[
                ('pagepromotion_ptr', models.OneToOneField(parent_link=True, auto_created=True, primary_key=True, serialize=False, to='promotions.PagePromotion')),
                ('global_use', models.BooleanField(default=False)),
            ],
            options={
                'ordering': ['-clicks'],
                'abstract': False,
                'verbose_name': 'Linked Promotion',
                'verbose_name_plural': 'Linked Promotions',
            },
            bases=('promotions.pagepromotion',),
        ),
        migrations.RemoveField(
            model_name='globalpromotion',
            name='content_type',
        ),
        migrations.DeleteModel(
            name='GlobalPromotion',
        ),
    ]
