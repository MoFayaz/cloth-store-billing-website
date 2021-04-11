from .models import Product
from .serializers import ProductSerializer

from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import mixins

# Create your views here.

class ProductView(mixins.ListModelMixin, mixins.CreateModelMixin ,generics.GenericAPIView):
    
    serializer_class = ProductSerializer
    queryset         = Product.objects.all()

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
        

# class ProductView(APIView):
#     def get(self, request, *args, **kwargs):
#         qs = Product.objects.all()
#         serializer = ProductSerializer(qs, many=True)
#         return Response(serializer.data)
    
#     def post(self, request, *args, **kargs):
#         serializer = ProductSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors)