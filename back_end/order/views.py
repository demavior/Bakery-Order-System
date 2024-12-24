from datetime import datetime
from decimal import Decimal
import json

from django.core.exceptions import ObjectDoesNotExist
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.db import transaction
from django.db.models import Max
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, get_object_or_404
from django.views.decorators.http import require_POST, require_GET

from .models import Category, Order, OrderDetail, Item, User

@csrf_exempt
def create_order_with_details(request):
    # Parse the JSON payload from the request body
    data = json.loads(request.body)

    # Get the maximum existing order number
    order_number = (Order.objects.aggregate(max_order=Max('number'))['max_order'] or 0)+1
    order_date = datetime.now().date() 
    order_total=Decimal(0) #Initialize
    #user = request.user
    user = User.objects.get(username=data.get('username'))
    
    try:
        # Start a database transaction
        with transaction.atomic():
            # Create the order object
            order = Order.objects.create(number=order_number, date=order_date, user=user)

            # Extract and process order details from the payload
            order_details = data.get('details', [])
            for detail_info in order_details:
                quantity = detail_info.get('quantity')
                item_id = detail_info.get('item_id')
                item_name = detail_info.get('item_name')
                # Get the item object based on the provided item_id
                item = Item.objects.get(name=item_name)
                unit_price = item.price
                description = item.name
                # Calculate the total price for this detail
                total_price = unit_price * quantity
                order_total += total_price  # Accumulate total price
                OrderDetail.objects.create(order=order, item=item, description=description, price=unit_price, quantity=quantity)

        # Now that all details are saved, update the order total
        order.total = order_total
        order.save()

    except Exception as e:
        # Rollback the transaction if any error occurs
        transaction.rollback()
        return JsonResponse({'error': str(e)}, status=400)

    return JsonResponse({'message': f'Order {order_number} generated with details'})

@require_GET
def get_order_with_details(request, order_number):
    # Get the order object based on the order number
    order = get_object_or_404(Order, number=order_number)#, user=request.user

    # Retrieve order details associated with the order
    order_details = OrderDetail.objects.filter(order=order)

    # Serialize the order and its details to JSON
    order_data = {
        'order_number': order.number,
        'order_date': order.date,
        'order_total': order.total,
        'details': [{'description': detail.description, 'price': detail.price, 'quantity': detail.quantity} for detail in order_details]
    }

    return JsonResponse(order_data)

@require_GET
def get_orders_by_user(request,username):
    # Get order objects based on the user
    user = User.objects.get(username=username)
    orders = Order.objects.filter(user=user)
    order_data = [{'number': order.number, 'date': order.date, 'total': order.total} for order in orders]
    # Return the JSON response
    return JsonResponse({'orders': order_data})

def delete_order(request):
    data = json.loads(request.body)
    order = Order.objects.get(number=data['number'],user=request.user)
    if order is not None:
        order.delete()
        return HttpResponse(f'Order {order.number} deleted')
    else:
        return HttpResponse('Order not found')
    
def get_items(request, category=None):
    try:
        if category is not None:
            # Retrieve category
            categ = Category.objects.get(name=category)
            # Retrieve items by category (optimized query using select_related)
            items = Item.objects.filter(category=categ).select_related('category')
            # Prepare item data
            item_data = [{'name': item.name, 'price': item.price} for item in items]
        else:
            # Retrieve items
            items = Item.objects.all().values('name','price')
            item_data = list(items)
        # Return the JSON response
        return JsonResponse({'items': item_data})
    except ObjectDoesNotExist:
        return JsonResponse({'error': 'Category not found'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

def get_categories(request):
    try:
        # Retrieve categories
        categories = Category.objects.all().values('name')
        categ_data = list(categories) 
        # Return the JSON response
        return JsonResponse({'categories': categ_data})
    except ObjectDoesNotExist:
        return JsonResponse({'error': 'Categories not found'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)