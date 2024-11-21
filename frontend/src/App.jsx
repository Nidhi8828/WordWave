import React from 'react';
import './App.css';
import Image from './components/Image';
import Header from './components/Header';
import Footer from './components/Footer';
import PDFTranslation from './components/PDFTranslation';
import 'bootstrap/dist/css/bootstrap.min.css';
import Explore from './components/Explore';


function App() {
  return (
    <>
      <div id="myPage">
       <Image />
        <Header />
        {/* <Hero /> */}
       {/* <Explore /> */}
        <PDFTranslation />
        <Footer />
      </div>
    </>
  );
}

export default App;
