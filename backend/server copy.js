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



const stripe = require("stripe")(
  "sk_test_51OYlhUDRMudlBJl3DDuipGz44cu3O1sQFG2CbvNXDshT8FOEmPsHduh1EhNMqTyVGeQSCdfVIprEDVcMnafTe1FP000ROHqvTY"
);

app.use(bodyParser.json());
// STRIPE
app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: req.body.items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: "http://localhost:3000/orders",
      cancel_url: "http://localhost:3000/cancel",
    });

    // Log the created session
    console.log("Checkout Session:", session);

    res.json({ url: session.url});
  } catch (error) {
    // Log the full error for debugging
    console.error("Stripe Error:", error);

    // Respond with an error status and message
    res.status(500).json({ error: "Internal Server Error" });
  }
});