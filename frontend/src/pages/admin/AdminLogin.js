// Modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/useAuth.js";

// Components
import NavBarAdmin from "../../components/navbar/NavBarAdmin.jsx";
import Footer from "../../components/footer/Footer.jsx";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [emailNotValid, setEmailNotValidMsg] = useState("");
  const [emailNotExist, setEmailNotExistMsg] = useState("");
  const [emailIsRequired, setEmailIsRequiredMsg] = useState("");
  const [emailTrigger, setEmailTrigger] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordIsRequired, setPasswordIsRequiredMsg] = useState("");
  const [passwordNotValid, setPasswordNotValidMsg] = useState("");
  const [passwordTrigger, setPasswordTrigger] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [passwordBtn, setPasswordBtn] = useState("Show");

  const [acctDoNotExist, setAcctDoNotExistMsg] = useState("");

  const navigate = useNavigate();

  const [adminList, setAdminList] = useState([]);
  const auth = useAdminAuth();

  // Fetching data data for comparison
  useEffect(() => {
    // Check if admin has logged in, if so, redirect to admin panel
    if (auth.admin) {
      navigate("/admin-panel");
    }

    const fetchAdmins = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/admins`);
        setAdminList(response.data);
      } catch (error) {
        console.error("Error fetching admin:", error);
      }
    };

    fetchAdmins();
  }, [auth.admin, navigate]);

  // Log in email validation
  useEffect(() => {
    const validateLogEmail = () => {
      // Should be filled out
      if (email === "") {
        setEmailIsRequiredMsg("Email is required.");
      } else {
        setEmailIsRequiredMsg("");
      }

      // Should have email formatting
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setEmailNotValidMsg("");
      } else {
        setEmailNotValidMsg("Email should be valid");
      }

      // Check email existance
      for (let i = 0; i < adminList.length; i++) {
        const user = adminList[i];
        if (user.email === email) {
          setEmailNotExistMsg("");
          break;
        } else {
          setEmailNotExistMsg("Email is not registered");
        }
      }
    };

    if (emailTrigger) {
      validateLogEmail();
    }
  }, [email, emailTrigger, adminList]);

  // Log in password validation
  useEffect(() => {
    const validateLogPassword = () => {
      // Should be filled out
      if (password === "") {
        setPasswordIsRequiredMsg("Password is required.");
      } else {
        setPasswordIsRequiredMsg("");
      }

      // Should count between 8 and 20
      if (password.length < 8 || password.length > 20) {
        setPasswordNotValidMsg(
          "Password characters should only count between 8 and 20."
        );
      } else {
        setPasswordNotValidMsg("");
      }
    };
    if (passwordTrigger) {
      validateLogPassword();
    }
  }, [password, passwordTrigger]);

  // Log in, email to user's password validation
  const Login = () => {
    for (let i = 0; i < adminList.length; i++) {
      const user = adminList[i];
      if (user.email === email && user.password === password) {
        console.log(user);
        auth.loginAdmin(user);
        setAcctDoNotExistMsg("");
        navigate(`/admin-panel`);
      } else if (password === "" && email === "") {
        setEmailIsRequiredMsg("Email is required.");
        setPasswordIsRequiredMsg("Password is required.");
      } else {
        setAcctDoNotExistMsg("Your email or password is incorrect. Try again.");
      }
    }
  };

  // Handles show and hide password
  const handleShowPassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      setPasswordBtn("Hide");
    } else if (passwordType === "text") {
      setPasswordType("password");
      setPasswordBtn("Show");
    }
  };

  return (
    <>
      <NavBarAdmin />
      <section className="body-bg-img">
        <div className="container my-5">
          <h4 className="text-uppercase section-title">Admin Log in</h4>

          <div className="container col-lg-6">
            <div
              className="rounded row"
              style={{ backgroundColor: "rgb(255, 255, 255)" }}
            >
              <div className="mx-auto my-5 px-5">
                <p>
                  Welcome back to Farmco! We're thrilled to have you here again.
                </p>
                <div className="mb-3">
                  <p style={{ color: "red" }}>{acctDoNotExist}</p>

                  <label htmlFor="inputLogEmail" className="form-label">
                    Email address
                  </label>
                  <input
                    className="form-control"
                    type="email"
                    id="inputLogEmail"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailTrigger(true);
                    }}
                  />

                  <p style={{ color: "red" }}>{emailIsRequired}</p>
                  <p style={{ color: "red" }}>{emailNotExist}</p>
                  <p style={{ color: "red" }}>{emailNotValid}</p>
                </div>

                <div className="mb-3">
                  <label htmlFor="inputLogPassword" className="form-label">
                    Password
                  </label>
                  <div className="d-flex mx-auto align-items-center">
                    <input
                      className="form-control me-2"
                      type={passwordType}
                      id="inputLogPassword"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordTrigger(true);
                      }}
                    />

                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleShowPassword}
                    >
                      {passwordBtn}
                    </button>
                  </div>
                  <p style={{ color: "red" }}>{passwordIsRequired}</p>
                  <p style={{ color: "red" }}>{passwordNotValid}</p>
                </div>

                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="checkBox"
                    required
                  />
                  <label className="form-check-label" htmlFor="checkBox">
                    Remember
                  </label>
                  <div className="form-text">
                    Save information to automatically log in.
                  </div>
                </div>

                <br />

                <button className="btn btn-primary" onClick={Login}>
                  Log in
                </button>

                <div className="my-3">
                  <a href="/">Forgot your password?</a>
                  <br />
                  <a href="/sign-up">Doesn't have an account?</a>
                </div>

                <div className="text-center">
                  <br />
                  <p>or</p>
                  <a href="/">
                    <i className="fa-brands fa-google fs-1 p-3"></i>
                  </a>
                  <a href="/">
                    <i className="fa-brands fa-yahoo fs-1 p-3"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default LogIn;
