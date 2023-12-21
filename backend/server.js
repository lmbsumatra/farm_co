const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const path = require("path");
const multer = require("multer");
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// For accessing images
app.use("/images", express.static(path.join(__dirname, "images")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/Users/DELL/farm_co/backend/images/products");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// Create a MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "farmco",
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

// app.post("/adminLogin", (req, res) => {
//   const { username, password } = req.body;

//   const query = "SELECT * FROM `admin` WHERE `admin_un` = ? AND `admin_pw` = ?";

//   db.query(query, [username, password], (err, results) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send("Internal Server Error");
//       return;
//     }

//     if (results.length > 0) {
//       res.json({ success: true, message: "Login successful" });
//     } else {
//       res.json({ success: false, message: "Invalid credentials" });
//     }
//   });
// });

app.listen(5000, "0.0.0.0", () => {
  console.log("Server is running on port 5000");
});

app.post("/products", upload.single("image"), (req, res) => {
  const query =
    "INSERT INTO `products` (`product_name`, `description`, `price`, `stock_quantity`, `category_id`, `is_featured`, `image`) VALUES(?)";

  const values = [
    req.body.product_name,
    req.body.product_desc,
    req.body.product_price,
    req.body.product_qty,
    req.body.product_category,
    req.body.product_isfeatured,
    req.file.filename,
  ];

  // Execute the SQL query
  db.query(query, [values], (err, data) => {
    if (err) return res.json(err);
    // Return a response with the filename of the uploaded image
    res.json({ filename: req.file.filename, message: "Successful insertion." });
  });
});

app.post("/cart", upload.none(), (req, res) => {
  console.log(req.body);
  const query =
  "INSERT INTO `cart_items` (`cart_id`, `product_id`, `quantity`, `total`) VALUES (?, ?, ?, ?)";

  const values = [
    req.body.cart_id,
    req.body.product_id,
    req.body.quantity,
    req.body.total,
  ];
  console.log("Values:", values);

  // Execute the SQL query
  db.query(query, values, (err, data) => {
    if (err) {
      console.error("MySQL Error:", err.sqlMessage);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json("Successful insertion.");
  });
});

app.post("/customers", upload.none(), (req, res) => {
  console.log(req.body);

  // Start a transaction
  db.beginTransaction((err) => {
    if (err) {
      console.error("MySQL Transaction Begin Error:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    // Insert customer data
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
      if (err) {
        // Rollback the transaction if an error occurs
        return db.rollback(() => {
          console.error("MySQL Customer Insertion Error:", err.sqlMessage);
          res.status(500).json({ error: "Internal Server Error" });
        });
      }

      // Get the auto-generated customer_id
      const customerId = customerResult.insertId;

      // Insert a corresponding cart for the customer
      const cartQuery = "INSERT INTO `carts` (`customer_id`) VALUES (?)";
      const cartValues = [customerId];

      db.query(cartQuery, cartValues, (err, cartResult) => {
        if (err) {
          // Rollback the transaction if an error occurs
          return db.rollback(() => {
            console.error("MySQL Cart Insertion Error:", err.sqlMessage);
            res.status(500).json({ error: "Internal Server Error" });
          });
        }

        // Commit the transaction if both customer and cart insertions are successful
        db.commit((err) => {
          if (err) {
            console.error("MySQL Transaction Commit Error:", err);
            return res.status(500).json({ error: "Internal Server Error" });
          }

          res.json("Successful insertion.");
        });
      });
    });
  });
});

app.get("/products", (req, res) => {
  const sql =
    `SELECT * 
    FROM products p 
      LEFT JOIN categories c ON p.category_id = c.category_id`;
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }
    res.json(results);
  });
});

app.get("/product/:product_id", (req, res) => {
  const product_id = req.params.product_id;
  const q = "SELECT * FROM products WHERE product_id = ?";
  db.query(q, [product_id], (err, data) => {
    if (err) return res.status(500).json({ error: err.message });

    if (data.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    const product = data[0];
    return res.json(product);
  });
});

app.get("/categories", (req, res) => {
  const query = "SELECT * FROM `categories`";
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }
    res.json(results);
  });
});
app.get("/cart/:customer_id", (req, res) => {
  const customerId = req.params.customer_id;

  const query = `
    SELECT
      *
    FROM cart_items c
      JOIN products p ON c.product_id = p.product_id
      JOIN carts ca ON c.cart_id = ca.cart_id
      JOIN customers cu ON ca.customer_id = cu.customer_id
    WHERE cu.customer_id = ?`;

  db.query(query, [customerId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }
    res.json(results);
  });
});


app.get("/customers", (req, res) => {
  const query = `
  SELECT * FROM customers`;
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }
    res.json(results);
  });
});


app.put("/products/:product_id", upload.single("image"), (req, res) => {
  const product_id = req.params.product_id;
  // Handle product update logic
  const query =
    "UPDATE products SET `product_name`=?, `description`=?, `price`=?, `stock_quantity`=?, `category_id`=?, `is_featured`=?, `image`=? WHERE `product_id`=?";

  // Using req.body for text formats; Using req.file for file formats
  const values = [
    req.body.product_name,
    req.body.product_desc,
    req.body.product_price,
    req.body.product_qty,
    req.body.product_category,
    req.body.product_isfeatured,
    req.file ? req.file.filename : req.body.product_img,
    product_id,
  ];

  // SQL query execution
  db.query(query, values, (err, data) => {
    if (err) {
      console.error("Error updating item:", err);
      return res.json(err);
    }
    return res.json("Successfully updated");
  });
});

app.delete("/products/:product_id", (req, res) => {
  const product_id = req.params.product_id;
  const q = "DELETE FROM products WHERE product_id = ?";

  db.query(q, [product_id], (err, data) => {
    if (err) return res.json(err);
    return res.json("Successfully deleted");
  });
});

app.delete("/cart/:cart_item_id", (req, res) => {
  const cart_item_id = req.params.cart_item_id;
  
  const q = "DELETE FROM cart_items WHERE cart_item_id = ?";
  db.query(q, [cart_item_id], (err, data) => {
    if (err) {
      console.error('Error deleting cart item:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    console.log('Deleted successfully');
    return res.json("Successfully deleted");
  });
});

// API endpoint to handle checkout and move items from cart to order_items
app.post('/checkout', (req, res) => {
  const { customer_id } = req.body;

  // Create a new order
  db.query('INSERT INTO orders (customer_id, total_amount) VALUES (?, 0)', [customer_id], (err, results) => {
    if (err) {
      console.error('Error creating order: ', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    const orderId = results.insertId;

    // Transfer cart items to order items
    db.query(
      'INSERT INTO order_items (order_id, product_id, quantity, total) ' +
        'SELECT ?, ci.product_id, ci.quantity, ci.total ' +
        'FROM carts c ' +
        'JOIN cart_items ci ON c.cart_id = ci.cart_id ' +
        'WHERE c.customer_id = ?',
      [orderId, customer_id],
      (err) => {
        if (err) {
          console.error('Error transferring cart items: ', err);
          res.status(500).send('Internal Server Error');
          return;
        }

        // Optionally, delete cart items after moving them to order items
        db.query('DELETE FROM cart_items WHERE cart_id IN (SELECT cart_id FROM carts WHERE customer_id = ?)', [customer_id], (err) => {
          if (err) {
            console.error('Error deleting cart items: ', err);
            res.status(500).send('Internal Server Error');
            return;
          }

          res.status(200).send('Checkout successful');
        });
      }
    );
  });
});