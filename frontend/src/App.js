import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { AuthProvider } from './context/Authentication';


import Home from './pages/Home';
import Shop from './pages/Shop';
import Product from './pages/Product';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";

const App = () => {
  const router = createBrowserRouter([
  {
    path:"/",
    element: <Home />
  },
  {
    path:"/shop",
    element: <Shop />
  },
  {
    path:"/product",
    element: <Product />
  },
  {
    path:"/adminLogin",
    element: <AdminLogin/>
  },
  {
    path:"/adminPanel",
    element: <AdminPanel/>
  },
  // {
  //   path:"sign-up",
  //   element: <SignUp />
  // },
  // {
  //   path:"sample-post",
  //   element: <SamplePost />
  // }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

}

export default App