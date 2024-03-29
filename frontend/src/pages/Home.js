import React from "react";
import NavBar from "../components/navbar/NavBar";
import Hero from "../components/hero/Hero";
import SubHero from "../components/hero/SubHero";
import Featured from "../components/featured/Featured";
import About from "../components/about/About";
import Testimonials from "../components/testimonials/Testimonials";
import Footer from "../components/footer/Footer";

import "../components/styles.css";

const Home = () => {
  return (
    <div>
      <NavBar />

      <Hero />
      <SubHero/>
      <section className="body-bg">
        <Featured />
        <About />
        <Testimonials />
      </section>
      <Footer />
      
    </div>
  );
};

export default Home;
