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

ALTER TABLE products MODIFY COLUMN stock_quantity DECIMAL(10, 2) unsigned;
ROLLBACK;

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

ALTER TABLE products ADD COLUMN unit_weight VARCHAR(64);

-- Additional INSERT statements for products

INSERT INTO products (product_name, description, price, stock_quantity, category_id, is_featured, image, unit_weight) VALUES
('Broccoli', 'Fresh and nutritious broccoli', 2.79, 80, 1, 0, 'img_12.png', 'per bunch'),
('Grapes', 'Sweet and seedless red grapes', 4.99, 120, 2, 1, 'img_13.png', 'per pound'),
('Butter', 'Creamy and rich unsalted butter', 3.99, 40, 3, 0, 'img_14.png', 'per pound'),
('Oats', 'Steel-cut oats for a healthy breakfast', 3.75, 90, 4, 0, 'img_15.png', 'per pound'),
('Cauliflower', 'White and crisp cauliflower', 2.89, 70, 1, 0, 'img_16.png', 'per head'),
('Pineapple', 'Sweet and tropical pineapple', 3.99, 80, 2, 1, 'img_17.png', 'per piece'),
('Eggs', 'Farm-fresh brown eggs', 2.49, 60, 3, 0, 'img_18.png', 'per dozen'),
('Barley', 'Pearl barley for hearty soups', 5.29, 50, 4, 0, 'img_19.png', 'per pound'),
('Sweet Potatoes', 'Nutrient-rich sweet potatoes', 1.99, 100, 1, 0, 'img_20.png', 'per pound'),
('Blueberries', 'Antioxidant-packed blueberries', 6.99, 60, 2, 1, 'img_21.png', 'per pint'),
('Mozzarella', 'Fresh mozzarella cheese', 4.49, 30, 3, 0, 'img_22.png', 'per pound'),
('Quinoa Flakes', 'Gluten-free quinoa flakes', 7.99, 40, 4, 0, 'img_23.png', 'per pound'),
('Asparagus', 'Tender green asparagus spears', 3.29, 75, 1, 0, 'img_24.png', 'per bunch'),
('Strawberries', 'Juicy and red strawberries', 3.49, 90, 2, 1, 'img_25.png', 'per pound'),
('Sour Cream', 'Creamy sour cream', 2.79, 35, 3, 0, 'img_26.png', 'per container'),
('Buckwheat', 'Whole grain buckwheat', 5.99, 55, 4, 0, 'img_27.png', 'per pound'),

('Cucumber', 'Crisp and refreshing cucumber', 1.49, 120, 1, 0, 'img_28.png', 'per piece'),
('Kiwi', 'Tangy and exotic kiwi fruit', 2.29, 80, 2, 1, 'img_29.png', 'per piece'),
('Cream Cheese', 'Smooth cream cheese spread', 2.99, 40, 3, 0, 'img_30.png', 'per container'),
('Brown Rice', 'Nutty brown rice grains', 4.89, 60, 4, 0, 'img_31.png', 'per pound'),
('Bell Peppers', 'Colorful bell peppers', 1.79, 100, 1, 0, 'img_32.png', 'per pound'),
('Mangoes', 'Juicy and ripe mangoes', 3.69, 70, 2, 1, 'img_33.png', 'per piece'),
('Whipped Cream', 'Light and fluffy whipped cream', 2.49, 30, 3, 0, 'img_34.png', 'per can'),
('Couscous', 'Traditional couscous grains', 3.99, 50, 4, 0, 'img_35.png', 'per pound');
ALTER TABLE order_items
ADD CONSTRAINT fk_order_items_product
FOREIGN KEY (product_id)
REFERENCES products (product_id)
ON DELETE SET NULL;

ALTER TABLE orders
ADD CONSTRAINT fk_orders_customer
FOREIGN KEY (customer_id)
REFERENCES customers (customer_id)
ON DELETE SET NULL;

ALTER TABLE cart_items
ADD CONSTRAINT fk_cart_items_cart
FOREIGN KEY (cart_id)
REFERENCES carts (cart_id)
ON DELETE CASCADE;

ALTER TABLE carts
ADD CONSTRAINT fk_carts_customer
FOREIGN KEY (customer_id)
REFERENCES customers (customer_id)
ON DELETE CASCADE;

ALTER TABLE carts
DROP FOREIGN KEY carts_ibfk_1;
ALTER TABLE carts
ADD CONSTRAINT carts_ibfk_1
FOREIGN KEY (customer_id)
REFERENCES customers (customer_id)
ON DELETE CASCADE;

ALTER TABLE cart_items
DROP FOREIGN KEY cart_items_ibfk_1; -- Drop the existing constraint
ALTER TABLE cart_items
ADD CONSTRAINT cart_items_ibfk_1
FOREIGN KEY (cart_id)
REFERENCES carts (cart_id)
ON DELETE CASCADE;







