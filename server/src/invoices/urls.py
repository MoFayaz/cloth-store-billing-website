from django.urls import path
from .views import InvoiceDetailView, InvoiceView



urlpatterns = [
    path('invoice/', InvoiceView.as_view(), name='invoice'),
    path("invoice/<str:icode>/", InvoiceDetailView.as_view(), name='invoice-detail')
]
