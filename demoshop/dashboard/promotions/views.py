from oscar.apps.dashboard.promotions.views import *
from django.utils.translation import ugettext_lazy as _
from oscar.core.loading import get_class
from django.core.urlresolvers import reverse


class ListView(ListView):

    def get_context_data(self):
        PROMOTION_CLASSES = get_class('promotions.conf', 'PROMOTION_CLASSES')
        # Need to load all promotions of all types and chain them together
        # no pagination required for now.
        data = []
        num_promotions = 0
        for klass in PROMOTION_CLASSES:
            objects = klass.objects.all()
            num_promotions += objects.count()
            data.append(objects)
        promotions = itertools.chain(*data)
        def unique(items):
            used = set()
            for item in items:
                iclass = item.__class__
                if (item.pk, iclass) not in used:
                    yield item
                for hclass in PROMOTION_CLASSES:
                    if issubclass(iclass, hclass):
                        used.add((item.pk, hclass))
        ctx = {
            'num_promotions': num_promotions,
            'promotions': unique(promotions),
            'select_form': SelectForm(),
        }
        return ctx

class CreateRedirectView(CreateRedirectView):

    def get_redirect_url(self, **kwargs):
        PROMOTION_CLASSES = get_class('promotions.conf', 'PROMOTION_CLASSES')
        code = self.request.GET.get('promotion_type', None)
        urls = {}
        for klass in PROMOTION_CLASSES:
            urls[klass.classname()] = reverse('dashboard:promotion-create-%s' %
                                              klass.classname())
        return urls.get(code, None)

class UpdateMixin(object):

    def add_to_page(self, promotion, request, *args, **kwargs):
        if 'global_use' in request.POST:
            instance = self.link_form_class.Meta.model(content_object=self.get_object())
        else:
            instance = PagePromotion(content_object=self.get_object())
        form = self.link_form_class(request.POST, instance=instance)
        if form.is_valid():
            form.save()
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

class CreateBoxedRawHTMLView(CreateView):
    model = get_class('promotions.models', 'BoxedRawHTML')
    form_class = get_class('dashboard.promotions.forms', 'BoxedRawHTMLForm')

class UpdateBoxedRawHTMLView(UpdateView):
    model = get_class('promotions.models', 'BoxedRawHTML')
    form_class = get_class('dashboard.promotions.forms', 'BoxedRawHTMLForm')

class DeleteBoxedRawHTMLView(DeleteView):
    model = get_class('promotions.models', 'BoxedRawHTML')
