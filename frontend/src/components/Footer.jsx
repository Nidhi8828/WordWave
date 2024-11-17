import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <h4 className="footer__heading">Follow Us</h4>
      <div className="footer__socials">
        <a className="footer__button" href="#" title="Facebook"><i className="fa fa-facebook"></i></a>
        <a className="footer__button" href="#" title="Twitter"><i className="fa fa-twitter"></i></a>
        <a className="footer__button" href="#" title="Google +"><i className="fa fa-google-plus"></i></a>
        <a className="footer__button" href="#" title="Instagram"><i className="fa fa-instagram"></i></a>
        <a className="footer__button footer__button--hidden" href="#" title="Linkedin"><i className="fa fa-linkedin"></i></a>
      </div>
      <div className="footer__top">
        <span className="footer__tooltip">Go To Top</span>
        <a className="footer__top-button" href="#myPage">
          <i className="fa fa-chevron-circle-up"></i>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
