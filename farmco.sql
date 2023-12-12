ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

USE farmco;

CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT NOT NULL,
    category_id INT,
    is_featured BOOLEAN DEFAULT 0, -- 0 for not featured, 1 for featured
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL
);

INSERT INTO categories (category_name) VALUES
('Vegetables'),
('Fruits'),
('Dairy'),
('Grains');

INSERT INTO products (product_name, description, price, stock_quantity, category_id, is_featured) VALUES
('Carrots', 'Fresh and crunchy carrots', 1.99, 100, 1, 0),
('Apples', 'Sweet and juicy apples', 2.49, 150, 2, 1),
('Tomatoes', 'Ripe and flavorful tomatoes', 1.79, 120, 1, 0),
('Bananas', 'Yellow and ripe bananas', 1.29, 200, 2, 0),
('Milk', 'Whole milk from local farms', 3.49, 50, 3, 0),
('Cheese', 'Aged cheddar cheese', 5.99, 30, 3, 0),
('Rice', 'Long-grain white rice', 4.25, 80, 4, 0);

INSERT INTO products (product_name, description, price, stock_quantity, category_id, is_featured) VALUES
('Spinach', 'Organic baby spinach leaves', 2.99, 75, 1, 1),
('Oranges', 'Citrusy and refreshing oranges', 3.79, 100, 2, 0),
('Yogurt', 'Greek yogurt with probiotics', 2.99, 40, 3, 1),
('Quinoa', 'Whole grain quinoa', 6.49, 60, 4, 0);

ALTER TABLE products
ADD COLUMN image VARCHAR(255);

