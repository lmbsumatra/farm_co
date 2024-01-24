import React, { useState, useEffect } from "react";

import NavBarAdmin from "../../components/navbar/NavBarAdmin";
import Footer from "../../components/footer/Footer";
import "../../components/styles.css";
import userCircle from "../../assets/images/profile/user-circle.svg";
import delivered from "../../assets/images/dashboard/delivery-truck-deliver-svgrepo-com.svg";
import sales from "../../assets/images/dashboard/money-cash-svgrepo-com.svg";
import orders from "../../assets/images/dashboard/shopping-bag-svgrepo-com.svg";

import { Pie, Line } from "react-chartjs-2";
import axios from "axios";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const AdminPanel = () => {
  const [data, setData] = useState([]);
  const [topCustomer, setTopCustomer] = useState([]);
  const [countProduct, setCountProduct] = useState([]);
  const [totalSales, setTotalSales] = useState([]);
  const [totalOrders, setTotalOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [revenueMonthly, setRevenueMonthly] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/top-products");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching customers: ", error);
      }

      try {
        const topCust = await axios.get("http://localhost:5000/top-customer");
        setTopCustomer(topCust.data[0]);
      } catch (error) {
        console.error("Error fetching customers: ", error);
      }

      try {
        const countProduct = await axios.get(
          "http://localhost:5000/count-products"
        );
        setCountProduct(countProduct.data[0]);
      } catch (error) {
        console.error("Error fetching customers: ", error);
      }

      try {
        const sales = await axios.get("http://localhost:5000/sales");
        setTotalSales(sales.data[0]);
      } catch (error) {
        console.error("Error fetching customers: ", error);
      }

      try {
        const newCustomers = await axios.get(
          "http://localhost:5000/new-customers"
        );
        setCustomers(newCustomers.data);
      } catch (error) {
        console.error("Error fetching customers: ", error);
      }

      try {
        const totalOrders = await axios.get(
          "http://localhost:5000/total-orders"
        );
        setTotalOrders(totalOrders.data[0]);
      } catch (error) {
        console.error("Error fetching customers: ", error);
      }

      try {
        const revenue = await axios.get("http://localhost:5000/revenue");
        setRevenueMonthly(revenue.data);
      } catch (error) {
        console.error("Error fetching customers: ", error);
      }
    };

    fetchData();
  }, [topCustomer]);

  const revenueLabels = revenueMonthly.map((data) => data.month);
  const revenueData = revenueMonthly.map((data) => data.monthly_revenue);
  const revenue = {
    labels: revenueLabels,
    datasets: [
      {
        label: "Monthly Sales",
        fill: true,
        lineTension: 0.5,
        backgroundColor: "#FF6384",
        borderColor: "#FF6384",
        borderWidth: 2,
        data: revenueData,
      },
    ],
  };

  const customerImages = customers.map((customer) => customer.customer_image);

  const labels = data.map((data) => data.product_name);
  const values = data.map((data) => data.total_orders);
  const productImages = data.map((data) => data.image);
  const pieChartData = {
    labels: labels, // Replace with your own labels
    datasets: [
      {
        data: values || [0, 0, 0], // Use fetched data or default values
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#ff5956", "#7f52c7"], // Replace with your own colors
      },
    ],
  };

  return (
    <div>
      <NavBarAdmin />
      <section className="body-bg">
        <h4 className="section-title">Admin Panel</h4>
        <div className="container col-10">
          <div className="row mb-3">
            <div className="col-lg-3 col-md-6 col-sm-12">
              {/* Total Products */}
              <div className=" bg-white rounded-2 d-flex justify-content-center align-items-center p-2 mb-2">
                <div className="d-flex" style={{ height: "60px" }}>
                  <img src={delivered} alt="Delivery Truck" />
                  <div className="mx-3">
                    <h4>{countProduct.product_count}</h4>
                    <p className="subtitle">Total Products</p>
                  </div>
                </div>
              </div>

              {/* Total Sales */}
              <div className=" bg-white rounded-2 d-flex justify-content-center align-items-center p-2 mb-2">
                <div className="d-flex" style={{ height: "60px" }}>
                  <img src={sales} alt="Sales Icon" />
                  <div className="mx-3">
                    <h4>{totalSales.sales}</h4>
                    <p className="subtitle">Total Sales</p>
                  </div>
                </div>
              </div>

              {/* Total Orders */}
              <div className=" bg-white rounded-2 d-flex justify-content-center align-items-center p-2 mb-2">
                <div className="d-flex" style={{ height: "60px" }}>
                  <img src={orders} alt="Sales Icon" />
                  <div className="mx-3">
                    <h4>{totalOrders.totalOrders}</h4>
                    <p className="subtitle">Total Orders</p>
                  </div>
                </div>
              </div>

              {/* Our Top Customer */}
              <div className="bg-white rounded-2 justify-content-center align-items-center text-center p-3 mb-2">
                <div className="">
                  <h4>Our Top Customer</h4>
                </div>
                <img
                  className="object-fit-cover rounded-circle bg-gray p-3 m-3"
                  style={{ height: "150px", width: "150px" }}
                  src={`http://localhost:5000/images/customers/${topCustomer.customer_image}`}
                  alt={topCustomer.customer_name}
                />
                <div>
                  <h6>{topCustomer.customer_name}</h6>
                </div>
                <div>
                  <p className="subtitle">New Members</p>
                  <div className="bg-white rounded-2 d-flex flex-wrap justify-content-center">
                    {customerImages.map((image, index) => (
                      <div
                        key={index}
                        className="d-flex justify-content-center align-items-center bg-gray rounded-circle m-1 p-2"
                        style={{ width: "auto" }}
                      >
                        {image ? (
                          <img
                            className="object-fit-cover rounded-circle bg-gray"
                            src={`http://localhost:5000/images/customers/${image}`}
                            alt={`Customer ${index + 1}`}
                            style={{ width: "50px", height: "50px" }}
                          />
                        ) : (
                          <img
                            className="object-fit-cover rounded-circle bg-gray"
                            src={userCircle}
                            alt={`Customer ${index + 1}`}
                            style={{ width: "50px", height: "50px" }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly Revenue */}
            <div
              className="col-lg-6 col-md-6 col-sm-12"
              style={{ height: "auto" }}
            >
              <div className="">
                <div className="bg-white rounded-2 justify-content-center align-items-center p-2 mb-2 text-center">
                  <h4 className="">Monthly Revenue</h4>
                  {values && <Line data={revenue} />}
                </div>
              </div>
            </div>

            {/* Top Products */}
            <div className="col-lg-3 col-md-6 col-sm-12 ">
              <div className="bg-white rounded-2">
                <div className="  justify-content-center align-items-center text-center p-3">
                  <h4 className="">Top Products</h4>
                  {values && <Pie data={pieChartData} />}
                </div>
                <div className="bg-white rounded-2 d-flex flex-wrap justify-content-center">
                  {productImages.map((image, index) => (
                    <div
                      key={index}
                      className="d-flex justify-content-center align-items-center bg-gray rounded-2 m-1 p-3"
                      style={{ width: "auto" }}
                    >
                      <img
                        src={`http://localhost:5000/images/products/${image}`}
                        alt={`Product ${index + 1}`}
                        style={{ height: "30px" }}
                      />
                    </div>
                  ))}
                </div>
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
