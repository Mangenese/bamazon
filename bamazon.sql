DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id INT AUTO_INCREMENT NOT NULL,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(100) NOT NULL,
price DECIMAL(12,2) NOT NULL,
stock_quantity INT(10) NOT NULL,
PRIMARY KEY (item_id)
);



INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Naginata", "Recreational Activities", 149.95, 2),
("Katana", "Recreational Activities", 300.00, 5),
("Persona 5 Royal", "Video Game", 59.99, 20),
("DOOM Eternal", "Video Game", 59.99, 3),
("Basketball", "Outdoors", 10.20, 60),
("Sleeping Bag", "Outdoors", 19.99, 23),
("Pillow", "House & Decor", 5.99, 40),
("Comforter", "House & Decor", 65.99, 12),
("Pepsi", "Beverages", .99, 100),
("Sake", "Beverages", 45.99, 2);


SELECT * FROM products;