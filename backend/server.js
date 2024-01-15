const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const path = require("path");
const multer = require("multer");
const app = express();
const port = 5000;
const fs = require("fs");

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Create a MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "farmco",
});

app.listen(5000, "0.0.0.0", () => {
  console.log("Server is running on port 5000");
});

// For accessing images
app.use("/images", express.static(path.join(__dirname, "images")));

// Image path for upload: for products
const storage1 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/Users/DELL/Documents/GitHub/farm_co/backend/images/products");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Image path for upload: for customers image
const storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/Users/DELL/Documents/GitHub/farm_co/backend/images/customers");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadProductImage = multer({ storage: storage1 });
const uploadCustomerProfile = multer({ storage: storage2 });

// Check connection
db.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

//////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

// ** For adding product, [admin]
app.post("/products", uploadProductImage.single("image"), (req, res) => {
  const query = `
  INSERT INTO products (
    product_name, 
    description, 
    price, 
    stock_quantity, 
    category_id, 
    is_featured, 
    image,
    unit_weight) 
  VALUES(?)`;

  const values = [
    req.body.product_name,
    req.body.product_desc,
    req.body.product_price,
    req.body.product_qty,
    req.body.product_category,
    req.body.product_isfeatured,
    req.file.filename,
    req.body.product_unit,
  ];

  db.query(query, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Successful: Product insertion.");
  });
});

// ** Displaying products, [admin]
app.get("/products", (req, res) => {
  const query = `
    SELECT p.*, c.*
    FROM products p 
    LEFT JOIN categories c ON p.category_id = c.category_id`;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.json(err);
    }

    results.forEach((product) => {
      const imagePath = path.join(__dirname, "images/products", product.image);
      product.image = fs.existsSync(imagePath) ? product.image : null;
    });

    return res.json(results);
  });
});

// ** Displaying product with [product_id], [admin]
app.get("/product/:product_id", (req, res) => {
  const product_id = req.params.product_id;

  const query = `
  SELECT * 
  FROM products 
  WHERE product_id = ?`;

  db.query(query, [product_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    // if (results.length === 0) {
    //   return res.status(404).json({ error: "Product not found" });
    // }

    const product = results[0];
    const imagePath = path.join(__dirname, "images/products", results[0].image);
    product.image = fs.existsSync(imagePath) ? product.image : null;
    return res.json(product);
  });
});

// ** Displaying all categories, [admin: add product, edit product]
app.get("/categories", (req, res) => {
  const query = `
  SELECT * 
  FROM categories`;

  db.query(query, (err, results) => {
    if (err) return res.json(err);
    return res.json(results);
  });
});

// ** Displaying all orders, [admin]
app.get("/orders", (req, res) => {
  const query = `
  SELECT * 
  FROM orders o
  JOIN status s ON o.status_id = s.status_id
  ORDER BY order_date DESC`;

  db.query(query, (err, results) => {
    if (err) return res.json(err);
    return res.json(results);
  });
});

// Displaying order summary, [admin]
app.get("/order-items/:order_id", (req, res) => {
  const orderId = req.params.order_id;

  // Query to get order items
  const query = `
  SELECT
    o.orderee_name,
    o.orderee_address,
    o.orderee_email,
    oi.*,
    p.product_name,
    o.status_id,
    s.status_name,
    o.grand_total,
    o.mode_of_payment,
    p.image,
    p.price

  FROM order_items oi
  JOIN products p ON p.product_id = oi.product_id
  JOIN orders o ON o.order_id = oi.order_id
  JOIN status s ON o.status_id = s.status_id
  WHERE oi.order_id = ?;
`;

  db.query(query, [orderId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }

    // const responseData = {
    //   orderItems: results,
    //   currentStatus: results[0].status_name,
    //   grandTotal: results[0].grand_total,
    //   customerDetails: results[0], // Assuming you want all customer details in the response
    // };
    res.json(results);
  });
});

// ** Displaying all status [admin]
app.get("/status", (req, res) => {
  const query = `
  SELECT * 
  FROM status`;

  db.query(query, (err, results) => {
    if (err) return res.json(err);
    return res.json(results);
  });
});

// ** Displaying all admins, [admin login]
app.get("/admins", (req, res) => {
  const query = `
    SELECT *
    FROM admins`;

  db.query(query, (err, results) => {
    if (err) return res.json(err);
    return res.json(results);
  });
});

// ** Updating order status, [admin: order summary id]
app.put(
  "/order-items/:order_id",
  uploadProductImage.none(),
  async (req, res) => {
    const { status_id } = req.body;
    const { order_id } = req.params;

    const query = `
      UPDATE orders 
      SET status_id = ? 
      WHERE order_id = ?`;

    db.query(query, [status_id, order_id], (err, data) => {
      if (err) return res.json(err);
      return res.json("Successful: Order status update.");
    });
  }
);

// ** Deleting product, [admin]
app.delete("/products/:product_id", (req, res) => {
  const product_id = req.params.product_id;

  const query = `
  DELETE
  FROM products 
  WHERE product_id = ?`;

  db.query(query, [product_id], (err, data) => {
    if (err) return res.json(err);
    return res.json("Successful: Deleted product");
  });
});

// ** Deleting customer, [admin]
app.delete("/customers/:customer_id", (req, res) => {
  const customer_id = req.params.customer_id;

  const deleteCustomer = "DELETE FROM customers WHERE customer_id = ?";

  // Delete from customers table (cascading deletes will handle related records in other tables)
  db.query(deleteCustomer, [customer_id], (err, customerData) => {
    if (err) return res.json(err);
    return res.status(200).json({ message: "Successful: Deleted customer." });
  });
});

//////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

// ** For adding items to cart, [customer: add to cart]
app.post("/cart", uploadProductImage.none(), (req, res) => {
  const query = `
    INSERT INTO cart_items (
      cart_id, 
      product_id, 
      quantity, 
      total
    ) VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      quantity = quantity + VALUES(quantity),
      total = total + VALUES(total)
  `;

  const values = [
    req.body.cart_id,
    req.body.product_id,
    req.body.quantity,
    req.body.total,
  ];

  db.query(query, values, (err, data) => {
    if (err) return res.json(err);
    return res.json("Successful: Inserting item in the cart");
  });
});

// ** For adding customer + cart, [customer]
app.post("/customers", uploadProductImage.none(), (req, res) => {
  const customerQuery =
    "INSERT INTO `customers` (`customer_name`, `email`, `address`, `username`, `password`) VALUES (?, ?, ?, ?, ?)";
  const customerValues = [
    req.body.customer_name,
    req.body.email,
    req.body.address,
    req.body.username,
    req.body.password,
  ];

  db.query(customerQuery, customerValues, (err, customerResult) => {
    if (err) return res.json(err);

    const customerId = customerResult.insertId;

    const cartQuery = "INSERT INTO `carts` (`customer_id`) VALUES (?)";
    const cartValues = [customerId];

    db.query(cartQuery, cartValues, (err, cartResult) => {
      if (err) return res.json(err);

      db.commit((err) => {
        if (err) return res.json(err);
        res.json("Successful: Adding customer and cart");
      });
    });
  });
});

// Create order: transfer cart item to order items, update product stock quantities, delete selected cart items, [customer]
app.post("/checkout", async (req, res) => {
  try {
    const { customer_id, grandTotal, items, buyNow, selectedPaymentMethod } =
      req.body;

    const createOrder = async () => {
      return new Promise((resolve, reject) => {
        const query = `
        INSERT INTO orders (customer_id, grand_total, status_id, order_date, orderee_name, orderee_address, orderee_email, mode_of_payment)
        SELECT
            c.customer_id,
            ? AS grand_total,
            ? AS status_id,
            NOW() AS order_date,
            c.customer_name AS orderee_name,
            c.address AS orderee_address,
            c.email AS orderee_email,
            ? AS mode_of_payment
        FROM customers c
        WHERE c.customer_id = ?`;

        db.query(
          query,
          [grandTotal, 1, selectedPaymentMethod, customer_id],
          (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve(results.insertId);
            }
          }
        );
      });
    };

    const insertOrderItems = async (orderId, item) => {
      db.query(
        "INSERT INTO order_items (order_id, product_id, quantity, total) VALUES (?, ?, ?, ?)",
        [orderId, item.product_id, item.quantity, item.total]
      );
    };

    const updateProductStock = async (item) => {
      db.query(
        "UPDATE products SET stock_quantity = stock_quantity - ? WHERE product_id = ?",
        [item.quantity, item.product_id]
      );
    };

    const transferCartItemsToOrder = async (
      orderId,
      customer_id,
      cartItemIds
    ) => {
      // Generate the placeholders based on the length of cartItemIds
      const placeholders = Array(cartItemIds.length).fill("?").join(", ");

      db.query(
        "INSERT INTO order_items (order_id, product_id, quantity, total) " +
          "SELECT ?, ci.product_id, ci.quantity, ci.total " +
          "FROM carts c " +
          "JOIN cart_items ci ON c.cart_id = ci.cart_id " +
          "WHERE c.customer_id = ? AND ci.cart_item_id IN (" +
          placeholders +
          ")",
        [orderId, customer_id, ...cartItemIds]
      );
    };

    const deleteCartItems = async (customer_id, cartItemIds) => {
      db.query(
        "DELETE FROM cart_items WHERE cart_id IN (SELECT cart_id FROM carts WHERE customer_id = ? AND cart_item_id IN (?))",
        [customer_id, cartItemIds]
      );
    };

    db.beginTransaction();

    try {
      const orderId = await createOrder();

      if (buyNow) {
        for (const item of items) {
          await insertOrderItems(orderId, item);
          await updateProductStock(item);
        }
      } else {
        const cartItemIds = items.map((item) => item.cart_item_id);
        await transferCartItemsToOrder(orderId, customer_id, cartItemIds);

        for (const item of items) {
          await updateProductStock(item);
        }

        await deleteCartItems(customer_id, cartItemIds);
      }

      db.commit();
      res.status(200).send("Checkout successful");
    } catch (error) {
      db.rollback();
      console.error("Error during checkout: ", error);
      res.status(500).send("Internal Server Error");
    }
  } catch (error) {
    console.error("Error parsing request body: ", error);
    res.status(400).send("Bad Request");
  }
});

// ** Displaying cart items, [customer]
app.get("/cart/:customer_id", (req, res) => {
  const customerId = req.params.customer_id;

  const query = `
    SELECT
      c.cart_item_id,
      p.image,
      p.product_name,
      c.quantity,
      p.price,
      c.total,
      cu.customer_name,
      cu.address,
      cu.email,
      p.unit_weight
    FROM cart_items c
      JOIN products p ON c.product_id = p.product_id
      JOIN carts ca ON c.cart_id = ca.cart_id
      JOIN customers cu ON ca.customer_id = cu.customer_id
    WHERE cu.customer_id = ?`;

  db.query(query, [customerId], (err, results) => {
    if (err) return res.json(err);
    return res.json(results);
  });
});

// ** Displaying all orders, [customer]
app.get("/orders/:customer_id", (req, res) => {
  const customerId = req.params.customer_id;

  const query = `
  SELECT
    o.order_id,
    o.grand_total,
    s.status_name,
    o.order_date
  FROM orders o
  JOIN customers cu ON cu.customer_id = o.customer_id
  JOIN status s ON o.status_id = s.status_id
  WHERE cu.customer_id = ?
  ORDER BY o.order_date DESC`;

  db.query(query, [customerId], (err, results) => {
    if (err) return res.json(err);
    return res.json(results);
  });
});

// ** Displaying customer , [customer]
app.get("/customers/:customer_id", (req, res) => {
  const customer_id = req.params.customer_id;
  const query = `
    SELECT *
    FROM customers
    WHERE customer_id = ?`;

  db.query(query, [customer_id], (err, results) => {
    if (err) return res.json(err);
    return res.json(results);
  });
});

// ** Displaying all customers, [customer login]
app.get("/customers", (req, res) => {
  const query = `
    SELECT *
    FROM customers
    LEFT JOIN carts ON customers.customer_id = carts.customer_id`;

  db.query(query, (err, results) => {
    if (err) return res.json(err);
    return res.json(results);
  });
});

// ** Updating product, [admin]
app.put(
  "/products/:product_id",
  uploadProductImage.single("image"),
  (req, res) => {
    const product_id = req.params.product_id;
    const query = `
    UPDATE products 
    SET 
      product_name = ?, 
      description = ?,
      price = ?,
      stock_quantity = ?,
      category_id = ?,
      is_featured = ?,
      image = ?,
      unit_weight = ? 
    WHERE product_id = ?`;

    const values = [
      req.body.product_name,
      req.body.product_desc,
      req.body.product_price,
      req.body.product_qty,
      req.body.product_category,
      req.body.product_isfeatured,
      req.file ? req.file.filename : req.body.product_img,
      req.body.product_unit,
      product_id,
    ];

    db.query(query, values, (err, results) => {
      if (err) return res.json(err);
      return res.json(results);
    });
  }
);

// ** Updating customer, [customer]
app.put(
  "/customer/:customer_id",
  uploadCustomerProfile.single("image"),
  (req, res) => {
    // Handle product update logic
    const query = `
    UPDATE customers 
    SET 
      customer_name = ?, 
      email = ?, 
      address = ?, 
      username = ?, 
      password = ?, 
      customer_image = ? 
    WHERE customer_id = ?`;

    // Using req.body for text formats; Using req.file for file formats
    const values = [
      req.body.customer_name,
      req.body.email,
      req.body.address,
      req.body.username,
      req.body.password,
      req.file ? req.file.filename : req.body.customer_image,
      req.body.customer_id,
    ];

    // SQL query execution
    db.query(query, values, (err, data) => {
      if (err) return res.json(err);
      return res.json("Successful: Updated customer");
    });
  }
);

// ** Deleting cart item, [customer]
app.delete("/cart/:cart_item_id", (req, res) => {
  const cart_item_id = req.params.cart_item_id;

  const query = "DELETE FROM cart_items WHERE cart_item_id = ?";
  db.query(query, [cart_item_id], (err, data) => {
    if (err) return res.json(err);
    return res.json("Successful: Deleted cart item");
  });
});

// ////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
app.get("/top-products", (req, res) => {
  const query = `
  SELECT p.product_id, p.product_name, p.image, COUNT(o.order_id) as total_orders
  FROM products p
  JOIN order_items o ON p.product_id = o.product_id
  GROUP BY p.product_id, p.product_name
  ORDER BY total_orders DESC
  LIMIT 4`;

  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
