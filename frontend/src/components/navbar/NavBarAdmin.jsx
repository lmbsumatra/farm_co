import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useAdminAuth } from "../../pages/context/useAuth";

import { useNavigate } from "react-router-dom";

const NavBarAdmin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logoutAdmin();
    navigate("/admin-login");
  };

  const auth = useAdminAuth();

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

            <Nav.Link href={auth.admin ? `/admin-panel` : "/log-in"}>
              Orders
            </Nav.Link>

            <Nav.Link href={auth.admin ? `/admin-panel` : "/log-in"}>
              Admin Panel
            </Nav.Link>
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
            {!auth.admin ? (
              <Nav.Link href="/admin-login">Log in Admin</Nav.Link>
            ) : (
              <Nav.Link onClick={handleLogout}>Log out Admin</Nav.Link>
            )}

            {!auth.admin ? (
              <Nav.Link href="/sign-up">Sign up</Nav.Link>
            ) : (
              <p></p>
            )}

          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </section>
  );
};

export default NavBarAdmin;
