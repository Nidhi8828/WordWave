import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import {jwtDecode} from 'jwt-decode';



function Header() {

   const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

    useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Decode the token.  Use 'any' or create a type if you have one.
        setUsername(decodedToken.name); // Or decodedToken.name, depending on your payload
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error decoding token:', error);
        setIsLoggedIn(false); // Token is invalid, clear it.
        localStorage.removeItem('token');
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

    const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUsername('');
    navigate('/'); // Redirect to home page after logout
  };




  function openNav() {
    const x = document.getElementById('navDemo');
    if (x.className.indexOf('show') === -1) {
      x.className += ' show';
    } else {
      x.className = x.className.replace(' show', '');
    }
  }

  const scrolltofooter = () => {
    const footer = document.getElementById('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const scrolltoabout = () => {
    const about = document.getElementById('about');
    if (about) {
      about.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
            <Link className="custom-link" to="#" onClick={scrolltoabout}>
              About
            </Link>
          </li>
          <li className="custom-nav-item">
            <Link className="custom-link" to="#" onClick={scrolltofooter}>
              Contact
            </Link>
          </li>
         {isLoggedIn ? (
            <>
              <li className="custom-nav-item">
                <span className="custom-link">Hello, {username}</span>
              </li>
              <li className="custom-nav-item">
                <Link className="custom-link" to="#" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
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
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Header;
