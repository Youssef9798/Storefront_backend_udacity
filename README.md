# Storefront_backend_udacity
## Database Schema
### Users Table
|id |email | fisrtname | lastname | password |
|:--- |:--- | ---: | :---:| :---:|
### Products Table
|id |name | price | category |
|:--- |:--- | ---: | :---:|
### Orders Table
|id |user_id | order_status |
|:--- |:--- | ---: |
### Orders_products Table
|id |order_id | product_id | product_quantity |
|:--- |:--- | ---: | ---: |

 
## Endpoints
### Users
|METHOD |ENDPOINT | REQUEST BODY & PARAMS | RESPONSE |
|:--- |:--- | ---: | :---:|
|GET |  localhost:3000/api/users  | NEED AUTH | List of all users | 
|GET |  localhost:3000/api/users/:id   | id of the user && NEED AUTH  | List Single user |
|POST|  localhost:3000/api/users   | { email, firstname, lastname, password } && NEED AUTH  | Created user |
|POST|  localhost:3000/api/users/authenticate   | { email, password }  | Authenticated User |

### Products
|METHOD |ENDPOINT | REQUEST BODY & PARAMS | RESPONSE |
|:--- |:--- | ---: | :---:|
|GET |  localhost:3000/api/products  | | List of all products | 
|GET |  localhost:3000/api/products/:id  | id of the product | List Single product |
|POST|  localhost:3000/api/products   | NEED AUTH && { name, prcie, category } | Created product |

### Orders
|METHOD |ENDPOINT | REQUEST BODY & PARAMS | RESPONSE |
|:--- |:--- | ---: | :---:|
|GET |  localhost:3000/api/user/:id/orders  | NEED AUTH && user id | List of all orders for the user | 
|POST |  localhost:3000/api/user/:id/orders  | NEED AUTH && user id | Created order |
|POST|  localhost:3000/api/user/:id/orders/add-product  | NEED AUTH && user id && { order_id, product_id, product_quantity } | Added product order record|

