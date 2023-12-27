// App.js
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
// import { AuthProvider } from './context/Authentication';
import { createRoot } from 'react-dom/client';

// Public pages
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import NotAvailable from "./pages/FunctionNotAvailable.js";
// Admin pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminPanel from "./pages/admin/AdminPanel";
import AdminPanelOrders from "./pages/admin/AdminPanelOrders.js";
import AdminPanelProducts from "./pages/admin/AdminPanelProducts.js";
import EditProduct from "./pages/admin/EditProduct";
import AddProduct from "./pages/admin/AddProduct";
import AdminOrderSummaryId from "./pages/admin/AdminOrderSummaryId.js";
// Customer pages
import Cart from "./pages/customer/Cart";
import LogIn from "./pages/Log-in";
import SignUp from "./pages/Sign-up";
import Checkout from "./pages/customer/Checkout";
import OrderSummary from "./pages/customer/OrderSummary.js";
import OrderSummaryId from "./pages/customer/OrderSummaryId.js";

import { UserAuthProvider, AdminAuthProvider } from "./pages/context/useAuth";
import RequireUserAuth from "./pages/context/requireUserAuth.js";
import RequireAdminAuth from "./pages/context/requireAdminAuth.js";

const App = () => (
  <div className="App">
    <AdminAuthProvider>
      <UserAuthProvider>
        <BrowserRouter>
          <Routes>
            {/* public route */}
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:product_id" element={<Product />} />
            <Route path="/log-in" element={<LogIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/admin-login" element={<AdminLogin />} />

            {/* private route for admins */}
            <Route
              path="/admin-panel"
              element={
                <RequireAdminAuth>
                  <AdminPanel />
                </RequireAdminAuth>
              }
            />
            <Route
              path="/admin-panel-orders"
              element={
                <RequireAdminAuth>
                  <AdminPanelOrders />
                </RequireAdminAuth>
              }
            />
            <Route
              path="/admin-panel-products"
              element={
                <RequireAdminAuth>
                  <AdminPanelProducts />
                </RequireAdminAuth>
              }
            />
            <Route
              path="/edit-product/:product_id"
              element={
                <RequireAdminAuth>
                  <EditProduct />
                </RequireAdminAuth>
              }
            />
            <Route
              path="/add-product"
              element={
                <RequireAdminAuth>
                  <AddProduct />
                </RequireAdminAuth>
              }
            />
            <Route
              path="/admin-order-summary/:order_id"
              element={
                <RequireAdminAuth>
                  <AdminOrderSummaryId />
                </RequireAdminAuth>
              }
            />

            {/* private route for customers */}
            <Route
              path="/cart/"
              element={
                <RequireUserAuth>
                  <Cart />
                </RequireUserAuth>
              }
            />
            <Route
              path="/checkout/"
              element={
                <RequireUserAuth>
                  <Checkout />
                </RequireUserAuth>
              }
            />
            <Route
              path="/orders"
              element={
                <RequireUserAuth>
                  <OrderSummary />
                </RequireUserAuth>
              }
            />
            <Route
              path="/order-summary/:order_id"
              element={
                <RequireUserAuth>
                  <OrderSummaryId />
                </RequireUserAuth>
              }
            />

            {/* tama na bhie, d q na keriiiiii getgetawwwwwww */}
            <Route
              path="/not-available"
              element={
                  <NotAvailable />
              }
            />
          </Routes>
        </BrowserRouter>
      </UserAuthProvider>
    </AdminAuthProvider>
  </div>
);



const root = createRoot(document.getElementById("root"));

export { App, root };
root.render(<App />);
