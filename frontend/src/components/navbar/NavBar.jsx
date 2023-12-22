import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useUserAuth } from "../../pages/context/useAuth";
import { useAdminAuth } from "../../pages/context/useAuth";

import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logout();
    admin.logoutAdmin();
    navigate("/");
  };

  const auth = useUserAuth();
  const admin = useAdminAuth();

  return (
    <section id="Navbar">
      <Navbar expand="lg">
        <Navbar.Brand href="/">
          <h2>FarmCo</h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href={"/"}>Home</Nav.Link>

            <Nav.Link href={"#About-us"}>About us</Nav.Link>

            <Nav.Link href={"/shop"}>Shop</Nav.Link>

            <Nav.Link href={auth.user ? `/cart` : "/log-in"}>Cart</Nav.Link>

            <Nav.Link href={auth.user ? `/orders` : "/log-in"}>Orders</Nav.Link>
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
          <Nav>
            {(!auth.user && !admin.admin)? (
              <Nav.Link href="/log-in">Log in</Nav.Link>
            ) : (
              <Nav.Link onClick={handleLogout}>Log out</Nav.Link>
            )}

            <Nav.Link href="/sign-up">Sign up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </section>
  );
};

export default NavBar;
