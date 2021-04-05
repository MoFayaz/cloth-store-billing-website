from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = (
            'code','image', 'name', 'size', 'price', 'status', 'stock_volume'
        )
