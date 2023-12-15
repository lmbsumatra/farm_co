// App.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
// import { AuthProvider } from './context/Authentication';

import Home from './pages/Home';
import Shop from './pages/Shop';
import Product from './pages/Product';

import AdminLogin from './pages/admin/AdminLogin';
import AdminPanel from './pages/admin/AdminPanel';
import EditProduct from './pages/admin/EditProduct';
import AddProduct from './pages/admin/AddProduct';

import reportWebVitals from './reportWebVitals';

const App = () => (
  <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:product_id" element={<Product />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/admin-panel" element={<AdminPanel />} />
          <Route path="/edit-product/:product_id" element={<EditProduct />} />
          <Route path="/add-product" element={<AddProduct />} />
        </Routes>
      </BrowserRouter>
      </div>
);

export default App;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
