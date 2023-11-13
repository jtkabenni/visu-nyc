CREATE TABLE users (
  username VARCHAR(100) PRIMARY KEY,
  password TEXT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  is_admin BOOLEAN NOT NULL DEFAULT FALSE,
  auth_type TEXT NOT NULL DEFAULT 'custom'
);


CREATE TABLE maps (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  file TEXT NOT NULL,
  note TEXT NOT NULL,
  user_username VARCHAR(100) NOT NULL
    REFERENCES users ON DELETE CASCADE
);
