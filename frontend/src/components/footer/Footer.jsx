import React from 'react'
import gmail from '../../assets/images/socials/google-svgrepo-com.svg';
import twitter from '../../assets/images/socials/twitter-svgrepo-com.svg';
import youtube from '../../assets/images/socials/youtube-svgrepo-com.svg';
import telephone from '../../assets/images/contacts/call-192-svgrepo-com.svg'
import email from '../../assets/images/contacts/email-1564-svgrepo-com.svg'
import phone from '../../assets/images/contacts/messages-chat-1557-svgrepo-com.svg'

const Footer = () => {
  return (
    <div>
        <div className="container">
          <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-5 border-top">
            <div className="col mb-3">
              <a href="https://getbootstrap.com/" className="d-flex align-items-center mb-3 link-body-emphasis text-decoration-none">
                {/* <svg className="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg> */}
              </a>
              <p className="text-body-secondary"> FarmCo © 2023</p>
            </div>

            <div className="col mb-3">

            </div>

            <div className="col mb-3">
              <h5>Section</h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Home</a></li>
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">About us</a></li>
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Shop</a></li>
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Sign up</a></li>
              </ul>
            </div>

            <div className="col mb-3">
              <h5>Section</h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary"><img src={gmail} alt="" className="socials-logo" /></a></li>
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary"><img src={youtube} alt=""  className="socials-logo" /></a></li>
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary"><img src={twitter} alt=""  className="socials-logo" /></a></li>
              </ul>
            </div>

            <div className="col mb-3">
              <h5>Section</h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary"><img src={email} alt="" className="contacts-logo" />farmco.ph@gmail.com</a></li>
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary"><img src={phone} alt="" className="contacts-logo" />+639 123 456 789</a></li>
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary"><img src={telephone} alt="" className="contacts-logo" />02 123 4567</a></li>
              </ul>
            </div>
          </footer>
        </div>
    </div>
  )
}

export default Footer