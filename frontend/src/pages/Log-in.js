import NavBar from "../components/navbar/NavBar.jsx";
import Footer from "../components/footer/Footer.jsx";
// import LoginBanner from "./components/images/log-in.jpg";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "./context/useAuth.js";

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

  const navigate = useNavigate();

  const [userList, setUserList] = useState([]);
  const auth = useUserAuth();

  // Fetching customers data for comparison
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/customers`);
        setUserList(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, []);

  const [acctDoNotExist, setAcctDoNotExistMsg] = useState("");

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
      for (let i = 0; i < userList.length; i++) {
        const user = userList[i];
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
  }, [email, emailTrigger, userList]);

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
    for (let i = 0; i < userList.length; i++) {
      const user = userList[i];
      if (user.email === email && user.password === password) {
        auth.login(user);
        setAcctDoNotExistMsg("");
        navigate(`/`);
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
      <NavBar />
      <section className="body-bg-img">
        <div className="container my-5">
          <h4 className="text-uppercase section-title">Log in</h4>

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
