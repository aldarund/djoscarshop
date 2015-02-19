from oscar.apps.catalogue.search_handlers import *
from oscar.core.loading import get_class, get_model

class ProductSearchHandler(ProductSearchHandler):

    def __init__(self, request_data, full_path, categories=None):
        self.categories = categories
        super(ProductSearchHandler, self).__init__(request_data, full_path)

    def get_search_queryset(self):
        sqs = super(ProductSearchHandler, self).get_search_queryset()
        if self.categories:
            # We use 'narrow' API to ensure Solr's 'fq' filtering is used as
            # opposed to filtering using 'q'.
            pattern = ' OR '.join([
                '"%s"' % c.full_name for c in self.categories])
            sqs = sqs.narrow('category_exact:(%s)' % pattern)
        return sqs


class SimpleProductSearchHandler(SimpleProductSearchHandler):

    def __init__(self, request_data, full_path, categories=None):
        self.categories = categories
        self.kwargs = {'page': request_data.get('page', 1)}
        self.object_list = self.get_queryset()
        try:
            self.paginate_by = int(request_data.get('limit'))
        except TypeError:
            pass

    def get_queryset(self):
        qs = Product.browsable.base_queryset()
        if self.categories:
            qs = qs.filter(categories__in=self.categories).distinct()
        return qs

    def get_search_context_data(self, context_object_name):
        # Set the context_object_name instance property as it's needed
        # internally by MultipleObjectMixin
        self.context_object_name = context_object_name
        context = self.get_context_data(object_list=self.object_list)
        context[context_object_name] = context['page_obj'].object_list
        context['page_limit_sizes'] = [9, 12, 24, 36]
        return context
