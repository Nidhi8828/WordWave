// import { useState } from 'react';
// // import reactLogo from './assets/react.svg';
// // import viteLogo from '/vite.svg';
// import './App.css';
// // import Header from './Header';
// // import Footer from './Footer';

// function App() {
//   // const [count, setCount] = useState(0);

//   return (
//     <>
//       {/* <Header /> */}
//       <div id="myPage">
      
//         <nav className="w3-sidebar w3-bar-block w3-white w3-card w3-animate-left w3-xxlarge" style={{ display: 'block', zIndex: 2 }} id="mySidebar">
//           <a href="javascript:void(0)" onClick={w3_close} className="w3-bar-item w3-button w3-display-topright w3-text-teal">
//             Close <i className="fa fa-remove"></i>
//           </a>
//           <a href="#" className="w3-bar-item w3-button">Link 1</a>
//           <a href="#" className="w3-bar-item w3-button">Link 2</a>
//           <a href="#" className="w3-bar-item w3-button">Link 3</a>
//           <a href="#" className="w3-bar-item w3-button">Link 4</a>
//           <a href="#" className="w3-bar-item w3-button">Link 5</a>
//         </nav>

//         <div className="w3-top">
//           <div className="w3-bar w3-theme-d2 w3-left-align">
//             <a className="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-hover-white w3-theme-d2" href="javascript:void(0);" onClick={openNav}>
//               <i className="fa fa-bars"></i>
//             </a>
//             <a href="/example/pdf/index.html" className="w3-bar-item w3-button w3-teal">
//               <i className="fa fa-home w3-margin-right"></i>Logo
//             </a>
//             <a href="/example/pdf/index.html#team" className="w3-bar-item w3-button w3-hide-small w3-hover-white">Team</a>
//             <a href="/example/pdf/index.html#work" className="w3-bar-item w3-button w3-hide-small w3-hover-white">Work</a>
//             <a href="/example/pdf/index.html#contact" className="w3-bar-item w3-button w3-hide-small w3-hover-white">Contact</a>
//             <a href="#" className="w3-bar-item w3-button w3-hide-small w3-right w3-hover-teal" title="Search">
//               <i className="fa fa-search"></i>
//             </a>
//           </div>

//           <div id="navDemo" className="w3-bar-block w3-theme-d2 w3-hide w3-hide-large w3-hide-medium">
//             <a href="#team" className="w3-bar-item w3-button">Team</a>
//             <a href="#work" className="w3-bar-item w3-button">Work</a>
//             <a href="#pricing" className="w3-bar-item w3-button">Price</a>
//             <a href="#contact" className="w3-bar-item w3-button">Contact</a>
//             <a href="#" className="w3-bar-item w3-button">Search</a>
//           </div>
//         </div>

//         <div className="w3-display-container w3-animate-opacity">
//           <img src="/w3images/background.jpg" alt="boat" style={{ width: '100%', minHeight: '150px', maxHeight: '150px' }} />
//           <div className="w3-container w3-display-bottomleft w3-margin-bottom">
//             <button onClick={() => document.getElementById('id01').style.display = 'block'} className="w3-button w3-xlarge w3-theme w3-hover-teal" title="Go To W3.CSS">
//               Audio Translation Hub
//             </button>
//           </div>
//         </div>

//         <div id="id01" className="w3-modal">
//           <div className="w3-modal-content w3-card-4 w3-animate-top">
//             <header className="w3-container w3-teal w3-display-container">
//               <span onClick={() => document.getElementById('id01').style.display = 'none'} className="w3-button w3-teal w3-display-topright">
//                 <i className="fa fa-remove"></i>
//               </span>
//               <h4>Oh snap! We just showed you a modal..</h4>
//               <h5>Because we can <i className="fa fa-smile-o"></i></h5>
//             </header>
//             <div className="w3-container">
//               <p>Cool huh? Ok, enough teasing around..</p>
//               <p>Go to our <a className="w3-text-teal" href="/w3css/default.asp">W3.CSS Tutorial</a> to learn more!</p>
//             </div>
//             <footer className="w3-container w3-teal">
//               <p>Modal footer</p>
//             </footer>
//           </div>
//         </div>

//         <div className="w3-container w3-padding-24">
//           <h3>PDF Translation and read out loud</h3>
//           <p>Once PDF file is selected, its content will be shown in the textarea below. If needed, its language
//             could be detected. Later, it could be read out loud!</p>
//           <div className="form-group w3-padding-12">
//             <label htmlFor="inpfile">Select PDF:</label>
//             <input type="file" className="form-control-file border" name="inpfile" id="inpfile" />
//           </div>
//           <button className="btn btn-primary" id="showtext">Extract Text</button>
//         </div>

//         <div className="w3-container w3-padding-24">
//           <h4>Original text in PDF</h4>
//           <div className="w3-padding-12" style={{ height: '200px', width: '100%', overflow: 'scroll', border: 'solid 2px orange' }} id="origtext">
//             This text will be replaced by text from the selected pdf file...
//           </div>
//         </div>

//         <div className="w3-container w3-padding-24">
//           <button className="btn btn-primary" id="detectlang">Detect Language</button>
//           <span><input type="text" className="form-control-text border" id="langname" placeholder="Unknown" /></span>
//         </div>

//         <div className="w3-container w3-padding-24">
//           <h4>Translation</h4>
//           <label htmlFor="langs">Choose a Language:</label>
//           <select className="form-select" name="langs" id="langs">
//             <option value="en">English (default)</option>
//             <option value="it">Italian</option>
//             <option value="es">Spanish</option>
//             <option value="de">German</option>
//           </select>
//           <button className="btn btn-primary" id="transto">Translate</button>
//           <div className="w3-padding-12" style={{ height: '100px', width: '100%', overflow: 'scroll', border: 'solid 2px orange' }} id="transtext">
//             Translated text will be shown here ...
//           </div>
//         </div>

//         <div className="w3-container w3-padding-24">
//           <h4>Read Out</h4>
//           <label htmlFor="langs">Click here to read out loud:</label>
//           <button className="btn btn-primary" id="readout"><i className="fa fa-volume-up"></i></button>
//         </div>

//         <footer className="w3-container w3-padding-32 w3-theme-d1 w3-center">
//           <h4>Follow Us</h4>
//           <a className="w3-button w3-large w3-teal" href="javascript:void(0)" title="Facebook"><i className="fa fa-facebook"></i></a>
//           <a className="w3-button w3-large w3-teal" href="javascript:void(0)" title="Twitter"><i className="fa fa-twitter"></i></a>
//           <a className="w3-button w3-large w3-teal" href="javascript:void(0)" title="Google +"><i className="fa fa-google-plus"></i></a>
//           <a className="w3-button w3-large w3-teal" href="javascript:void(0)" title="Google +"><i className="fa fa-instagram"></i></a>
//           <a className="w3-button w3-large w3-teal w3-hide-small" href="javascript:void(0)" title="Linkedin"><i className="fa fa-linkedin"></i></a>
//           <p>Powered by <a href="https://www.w3schools.com/w3css/default.asp" target="_blank">w3.css</a></p>

//           <div style={{ position: 'relative', bottom: '100px', zIndex: 1 }} className="w3-tooltip w3-right">
//             <span className="w3-text w3-padding w3-teal w3-hide-small">Go To Top</span>
//             <a className="w3-button w3-theme" href="#myPage">
//               <span className="w3-xlarge">
//                 <i className="fa fa-chevron-circle-up"></i>
//               </span>
//             </a>
//           </div>
//         </footer>
//       </div>
//       {/* <Footer /> */}
//     </>
//   );
// }

// export default App;



import React from 'react';
import './App.css';
import Image from './components/Image';
import Header from './components/Header';
import Footer from './components/Footer';
// import Sidebar from './components/Sidebar';
// import TopBar from './components/TopBar';
import Hero from './components/Hero';
// import Modal from './components/Modal';
import PDFTranslation from './components/PDFTranslation';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <>
      <div id="myPage">
       <Image />
        <Header />
        {/* <Hero /> */}
       
        <PDFTranslation />
        <Footer />
      </div>
    </>
  );
}

export default App;
