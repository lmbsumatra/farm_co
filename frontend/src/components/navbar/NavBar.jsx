import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("customer_id");

  const [customer_id, setCustomerId] = useState(id);

  const handleLogout = () => {
    setCustomerId(null);
    navigate('/home')
    window.location.reload()
  };

  return (
    <section id="Navbar">
      <Navbar expand="lg">
        <Navbar.Brand href="/">
          <h2>FarmCo</h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link
              href={customer_id ? `/home?customer_id=${customer_id}` : "/home"}
            >
              Home
            </Nav.Link>

            <Nav.Link
              href={
                customer_id
                  ? `/home#About-us?customer_id=${customer_id}`
                  : "/home#About-us"
              }
            >
              About us
            </Nav.Link>

            <Nav.Link
              href={customer_id ? `/shop?customer_id=${customer_id}` : "/shop"}
            >
              Shop
            </Nav.Link>

            <Nav.Link
              href={
                customer_id ? `/cart?customer_id=${customer_id}` : "/log-in"
              }
            >
              Cart
            </Nav.Link>
          </Nav>

          <Nav>
            {!customer_id ? (
              <Nav.Link href="/log-in">Log in</Nav.Link>
            ) : (
              <Nav.Link onClick={handleLogout}>Log out</Nav.Link>
            )}

            <Nav.Link href="/sign-up">Sign up</Nav.Link>
          </Nav>

          <Nav>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </section>
  );
};

export default NavBar;
