USE farmco;
CREATE TABLE customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    address TEXT,
    username VARCHAR(255) NOT NULL,
    cart_id INT NOT NULL,
    password VARCHAR(255) NOT NULL
);

ALTER TABLE customers
ADD COLUMN username VARCHAR(255) NOT NULL,
ADD COLUMN password VARCHAR(255) NOT NULL;

ALTER TABLE customers ADD COLUMN customer_image VARCHAR(255);

ALTER TABLE customers
ADD COLUMN cart_id INT NOT NULL;

ALTER TABLE customers
DROP COLUMN image;





