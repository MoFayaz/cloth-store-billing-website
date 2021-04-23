from django.db import models

# Create your models here.
class Product(models.Model):

    code = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    image = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    price = models.PositiveIntegerField(null=False)
    size = models.CharField(max_length=3)
    

    def __str__(self):
        return self.name