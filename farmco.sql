ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

USE farmco;

CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity DECIMAL(10, 2) NOT NULL,
    category_id INT,
    is_featured BOOLEAN DEFAULT 0, -- 0 for not featured, 1 for featured
    image VARCHAR(255),
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

ALTER TABLE products MODIFY COLUMN stock_quantity DECIMAL(10, 2);

CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL
);

INSERT INTO categories (category_name) VALUES
('Vegetables'),
('Fruits'),
('Dairy'),
('Grains');

INSERT INTO products (product_name, description, price, stock_quantity, category_id, is_featured, image) VALUES
('Carrots', 'Fresh and crunchy carrots', 1.99, 100, 1, 0, 'img_1.png'),
('Apples', 'Sweet and juicy apples', 2.49, 150, 2, 1, 'img_2.png'),
('Tomatoes', 'Ripe and flavorful tomatoes', 1.79, 120, 1, 0, 'img_3.png'),
('Bananas', 'Yellow and ripe bananas', 1.29, 200, 2, 0, 'img_4.png'),
('Milk', 'Whole milk from local farms', 3.49, 50, 3, 0, 'img_5.png'),
('Cheese', 'Aged cheddar cheese', 5.99, 30, 3, 0, 'img_6.png'),
('Rice', 'Long-grain white rice', 4.25, 80, 4, 0, 'img_7.png');

INSERT INTO products (product_name, description, price, stock_quantity, category_id, is_featured, image) VALUES
('Spinach', 'Organic baby spinach leaves', 2.99, 75, 1, 1, 'img_8.png'),
('Oranges', 'Citrusy and refreshing oranges', 3.79, 100, 2, 0, 'img_9.png'),
('Yogurt', 'Greek yogurt with probiotics', 2.99, 40, 3, 1, 'img_10.png'),
('Quinoa', 'Whole grain quinoa', 6.49, 60, 4, 0, 'img_11.png');

ALTER TABLE products
ADD COLUMN image VARCHAR(255);



