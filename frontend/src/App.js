// App.js
import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
// import { AuthProvider } from './context/Authentication';

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Product from "./pages/Product";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminPanel from "./pages/admin/AdminPanel";
import EditProduct from "./pages/admin/EditProduct";
import AddProduct from "./pages/admin/AddProduct";
import Cart from "./pages/customer/Cart";
import LogIn from "./pages/Log-in";
import SignUp from "./pages/Sign-up";
import Checkout from "./pages/customer/Checkout";

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Routes>
          {/* public route */}
          <Route path="/home/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:product_id" element={<Product />} />
          <Route path="/log-in" element={<LogIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/adminLogin" element={<AdminLogin />} />

          {/* private route for admins */}
          <Route path="/admin-panel" element={<AdminPanel />} />
          <Route path="/edit-product/:product_id" element={<EditProduct />} />
          <Route path="/add-product" element={<AddProduct />} />

          {/* public route for customers */}
          <Route path="/cart/" element={<Cart />} />
          <Route path="/checkout/" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
