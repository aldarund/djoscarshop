# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('contenttypes', '0001_initial'),
        ('promotions', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='GlobalPromotion',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('object_id', models.PositiveIntegerField()),
                ('position', models.CharField(help_text=b'Position on page', max_length=100, verbose_name='Position')),
                ('display_order', models.PositiveIntegerField(default=0, verbose_name='Display Order')),
                ('clicks', models.PositiveIntegerField(default=0, verbose_name='Clicks')),
                ('date_created', models.DateTimeField(auto_now_add=True, verbose_name='Date Created')),
                ('content_type', models.ForeignKey(to='contenttypes.ContentType')),
            ],
            options={
                'verbose_name': 'Global promotion',
                'verbose_name_plural': 'Global promotion',
            },
            bases=(models.Model,),
        ),
    ]
