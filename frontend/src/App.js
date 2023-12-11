import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Home from './pages/Home';
import Shop from './pages/Shop';
import Product from './pages/Product';
import Login from './pages/Login';
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
    path:"/login",
    element: <Login />
  }
  // {
  //   path:"log-in",
  //   element: <LogIn />
  // },
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
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

}

export default App