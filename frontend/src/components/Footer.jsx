// import React from 'react';
// import './Footer.css';

// function Footer() {
//   return (
//     <footer className="footer">
//       <h4 className="footer__heading">Follow Me</h4>
//       <div className="footer__socials">
//         <a className="footer__button" href="#" title="Facebook"><i className="fa fa-facebook"></i></a>
//         <a className="footer__button" href="#" title="Twitter"><i className="fa fa-twitter"></i></a>
//         <a className="footer__button" href="#" title="Google +"><i className="fa fa-google-plus"></i></a>
//         <a className="footer__button" href="#" title="Instagram"><i className="fa fa-instagram"></i></a>
//         <a className="footer__button footer__button--hidden" href="#" title="Linkedin"><i className="fa fa-linkedin"></i></a>
//       </div>
//       <div className="footer__top">
//         <span className="footer__tooltip">Go To Top</span>
//         <a className="footer__top-button" href="#myPage">
//           <i className="fa fa-chevron-circle-up"></i>
//         </a>
//       </div>
//     </footer>
//   );
// }

// export default Footer;




import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer" id="footer">
      <h4 className="footer__heading">Follow Me Here</h4>
      <div className="footer__socials">
        <a className="footer__button" href="https://www.linkedin.com/in/nidhi-dasari-1163a9260" target="_blank" title="LinkedIn">
          <i className="fa fa-linkedin"></i>
        </a>
        <a className="footer__button" href="https://www.instagram.com" target="_blank" title="Instagram">
          <i className="fa fa-instagram"></i>
        </a>
        <a className="footer__button" href="https://github.com/Nidhi8828" target="_blank" title="GitHub">
          <i className="fa fa-github"></i>
        </a>
        <a className="footer__button" href="mailto:nidhi.dasari24@gmail.com" title="Gmail">
          <i className="fa fa-google"></i>
        </a>
      </div>
      <h5 className="footer__heading">Click On The Icons To Contact Me</h5>
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
