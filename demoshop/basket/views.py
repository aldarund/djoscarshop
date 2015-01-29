# -*- coding: utf-8 -*-
import json
from django.http import HttpResponse
from django.contrib.messages import get_messages
from oscar.apps.basket.views import BasketAddView
from oscar.core import ajax

class BasketAddView(BasketAddView):

    def form_invalid(self, form):
        if self.request.is_ajax():
            super(BasketAddView, self).form_invalid(form)
            flash_messages = ajax.FlashMessages()
            for msg in get_messages(self.request):
                flash_messages.add_message(msg.level, msg.message)
            return self.json_response('error', flash_messages)
        else:
            return super(BasketAddView, self).form_invalid(form)

    def form_valid(self, form):
        if self.request.is_ajax():
            super(BasketAddView, self).form_valid(form)
            flash_messages = ajax.FlashMessages()
            for msg in get_messages(self.request):
                flash_messages.add_message(msg.level, msg.message)
            return self.json_response('success', flash_messages)
        else:
            return super(BasketAddView, self).form_valid(form)

    def json_response(self, status, flash_messages):
        answer = json.dumps({'status': status, 'messages': flash_messages.as_dict()})
        return HttpResponse(answer, content_type='application/json')
