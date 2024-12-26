# Frontend Features Summary

## Overview
This frontend is part of a web application for managing a bakery's orders and inventory. It is built with React and Vite, providing a user-friendly interface for order management and user interactions.

## Features

### 1. User Interface
#### Public Pages
- **Home Page**: Displays an overview of the bakery and featured items.
- **Contact Page**: Provides contact information and a form for users to reach out.
- **Sign In Page**: Allows users to log in to their account.
- **Sign Up Page**: Allows new users to create an account.
#### Authenticated Pages
- **User Profile Page**: Users can view and manage their profile and orders.
- **View Orders Page**: Users can view their existing orders, including details such as items, quantities, and total prices.
- **Make Orders Page**: Users can create new orders by selecting items from available categories, specifying quantities, and adding them to their cart.

### 2. Routing
- Implemented client-side routing using `react-router-dom` to navigate between different pages.

### 3. State Management
- Managed global state using React Context for user authentication and CSRF token handling.

### 4. Styling
- Applied custom styles using CSS to enhance the user interface.


## Installation
1. Clone the repository.
2. Navigate to the `frontend` directory and install dependencies:
   ```
   cd frontend
   npm install
   ```
## Usage
1. Start the React development server:
   ```
   npm run dev
   ```

## Technologies Used
- **Frontend**: React, Vite
- **Routing**: react-router-dom
- **State Management**: React Context
- **Styling**: CSS, Sass