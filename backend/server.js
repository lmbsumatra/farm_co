const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const path = require("path");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

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

app.use("/images", express.static(path.join(__dirname, "images")));

// API endpoint for user login
app.post("/adminLogin", (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM `admin` WHERE `admin_un` = ? AND `admin_pw` = ?";

  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    if (results.length > 0) {
      res.json({ success: true, message: "Login successful" });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  });
});

app.listen(5000, "0.0.0.0", () => {
  console.log("Server is running on port 5000");
});

app.get("/products", (req, res) => {
  const sql = "SELECT * FROM products";
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }
    res.json(results);
  });
});

app.put("/products/:product_id", (req, res) => {
  const product_id = req.params.product_id;
  const q =
    "UPDATE products SET `product_name` =?, `description`=?, `image`=?, `price`=? WHERE product_id=?";
    const values = [
      req.body.product_name,
      req.body.product_desc, // Assuming this is the correct field for description
      req.body.product_img, // Assuming this is the correct field for image
      req.body.product_price,
      product_id
    ];
  db.query(q, [...values, product_id], (err, data) => {
    if (err) return res.json(err);
    return res.json("Item updated");
  });
});
