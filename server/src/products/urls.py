from django.urls import path
from .views import TestView


urlpatterns = [
    path('products', TestView.as_view(), name = 'test')
]
