from django.db import models

# Create your models here.
class Product(models.Model):

    code = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    image = models.FileField(upload_to='uploads/')
    price = models.PositiveIntegerField(null=False)
    size = models.CharField(max_length=3)
    

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("Product_detail", kwargs={"pk": self.pk})