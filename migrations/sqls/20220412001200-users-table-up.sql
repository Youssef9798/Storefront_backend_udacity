CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  firstName VARCHAR(100),
  lastName VARCHAR(100),
  password VARCHAR(255)
); 