from enum import unique
from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Order(models.Model):
    number = models.IntegerField(default=0, unique=True)
    date = models.DateField(null=True)
    total = models.DecimalField(decimal_places=2,max_digits=10,null=True)
    comment = models.TextField(null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True)
    
    def __str__(self):
        return "#" + str(self.number)

class OrderDetail(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='order_details')
    item = models.ForeignKey('Item', on_delete=models.PROTECT)
    description = models.CharField(max_length=100)
    price = models.DecimalField(decimal_places=2,max_digits=10,null=True)
    quantity = models.IntegerField(default=0)

    def __str__(self):
        return str(self.order) + ' - ' + self.description + ' x ' + str(self.quantity) + ' = ' + str(self.price)

class Item(models.Model):
    name = models.CharField(max_length=100, unique=True)
    category = models.ForeignKey('Category', on_delete=models.PROTECT)
    price = models.DecimalField(decimal_places=2,max_digits=10,null=True)

    def __str__(self):
        return self.name

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name