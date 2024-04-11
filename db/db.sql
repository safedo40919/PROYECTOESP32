DROP DATABASE IF EXISTS esp32;
CREATE DATABASE esp32;

USE esp32;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id VARCHAR(255)  PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255)
);

DROP TABLE IF EXISTS sensores;
CREATE TABlE sensores (
  id VARCHAR(255) PRIMARY KEY,
  status VARCHAR(50),
  time Date,
  user_id VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES users(id)  
); 

DROP TABLE IF EXISTS leds;
CREATE TABLE leds(
  id VARCHAR(255) PRIMARY KEY,
  status VARCHAR(255),
  user_id VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO users (id, name, email, password)
VALUES (12, 'jose', 'jose@gmail.com', 'safedo20');

INSERT INTO sensores (id, status, time, user_id)
VALUES (33, 'hay movimiento', '2024-04-06', 12);

INSERT INTO leds (id, status, user_id)
VALUES (1, 'on', 12);

SELECT * FROM users;
SELECT * FROM sensores;
SELECT * FROM leds;


SELECT * FROM leds
INNER JOIN users ON leds.user_id = users.id;
