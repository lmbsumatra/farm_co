CREATE TABLE cart (
    add_to_cart_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
	total INT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

ALTER TABLE cart MODIFY COLUMN quantity DECIMAL(10, 2);

ALTER TABLE cart MODIFY COLUMN total DECIMAL(10, 2);

ALTER TABLE cart CHANGE COLUMN add_to_cart_id cart_item_id INT;

