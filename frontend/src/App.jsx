// import React from 'react';
// import './App.css';
// import Image from './components/Image';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import PDFTranslation from './components/PDFTranslation';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Login from './components/Login'
// import {Routes,Route} from 'react-router-dom';


// function App() {
//   return (
//     <>
//       <div id="myPage">
//        <Image />
//         <Header />
//      {/* <Hero />  */}
//        {/* <Explore /> */}
//         <PDFTranslation />
//         <Footer />
//       </div>
//       <Routes>
//          {/* <Route path="/" element={<Home />} />  */}
//          <Route path="/login" element={<Login />} />
//         {/* <Route path="/register" element={<Register />} /> */}
//       </Routes> 
//     </>
//   );
// }

// export default App;









import React from 'react';
import './App.css';
import Image from './components/Image';
import Header from './components/Header';
import Footer from './components/Footer';
import PDFTranslation from './components/PDFTranslation';
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Register from './components/Register';

function App() {
  return (
    <>
      <Routes>
        {/* Routes that include the main layout */}
        <Route
          path="/"
          element={
            <div id="myPage">
              <Image />
              <Header />
              <PDFTranslation />
              <Footer />
            </div>
          }
        />
        {/* Route for the login page */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;






