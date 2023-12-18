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
  const q =
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
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    // Return a response with the filename of the uploaded image
    res.json({ filename: req.file.filename, message: "Successful insertion." });
  });
});

app.get("/products", (req, res) => {
  const sql =
    "SELECT p.*, c.category_name FROM products p LEFT JOIN categories c ON p.category_id = c.category_id";
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }
    res.json(results);
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

app.put("/products/:product_id", upload.single("image"), (req, res) => {
  const product_id = req.params.product_id;
  // Handle product update logic
  const q =
    "UPDATE products SET `product_name`=?, `description`=?, `price`=?, `stock_quantity`=?, `category_id`=?, `is_featured`=?, `image`=? WHERE `product_id`=?";
  const values = [
    req.body.product_name,
    req.body.product_desc,
    req.body.product_price,
    req.body.product_qty,
    req.body.product_category,
    req.body.product_isfeatured,
    req.file ? req.file.filename : req.body.product_img,
    product_id, // Add the product_id at the end
  ];

  db.query(q, values, (err, data) => {
    if (err) {
      console.error("Error updating item:", err);
      return res.json(err);
    }
    return res.json("Item updated");
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
