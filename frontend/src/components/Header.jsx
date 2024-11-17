import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  function openNav() {
    const x = document.getElementById('navDemo');
    if (x.className.indexOf('show') === -1) {
      x.className += ' show';
    } else {
      x.className = x.className.replace(' show', '');
    }
  }

  return (
    <nav className="custom-navbar">
      <Link className="custom-brand" to="/">
        Audio Translation Hub
      </Link>
      <button className="custom-toggler" type="button" onClick={openNav}>
        <i className="fa fa-bars custom-icon"></i>
      </button>
      <div className="custom-nav-collapse" id="navDemo">
        <ul className="custom-nav-list">
          <li className="custom-nav-item">
            <Link className="custom-link" to="/team">
              Team
            </Link>
          </li>
          <li className="custom-nav-item">
            <Link className="custom-link" to="/work">
              Work
            </Link>
          </li>
          <li className="custom-nav-item">
            <Link className="custom-link" to="/contact">
              Contact
            </Link>
          </li>
          <li className="custom-nav-item">
            <Link className="custom-link" to="/login">
              Login
            </Link>
          </li>
          <li className="custom-nav-item">
            <Link className="custom-link" to="/register">
              Register
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
