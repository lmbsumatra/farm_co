// App.js
import React from "react";
import ReactDOM from "react-dom";
import { Router, Routes, Route, BrowserRouter } from "react-router-dom";
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
import { AuthProvider } from "./pages/context/useAuth";
import RequireAuth from "./pages/context/requireAuth.js";

const App = () => (
  <div className="App">
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* public route */}
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:product_id" element={<Product />} />
          <Route path="/log-in" element={<LogIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/adminLogin" element={<AdminLogin />} />

          {/* private route for admins */}
          <Route path="/admin-panel" element={<AdminPanel />} />
          <Route path="/edit-product/:product_id" element={<EditProduct />} />
          <Route path="/add-product" element={<AddProduct />} />

          {/* private route for customers */}
          <Route
            path="/cart/"
            element={
              <RequireAuth>
                <Cart />
              </RequireAuth>
            }
          />
          <Route
            path="/checkout/"
            element={
              <RequireAuth>
                <Checkout />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </div>
);

export default App;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
