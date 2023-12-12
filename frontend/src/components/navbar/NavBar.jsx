// NavBar.js
import React from 'react';
import { useAuth } from '../../context/Authentication';

const NavBar = () => {
  const { isAuthenticated } = useAuth();
  

  return (
    <section id="Navbar">
      {/* ... your existing code ... */}
      <li className="nav-item">
        <a className="nav-link" aria-disabled="true">{isAuthenticated ? 'Logout' : 'Log in'}</a>
      </li>
      {/* ... rest of your code ... */}
    </section>
  );
};

export default NavBar;
