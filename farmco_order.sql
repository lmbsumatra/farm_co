CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    total_amount DECIMAL(10, 2),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

ALTER TABLE farmco.orders 
ADD COLUMN status_id INT, 
ADD CONSTRAINT fk_orders_status FOREIGN KEY (status_id) REFERENCES status(status_id);


CREATE TABLE status (
	status_id INT AUTO_INCREMENT PRIMARY KEY,
    status_name VARCHAR(255) NOT NULL
    )

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
