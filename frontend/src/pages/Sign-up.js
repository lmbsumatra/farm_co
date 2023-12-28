import React, { useState, useEffect } from "react";
import NavBar from "../components/navbar/NavBar";
import Footer from "../components/footer/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);

  const [fullName, setFullName] = useState("");
  const [fullNameIsRequired, setfullNameIsRequiredMsg] = useState("");
  const [fullNameTrigger, setFullNameTrigger] = useState(false);
  const [fnValid, setFnValid] = useState(false);

  const [address, setAddress] = useState("");
  const [addressIsRequired, setAddressIsRequiredMsg] = useState("");
  const [addressTrigger, setAddressTrigger] = useState(false);
  const [addressValid, setAddressValid] = useState(false);

  const [email, setEmail] = useState("");
  const [emailIsRequired, setEmailIsRequiredMsg] = useState("");
  const [emailIsNotValid, setEmailIsNotValidMsg] = useState("");
  const [emailWhiteSpace, setEmailWhiteSpaceMsg] = useState("");
  const [emailExist, setEmailExistMsg] = useState("");
  const [emailTrigger, setEmailTrigger] = useState(false);
  const [emailValid, setEmailValid] = useState(false);

  const [username, setUsername] = useState("");
  const [usernameIsRequired, setUserNameIsRequiredMsg] = useState("");
  const [userNameNotValid, setUserNameNotValidMsg] = useState("");
  const [userNameAlreadyExist, setUserNameAlreadyExistMsg] = useState("");
  const [userNameWhiteSpace, setUserNameWhiteSpaceMsg] = useState("");
  const [userNameTrigger, setUserNameTrigger] = useState(false);
  const [unValid, setUnValid] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordIsRequired, setPasswordIsRequiredMsg] = useState("");
  const [passwordNotValid, setPasswordNotValidMsg] = useState("");
  const [passwordTrigger, setPasswordTrigger] = useState(false);
  const [pwValid, setPwValid] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordIncorrect, setConfirmPasswordIncorrect] = useState("");
  const [confirmPasswordTrigger, setConfirmPasswordTrigger] = useState(false);
  const [cpwValid, setCpwValid] = useState(false);

  const [validNotMsg, setValidNotMsg] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
  };

  // fetching data for comparison
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

  // validation for fullname
  useEffect(() => {
    const validateFullName = () => {
      // should be filled out
      if (fullName === "") {
        setfullNameIsRequiredMsg("Fullname is required.");
        setFnValid(false);
      } else {
        setfullNameIsRequiredMsg("");
        setFnValid(true);
      }
    };
    if (fullNameTrigger) {
      validateFullName();
    }
  }, [fullName, fullNameTrigger]);

  // validation for address
  useEffect(() => {
    const validateAddress = () => {
      // should be filled out
      if (address === "") {
        setAddressIsRequiredMsg("Address is required.");
        setAddressValid(false);
      } else {
        setAddressIsRequiredMsg("");
        setAddressValid(true);
      }
    };
    if (addressTrigger) {
      validateAddress();
    }
  }, [address, addressTrigger]);

  // validation for email
  useEffect(() => {
    const validateEmail = () => {
      // should be filled out
      if (email === "") {
        setEmailIsRequiredMsg("Email is required.");
        setEmailValid(false);
      } else {
        setEmailIsRequiredMsg("");
        setEmailValid(true);
      }

      //s should not contain white space
      if (/\s/.test(email)) {
        setEmailWhiteSpaceMsg("Email cannot contain whitespace.");
        setEmailValid(false);
      } else {
        setEmailWhiteSpaceMsg("");
        setEmailValid(true);
      }

      // should have email formatting
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setEmailIsNotValidMsg("");
        setEmailValid(true);
      } else {
        setEmailIsNotValidMsg("Email should be valid.");
        setEmailValid(false);
      }

      // check email existance
      for (let i = 0; i < userList.length; i++) {
        const user = userList[i];
        if (user.email === email) {
          setEmailExistMsg("Email is already registered");
          setEmailValid(false);
          break;
        } else {
          setEmailExistMsg("");
          setEmailValid(true);
        }
      }
    };

    if (emailTrigger) {
      validateEmail();
    }
  }, [email, emailTrigger, userList]);

  // validation for username
  useEffect(() => {
    const validateUserName = () => {
      // should be filled out
      if (username === "") {
        setUserNameIsRequiredMsg("Username is required.");
        setUnValid(false);
      } else {
        setUserNameIsRequiredMsg("");
        setUnValid(true);
      }

      if (username.length < 3 || username.length > 15) {
        setUserNameNotValidMsg("Username length should be between 3 and 15.");
        setUnValid(false);
      } else {
        setUserNameNotValidMsg("");
        setUnValid(true);
      }

      //s should not contain white space
      if (/\s/.test(username)) {
        setUserNameWhiteSpaceMsg("Username cannot contain whitespace.");
        setUnValid(false);
      } else {
        setUserNameWhiteSpaceMsg("");
        setUnValid(true);
      }

      // should be unique
      for (let i = 0; i < userList.length; i++) {
        const user = userList[i];
        if (user.username !== username) {
          setUserNameAlreadyExistMsg("");
          setUnValid(true);
        } else {
          setUserNameAlreadyExistMsg("Username was already used.");
          setUnValid(false);
          break;
        }
      }
    };
    if (userNameTrigger) {
      validateUserName();
    }
  }, [username, userNameTrigger, userList]);

  // validation for password
  useEffect(() => {
    const validatePassword = () => {
      // should be filled out
      if (password === "") {
        setPasswordIsRequiredMsg("Password is required.");
        setUnValid(false);
      } else {
        setPasswordIsRequiredMsg("");
        setPwValid(false);
      }

      // should count between 8 and 20
      if (password.length < 8 || password.length > 20) {
        setPasswordNotValidMsg(
          "Password characters should only count between 8 and 20."
        );
        setPwValid(false);
      } else {
        setPasswordNotValidMsg("");
        setPwValid(true);
      }
    };
    if (passwordTrigger) {
      validatePassword();
    }
  }, [password, passwordTrigger]);

  // validation for password confirmation
  useEffect(() => {
    const validateConfirmPassword = () => {
      //
      if (confirmPassword === password) {
        setConfirmPasswordIncorrect("");
        setCpwValid(true);
      } else {
        setConfirmPasswordIncorrect("Password do not match.");
        setCpwValid(false);
      }
    };

    if (confirmPasswordTrigger) {
      validateConfirmPassword();
    }
  }, [password, confirmPassword, confirmPasswordTrigger]);

  // register eme
  const Signup = async (e) => {
    e.preventDefault();
    try {
      if (
        password === "" &&
        email === "" &&
        fullName === "" &&
        username === "" &&
        address ===""
      ) {
        setfullNameIsRequiredMsg("Fullname is required.");
        setAddressIsRequiredMsg("Address is required.");
        setEmailIsRequiredMsg("Email is required.");
        setUserNameIsRequiredMsg("Username is required.");
        setPasswordIsRequiredMsg("Password is required.");
        setValidNotMsg("Please fill out correctly to proceed.");
      } else if (!fnValid || !unValid || !emailValid || !pwValid || !cpwValid || !address) {
        setValidNotMsg("Please fill out correctly to proceed.");
      } else {
        setValidNotMsg("");
        const formData = new FormData();
        formData.append("customer_name", fullName);
        formData.append("address", address);
        formData.append("email", email);
        formData.append("username", username);
        formData.append("password", password);

        await axios.post("http://localhost:5000/customers", formData);
        alert("Welcome, " + username + "!");
        navigate("/log-in");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <NavBar />
      <section className="body-bg-img">
        <div className="container my-5">
          <h4 className="section-title">Sign up</h4>

          <div className="container col-lg-6">
            <div
              className="rounded row"
              style={{ backgroundColor: "rgb(255, 255, 255)" }}
            >
              <div className="mx-auto my-5 px-5">
                <form className="" onSubmit={onSubmit}>
                  <p>
                    Welcome to FarmCo, where fresh and wholesome
                    agricultural products meet convenience – sign up
                    to explore a bountiful world of farm-fresh goodness at your
                    fingertips!
                  </p>

                  <p style={{ color: "red" }}>{validNotMsg}</p>

                  <div className="mb-3">
                    <label htmlFor="nameInput" className="form-label">
                      Full name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nameInput"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        setFullNameTrigger(true);
                      }}
                    />

                    <p style={{ color: "red" }}>{fullNameIsRequired}</p>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="nameInput" className="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="addressInput"
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                        setAddressTrigger(true);
                      }}
                    />

                    <p style={{ color: "red" }}>{addressIsRequired}</p>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="emailInput" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="emailInput"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailTrigger(true);
                      }}
                    />

                    <p style={{ color: "red" }}>{emailIsRequired}</p>
                    <p style={{ color: "red" }}>{emailIsNotValid}</p>
                    <p style={{ color: "red" }}>{emailWhiteSpace}</p>
                    <p style={{ color: "red" }}>{emailExist}</p>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="usernameInput" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="usernameInput"
                      onChange={(e) => {
                        setUsername(e.target.value);
                        setUserNameTrigger(true);
                      }}
                    />

                    <p style={{ color: "red" }}>{usernameIsRequired}</p>
                    <p style={{ color: "red" }}>{userNameNotValid}</p>
                    <p style={{ color: "red" }}>{userNameAlreadyExist}</p>
                    <p style={{ color: "red" }}>{userNameWhiteSpace}</p>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="passwordInput" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="passwordInput"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordTrigger(true);
                      }}
                    />

                    <p style={{ color: "red" }}>{passwordIsRequired}</p>
                    <p style={{ color: "red" }}>{passwordNotValid}</p>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="passwordConfirm" className="form-label">
                      {" "}
                      Confirm password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="passwordConfirm"
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setConfirmPasswordTrigger(true);
                      }}
                    />

                    <p style={{ color: "red" }}>{confirmPasswordIncorrect}</p>
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
                      Check if you agree to our terms and policy.
                    </div>
                  </div>

                  <button onClick={Signup} className="btn btn-primary">
                    Sign up
                  </button>

                  <div className="my-3">
                    <a href="/log-in">Already have an account?</a>
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default SignUp;
