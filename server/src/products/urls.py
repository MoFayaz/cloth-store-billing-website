from django.urls import path
from .views import ProductCodeView, ProductView


urlpatterns = [
    path('products/<str:pcode>/', ProductCodeView.as_view(), name='product-code'),
    path('products/', ProductView.as_view(), name='product' )
]
