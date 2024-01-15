import React, { useState, useEffect } from "react";

import NavBarAdmin from "../../components/navbar/NavBarAdmin";
import Footer from "../../components/footer/Footer";
import "../../components/styles.css";

import delivered from "../../assets/images/dashboard/delivery-truck-deliver-svgrepo-com.svg";
import sales from "../../assets/images/dashboard/money-cash-svgrepo-com.svg";
import orders from "../../assets/images/dashboard/shopping-bag-svgrepo-com.svg";

import { Pie } from "react-chartjs-2";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const AdminPanel = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/top-products");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching customers: ", error);
      }
    };

    fetchData();
  }, []);

  const labels = data.map((data) => data.product_name);
  const values = data.map((data) => data.total_orders);
  const images = data.map((data) => data.image);
  const pieChartData = {
    labels: labels, // Replace with your own labels
    datasets: [
      {
        data: values || [0, 0, 0], // Use fetched data or default values
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"], // Replace with your own colors
      },
    ],
  };
  console.log(images);
  return (
    <div>
      <NavBarAdmin />
      <section className="body-bg">
        <h4 className="section-title">Admin Panel</h4>
        <div className="container p-0 m-0 mx-auto">
          <div className="row d-flex justify-content-between">
          <div className="col-lg-3 col-md-6 col-sm-10 bg-white rounded-2 d-flex justify-content-center align-items-center">
              <div className="d-flex">
                <div className="">
                  <img
                    src={sales}
                    alt="Delivery Truck"
                    style={{ height: "60px" }}
                  />
                </div>
                <div>
                  <h4>100</h4>
                  <p className="subtitle">Total Products</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-10 bg-white rounded-2 d-flex justify-content-center align-items-center">
              <div className="d-flex">
                <div className="">
                  <img
                    src={sales}
                    alt="Delivery Truck"
                    style={{ height: "60px" }}
                  />
                </div>
                <div>
                  <h4>100</h4>
                  <p className="subtitle">Total Products</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-10 bg-white rounded-2 d-flex justify-content-center align-items-center">
              <div className="d-flex">
                <div className="">
                  <img
                    src={sales}
                    alt="Delivery Truck"
                    style={{ height: "60px" }}
                  />
                </div>
                <div>
                  <h4>100</h4>
                  <p className="subtitle">Total Products</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div
              className=" bg-white"
              style={{ height: "auto", width: "auto" }}
            >
              {images.map((image) => (
                <div
                  key={data.product_id}
                  className="d-flex justify-content-center align-items-center bg-gray rounded-2  m-2 p-3"
                  style={{ width: "auto" }}
                >
                  <img
                    src={`http://localhost:5000/images/products/${image}`}
                    alt={data.product_name}
                    style={{ height: "50px" }}
                  />
                </div>
              ))}
            </div>
            <div className="col-lg-4 col-md-6 col-sm-10 bg-white rounded-2 d-flex justify-content-center align-items-center text-center">
              <div>
                <h4>Top Products</h4>
                {values && <Pie data={pieChartData} />}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AdminPanel;
