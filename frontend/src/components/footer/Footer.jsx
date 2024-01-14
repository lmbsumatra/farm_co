// Modules
import React from "react";

// UI import
import gmail from "../../assets/images/socials/google-svgrepo-com.svg";
import twitter from "../../assets/images/socials/twitter-svgrepo-com.svg";
import youtube from "../../assets/images/socials/youtube-svgrepo-com.svg";
import telephone from "../../assets/images/contacts/call-192-svgrepo-com.svg";
import email from "../../assets/images/contacts/email-1564-svgrepo-com.svg";
import phone from "../../assets/images/contacts/messages-chat-1557-svgrepo-com.svg";
import "../styles.css";

const Footer = () => {
  return (
    <div id="Footer">
      <div className="container border-top">
        <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 my-5">
          <div className=" mb-3">
            <p className=""> FarmCo © 2023</p>
          </div>

          <div className="col mb-3"></div>

          <div className="col mb-3">
            <h5>Menu</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="/" className="nav-link p-0 ">
                  Home
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="/#About-us" className="nav-link p-0 ">
                  About us
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="/shop" className="nav-link p-0 ">
                  Shop
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="/sign-up" className="nav-link p-0 ">
                  Sign up
                </a>
              </li>
            </ul>
          </div>

          <div className="col mb-3">
            <h5>Socials</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="/" className="nav-link p-0 ">
                  <img src={gmail} alt="" className="socials-logo" />
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="/" className="nav-link p-0 ">
                  <img src={youtube} alt="" className="socials-logo" />
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="/" className="nav-link p-0 ">
                  <img src={twitter} alt="" className="socials-logo" />
                </a>
              </li>
            </ul>
          </div>

          <div className="col mb-3">
            <h5>Contacts</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="/" className="nav-link p-0 ">
                  <img src={email} alt="" className="contacts-logo" />
                  farmco.ph@gmail.com
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="/" className="nav-link p-0 ">
                  <img src={phone} alt="" className="contacts-logo" />
                  +639 123 456 789
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="/" className="nav-link p-0">
                  <img src={telephone} alt="" className="contacts-logo" />
                  02 123 4567
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
