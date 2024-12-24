from .import views
from django.urls import path

urlpatterns = [
    path('create/', views.create_order_with_details, name='create'),
    path('getByNumber/<str:order_number>', views.get_order_with_details, name='get'),
    path('getByUser/<str:username>', views.get_orders_by_user, name='get'),
    path('delete/', views.delete_order, name='delete'),
    path('getItems/<str:category>', views.get_items, name='getItems'),
    path('getItems/', views.get_items, name='getItems'),
    path('getCategories/', views.get_categories, name='getCategories')
]