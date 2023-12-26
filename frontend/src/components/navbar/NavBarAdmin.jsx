import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useAdminAuth } from "../../pages/context/useAuth";

import { useNavigate } from "react-router-dom";

const NavBarAdmin = () => {
  const navigate = useNavigate();
  const auth = useAdminAuth;
  
  const handleLogout = () => {
    auth.logoutAdmin();
    navigate("/");
  };
  const handleLogin = () => {
    navigate("/admin-login");
  };

  const handleSignup = () => {
    auth.logout();
    navigate("/sign-up");
  };

  return (
    <section id="Navbar" className="container ">
      <div className="row">
        <Navbar expand="lg">
          <Navbar.Brand href="/">
            <h2>FarmCo</h2>
          </Navbar.Brand>
          
          {/* Search Bar */}
          <div className="col-lg-4 col-md-8">
            <Nav>
              <form className="d-flex mx-auto col-lg-11  col-md-10" role="search">
                <input
                  className="form-control me-2 d-flex"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-secondary" type="submit">
                  Search
                </button>
              </form>
            </Nav>
          </div>

          <Navbar.Toggle aria-controls="navbar-nav" />

          {/* Menu Bar */}
          <Navbar.Collapse id="navbar-nav">
            <Nav className=" mx-auto">
              <Nav.Link href={"/"} className="me-2">
                Home
              </Nav.Link>

              <Nav.Link href={"/#About-us"} className="me-2">
                About us
              </Nav.Link>

              <Nav.Link href={"/shop"} className="me-2">
                Shop
              </Nav.Link>

              <Nav.Link href={auth.admin ? `/cart` : "/log-in"} className="me-2">
                Cart
              </Nav.Link>

              <Nav.Link
                href={auth.admin ? `/orders` : "/log-in"}
                className="me-2"
              >
                Orders
              </Nav.Link>
            </Nav>

            <div className="col-lg-4 col-md-12 mx-auto">
              <Nav>
                {!auth.admin ? (
                  <button type="button" class="btn btn-success me-2" onClick={handleLogin}>
                    Log in Admin
                  </button>
                ) : (
                  <Nav.Link onClick={handleLogout}>Log out Admin</Nav.Link>
                )}

                {!auth.admin ? (
                  <button type="button" class="btn btn-outline-success me-2" onClick={handleSignup}>
                    Sign up
                  </button>
                ) : (
                  <p></p>
                )}
              </Nav>
            </div>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </section>
  );
};

export default NavBarAdmin;
