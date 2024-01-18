// Modules
import React, { useState, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useUserAuth } from "../../pages/context/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import userCircle from "../../assets/images/profile/user-circle.svg";
import "../styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useUserAuth();

  const handleLogout = () => {
    auth.logout();
    navigate("/");
  };
  const handleLogin = () => {
    navigate("/log-in");
  };

  const handleSignup = () => {
    auth.logout();
    navigate("/sign-up");
  };

  const [userImage, setUserImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (auth.user && auth.user.customer_id) {
          const response = await axios.get(
            `http://localhost:5000/customers/${auth.user.customer_id}`
          );
          setUserImage(response.data[0].customer_image);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [auth.user, userImage, location]);

  return (
    <section id="Navbar" className="container">
      <div className="row m-1">
        <Navbar expand="lg" style={{ padding: 0 }} className="">
          <Navbar.Brand href="/">
            <h2>FarmCo</h2>
          </Navbar.Brand>

          {/* Search Bar */}
          <div className="col-lg-4 col-md-8 col-sm-7">
            <Nav>
              <form
                className="d-flex mx-auto col-lg-11 col-md-12 col-sm-12"
                role="search"
              >
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
            <Nav className="col-lg-10 mx-auto align-items-center">
              <Nav.Link
                href={"/"}
                className={`me-2 my-3 ${
                  location.pathname === "/" && location.hash === ""
                    ? "active"
                    : ""
                }`}
              >
                Home
              </Nav.Link>

              <Nav.Link
                href={"/#About-us"}
                className={`me-2 my-3 ${
                  location.hash === "#About-us" ? "active" : ""
                }`}
              >
                About us
              </Nav.Link>
              <Nav.Link
                href={"/shop"}
                className={`me-2 my-3 ${
                  location.pathname === "/shop" ? "active" : ""
                }`}
              >
                Shop
              </Nav.Link>
              <Nav.Link
                href={"/cart"}
                className={`me-2 my-3 ${
                  location.pathname === "/cart" ? "active" : ""
                }`}
              >
                Cart
              </Nav.Link>
              <Nav.Link
                href={"/orders"}
                className={`me-2 my-3 ${
                  location.pathname === "/orders" ? "active" : ""
                }`}
              >
                Orders
              </Nav.Link>

              <Nav.Link href={auth.user ? `/edit-profile` : "/log-in"}>
                {auth.user ? (
                  userImage ? (
                    <img
                      src={`http://localhost:5000/images/customers/${userImage}`}
                      className="col-1 object-fit-cover rounded-circle img-profile"
                      alt="Customer profile"
                    />
                  ) : (
                    <img
                      src={userCircle}
                      className="col-1 object-fit-cover rounded-circle img-profile"
                      alt="Customer profile"
                    />
                  )
                ) : (
                  <></>
                )}
              </Nav.Link>
            </Nav>

            <div className="col-lg-4 col-md-12 mx-auto">
              <Nav>
                {!auth.user ? (
                  <button
                    type="button"
                    className="btn btn-success me-2 my-2"
                    onClick={handleLogin}
                  >
                    Log in
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-outline-success me-2 my-2"
                    onClick={handleLogout}
                  >
                    Log out
                  </button>
                )}

                {!auth.user ? (
                  <button
                    type="button"
                    className="btn btn-outline-success me-2 my-2"
                    onClick={handleSignup}
                  >
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

export default NavBar;
