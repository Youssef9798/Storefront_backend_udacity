CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price integer NOT NULL,
  category VARCHAR(255) 
);

INSERT INTO products (name, price, category) VALUES ('Toshiiba TV 55inches', 5000, 'Electroinces');
INSERT INTO products (name, price, category) VALUES ('Samsung TV 55inches', 5000, 'Electroinces');
INSERT INTO products (name, price, category) VALUES ('Sony TV 55inches', 5000, 'Electroinces');
INSERT INTO products (name, price, category) VALUES ('Hisense TV 55inches', 5000, 'Electroinces');
INSERT INTO products (name, price, category) VALUES ('LG TV 55inches', 5000, 'Electroinces');
INSERT INTO products (name, price, category) VALUES ('Tornedo TV 55inches', 5000, 'Electroinces');
INSERT INTO products (name, price, category) VALUES ('H&M Blue jeans', 199, 'Clothes');