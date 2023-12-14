import React from "react";
import NavBar from "../components/navbar/NavBar";
import Hero from "../components/hero/Hero";
import Featured from "../components/featured/Featured";
import About from "../components/about/About";
import Testimonials from "../components/testimonials/Testimonials";
import Footer from "../components/footer/Footer";

const Home = () => {
  return (
    <div>
      <NavBar />
      <Hero />
      <Featured />
      <About />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;
