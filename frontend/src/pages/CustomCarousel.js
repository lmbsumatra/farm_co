import React, { useState } from "react";
import { Carousel, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CustomCarousel = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  
    // Check if 'e' is defined and has 'direction' property
    if (e && e.direction) {
      // Navigate to the next item when the next item becomes active
      if (selectedIndex < e.direction && products[selectedIndex + 1]) {
        navigate(`/product/${products[selectedIndex + 1].id}`);
      }
    }
  };
  

  // Dummy product data
  const products = [
    { id: 1, name: "Product 1", image: "image1.jpg" },
    { id: 2, name: "Product 2", image: "image2.jpg" },
    { id: 3, name: "Product 3", image: "image3.jpg" },
  ];

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {products.map((product) => (
        <Carousel.Item key={product.id}>
          <img
            className="d-block w-100"
            src={`path/to/your/images/${product.image}`}
            alt={product.name}
          />
          <Carousel.Caption>
            <h3>{product.name}</h3>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CustomCarousel;
