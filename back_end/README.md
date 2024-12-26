# Backend Features Summary

## Overview
This backend is part of a web application for managing a bakery's orders and inventory. It is built with Django and provides various API endpoints for authentication, order management, and more.

## Features

### 1. Authentication and Authorization
- Implemented user authentication using Django's built-in authentication system.
- Implemented authorization to restrict access to certain endpoints based on user roles and permissions.

### 2. API Endpoints

#### Categories and Items
- **Get Categories**: API endpoint to retrieve all available categories.
- **Get Items**: API endpoint to retrieve all available items.
- **Get Items by Category**: API endpoint to retrieve items based on a specified category.

#### Orders and Order Details
- **Get Orders by User**: API endpoint to retrieve orders associated with a specific user.
- **Get Order Details by Order Number**: API endpoint to retrieve order details for a specific order.
- **Create Order with Details**: API endpoint to create a new order along with its details.
- **Delete Order**: API endpoint to delete an existing order.

### 3. Database Models
- **Category**: Django model representing a category of items.
- **Item**: Django model representing an individual item.
- **Order**: Django model representing an order placed by a user.
- **OrderDetails**: Django model representing the details of an order, including items and quantities.

### 4. User Management
- **Sign Up Page**: Implemented a sign-up page for new users to create an account.
- **User Profile**: Each user has a profile where they can view their orders.

### 5. Persistence and Storage
- **Database Persistence**: Utilized Django ORM to interact with the database for data persistence.
- **File Storage**: Implemented file storage mechanisms to store uploaded files, if applicable.

### 6. Security
- **CSRF Protection**: Implemented CSRF (Cross-Site Request Forgery) protection to prevent unauthorized requests.
- **User Session Management**: Maintained user sessions to keep users logged in across requests.

## Installation
1. Clone the repository.
2. Set up the virtual environment and install dependencies:
   ```
   cd backend
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

## Usage
1. Start the Django server
   ```
   cd backend
   source venv/bin/activate
   python manage.py runserver
   ```

## Technologies Used
- **Backend**: Django, Django REST Framework
- **Database**: SQLite (or your preferred database)