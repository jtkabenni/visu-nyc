CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);


CREATE TABLE maps (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  source TEXT NOT NULL,
  file TEXT NOT NULL,
  note TEXT NOT NULL,
  user_username VARCHAR(25) NOT NULL
    REFERENCES users ON DELETE CASCADE
);
