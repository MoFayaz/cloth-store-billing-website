from django.db import models
from datetime import date
from django.urls import reverse


# Create your models here.

class Invoice(models.Model):

    invoiceId           = models.CharField(max_length=50, null=False)
    invoiceDate         = models.DateField(auto_now_add=True)
    customerName        = models.CharField(max_length=50, null=False)
    customerEmail       = models.EmailField(max_length=254, null=False)
    productCode         = models.CharField(max_length=50, null= False)
    productName         = models.CharField(max_length=50, null=False)
    productSize         = models.CharField(max_length=50, null=False)
    productPrice        = models.PositiveIntegerField(null=False)
    quantity            = models.PositiveIntegerField(default=1)
    occasionDate        = models.DateField(null=False, auto_now_add=False)
    returnDate          = models.DateField(null=False,auto_now=False, auto_now_add=False)
    returnTime          = models.TimeField(auto_now=False, auto_now_add=False)
    rentalChoice        = models.CharField(max_length=50)
    advanceAmount       = models.PositiveIntegerField()
    rentalAmount        = models.PositiveIntegerField()
    refundAmount        = models.PositiveIntegerField()
    maintenanceAmount   = models.PositiveIntegerField()
    billingAmount       = models.PositiveIntegerField()
    paidAmount          = models.PositiveIntegerField()

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("Invoice_detail", kwargs={"pk": self.pk})
