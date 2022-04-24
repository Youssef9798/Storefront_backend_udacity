# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

### Users

| METHOD | ENDPOINT                              |                                 REQUEST BODY & PARAMS |      RESPONSE      |
| :----- | :------------------------------------ | ----------------------------------------------------: | :----------------: |
| GET    | localhost:3000/api/users              |                                             NEED AUTH | List of all users  |
| GET    | localhost:3000/api/users/:id          |                           id of the user && NEED AUTH |  List Single user  |
| POST   | localhost:3000/api/users              | { email, firstname, lastname, password } && NEED AUTH |    Created user    |
| POST   | localhost:3000/api/users/authenticate |                                   { email, password } | Authenticated User |

### Products

| METHOD | ENDPOINT                        |                  REQUEST BODY & PARAMS |       RESPONSE       |
| :----- | :------------------------------ | -------------------------------------: | :------------------: |
| GET    | localhost:3000/api/products     |                                        | List of all products |
| GET    | localhost:3000/api/products/:id |                      id of the product | List Single product  |
| POST   | localhost:3000/api/products     | NEED AUTH && { name, prcie, category } |   Created product    |

### Orders

| METHOD | ENDPOINT                                       |                                              REQUEST BODY & PARAMS |            RESPONSE             |
| :----- | :--------------------------------------------- | -----------------------------------------------------------------: | :-----------------------------: |
| GET    | localhost:3000/api/user/:id/orders             |                                               NEED AUTH && user id | List of all orders for the user |
| POST   | localhost:3000/api/user/:id/orders             |                                               NEED AUTH && user id |          Created order          |
| POST   | localhost:3000/api/user/:id/orders/add-product | NEED AUTH && user id && { order_id, product_id, product_quantity } |   Added product order record    |

## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

#### User

- id
- firstName
- lastName
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

## Database Schema

### Users Table

| id  | email | fisrtname | lastname | password |
| :-- | :---- | --------: | :------: | :------: |

    ` id SERIAL PRIMARY KEY, email VARCHAR(255) UNIQUE, firstName VARCHAR(100), lastName VARCHAR(100), password VARCHAR(255) `

### Products Table

| id  | name | price | category |
| :-- | :--- | ----: | :------: |

    ` id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL, price integer NOT NULL, category VARCHAR(255) `

### Orders Table

| id  | user_id | order_status |
| :-- | :------ | -----------: |

    ` id SERIAL PRIMARY KEY, user_id bigint REFERENCES users(id), order_status VARCHAR(15) DEFAULT 'active'`

### Orders_products Table

| id  | order_id | product_id | product_quantity |
| :-- | :------- | ---------: | ---------------: |

    ` id SERIAL PRIMARY KEY, order_id bigint REFERENCES orders(id), product_id bigint REFERENCES products(id), product_quantity integer`
