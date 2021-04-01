from django.db import models

# Create your models here.
class Product(models.Model):

    code = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    size = models.CharField(max_length=1)
    price = models.PositiveIntegerField(null=False)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("Product_detail", kwargs={"pk": self.pk})