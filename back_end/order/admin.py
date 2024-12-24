from django.contrib import admin
from .models import Order
from .models import OrderDetail
from .models import Item
from .models import Category

admin.site.register(Order)
admin.site.register(OrderDetail)

admin.site.register(Item)
admin.site.register(Category)