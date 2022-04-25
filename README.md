# Storefront backend Udacity
Welcome to our store backend

## Installtion
We have a minor steps to install the packges first before work with the server and the database.
Fisrt we need to install the required packges using the following command:

    npm install

Our server is listen at port:
    
    localhost:3000 
    
and our database listen at port:

    localhost:5432
## Database Setup

We used a postgresSQL for the database and you have to install it locally first, You could use the following link to setup it:

[https://www.guru99.com/download-install-postgresql.html]

after installation done, open the psql terminal then do the following steps:

    *** Create user ***
    CREATE USER storefront_backend_admin WITH PASSWORD 'password123';

    *** Create database *** 
    CREATE DATABASE storefront_backend_db;

    *** Grant all database privileges to the created user ***
    GRANT ALL PRIVILEGES ON DATABASE storefront_backend_db TO storefront_backend_admin;

You have to run the server and the database first before access the API's

To run the server you could use the following command:

    npm run build
    npm run start

## Testing

You could use the testing commands using the following: 

    npm run test

## Database migrations

If there is any database chanes you could access the migrations and edit the SQL files then use the following commands:

    db-migrate down // to Drop the tables
    db-migrate up // to Create the tables
    
### ENV Variables:

    POSTGRES_HOST
    POSTGRES_DB
    POSTGRES_TEST
    POSTGRES_USER
    POSTGRES_PASSWORD
    ENV
    BCRYPT_PASSWORD
    SALT_ROUNDS
    TOKEN_SECRET
