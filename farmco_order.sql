CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    customer_id INT,
    grand_total DECIMAL(10, 2),
    status_id INT,
    order_date DATETIME NOT NULL,
    CONSTRAINT fk_orders_status FOREIGN KEY (status_id) REFERENCES status(status_id),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

SELECT * FROM orders;

ALTER TABLE orders MODIFY order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE orders MODIFY grand_total DECIMAL(10, 2);

SET @AUTOCOMMIT = 0;

INSERT INTO orders (customer_id, grand_total, status_id) VALUES (
	1, 100.00, 3
);

ALTER TABLE farmco.orders 
ADD COLUMN status_id INT, 
ADD CONSTRAINT fk_orders_status FOREIGN KEY (status_id) REFERENCES status(status_id);

ALTER TABLE orders DROP COLUMN order_date;
ALTER TABLE orders ADD COLUMN order_date DATETIME;

CREATE TABLE status (
	status_id INT AUTO_INCREMENT PRIMARY KEY,
    status_name VARCHAR(255) NOT NULL
    );

CREATE TABLE order_items (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity DECIMAL(10, 2),
    total DECIMAL(10, 2),
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

ALTER TABLE order_items MODIFY COLUMN quantity DECIMAL(10, 2);

SELECT * FROM farmco.orders;

SELECT * FROM orders_items;

ALTER TABLE farmco.orders ADD orderee_name VARCHAR(255);
ALTER TABLE orders ADD orderee_address TEXT;
ALTER TABLE orders ADD orderee_email VARCHAR(255);
ALTER TABLE orders ADD mode_of_payment INT;

use farmco;
UPDATE orders o
JOIN customers c ON o.customer_id = c.customer_id
SET o.orderee_name = c.customer_name;

UPDATE orders o
JOIN customers c ON o.customer_id = c.customer_id
SET o.orderee_address = c.address;

UPDATE orders o
JOIN customers c ON o.customer_id = c.customer_id
SET o.orderee_email = c.email;

DELETE FROM orders
WHERE customer_id IS NULL
    AND orderee_address IS NULL
    AND orderee_email IS NULL;

DELETE FROM order_items
WHERE order_id IN (
    SELECT order_id
    FROM orders
    WHERE customer_id IS NULL
      AND orderee_address IS NULL
      AND orderee_email IS NULL
);
