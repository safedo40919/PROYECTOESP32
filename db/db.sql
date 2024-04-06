DROP DATABASE IF EXISTS eps32;
CREATE DATABASE eps32;

USE eps32;

CREATE TABLE users (
  id INT(10) PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255)
);

CREATE TABlE sensores (
  id INT(10) PRIMARY KEY,
  status VARCHAR(50),
  time DATE,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id)  
); 

CREATE TABLE leds(
  id INT(10) PRIMARY KEY,
  status VARCHAR(255),
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);