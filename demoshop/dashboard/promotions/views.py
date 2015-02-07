from oscar.apps.dashboard.promotions.views import *
from django.utils.translation import ugettext_lazy as _

class UpdateMixin(object):

    def add_to_page(self, promotion, request, *args, **kwargs):
        instance = self.link_form_class.Meta.model(content_object=self.get_object())
        form = self.link_form_class(request.POST, instance=instance)
        if form.is_valid():
            form.save()
            print form.cleaned_data, instance.global_use
            page_url = form.cleaned_data['page_url']
            messages.success(request, _("Content block '%(block)s' added to"
                                        " page '%(page)s'")
                             % {'block': promotion.name,
                                'page': page_url})
            return HttpResponseRedirect(reverse('dashboard:promotion-update',
                                                kwargs=kwargs))

        main_form = self.get_form_class()(instance=self.object)
        ctx = self.get_context_data(form=main_form)
        ctx['link_form'] = form
        return self.render_to_response(ctx)

class UpdateRawHTMLView(UpdateMixin, UpdateRawHTMLView):
    pass

class UpdateSingleProductView(UpdateMixin, UpdateSingleProductView):
    pass

class UpdateImageView(UpdateMixin, UpdateImageView):
    pass

class UpdateMultiImageView(UpdateMixin, UpdateMultiImageView):
    pass

class UpdateAutomaticProductListView(UpdateMixin, UpdateAutomaticProductListView):
    pass

class UpdateHandPickedProductListView(UpdateMixin, UpdateHandPickedProductListView):
    pass
