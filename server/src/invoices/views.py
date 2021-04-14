from django.shortcuts import render

from .serializers import InvoiceSerializer
from .models import Invoice

from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import mixins
from rest_framework.response import Response


# Create your views here.
class InvoiceDetailView(APIView):
    def get(self, request, icode, *args, **kwargs):
        qs = Invoice.objects.filter(code__exact=icode)
        serializer = InvoiceSerializer(qs, many=False)
        return Response(serializer.data)

class InvoiceView(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):

    serializer_class = InvoiceSerializer
    queryset = Invoice.objects.all()

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)