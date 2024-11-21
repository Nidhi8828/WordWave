import React from 'react';
import './AboutPage.css'; // For styling
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function Explore() {

  const scrolltoextract = () => {
    const about = document.getElementById('extract');
    if (about) {
      about.scrollIntoView({ behavior: 'smooth' });
    }
  };


  const scrolltotranslate = () => {
    const about = document.getElementById('translate');
    if (about) {
      about.scrollIntoView({ behavior: 'smooth' });
    }
  };


  const scrolltoreadout = () => {
    const about = document.getElementById('readout');
    if (about) {
      about.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="about-page" id="about">
      <div className="background-gif">
        <div className="content-container">
          <h1>Welcome to the Audio Translation Hub !</h1>
          <p>
            This site offers an innovative solution for converting PDF content into translated audio. 
            With a simple, user-friendly interface, users can upload PDF documents, extract their content, 
            translate it into multiple languages, and have it read aloud in various accents.
          </p>
          <p>
          WordWave leverages several key APIs to provide its functionalities. The ResponsiveVoice API is used for text-to-speech, enabling the platform to read out loud extracted or translated text in multiple languages and voice options. PDF.js helps extract text from PDF documents, allowing users to upload and process PDFs directly in the browser. For translations, the Google Translate API facilitates converting the extracted text into various languages. On the back-end, Node.js powers the server-side logic, while the FileReader API handles file uploads on the client-side. These technologies together offer a seamless experience for document processing, translation, and voice interaction.
          </p>
          <div className="cards-container">
            <div className="card">
              <h3>PDF Extraction</h3>
              <p>Our system extracts text from PDFs, allowing users to access the content easily for further processing.</p>
              <Link className="custom-link" to="#" onClick={scrolltoextract}>
              <button className="btn btn-primary" >Try Out</button>
            </Link>
            </div>
            <div className="card">
              <h3>Translation</h3>
              <p>Translate extracted text into multiple languages, making the content accessible to a global audience.</p>
              <Link className="custom-link" to="#" onClick={scrolltotranslate}>
              <button className="btn btn-primary" >Try Out</button>
            </Link>
             
            </div>
            <div className="card">
              <h3>Text to Speech</h3>
              <p>Listen to the translated text being read aloud with high-quality voice synthesis in various accents.</p>
              <Link className="custom-link" to="#" onClick={scrolltoreadout}>
              <button className="btn btn-primary">Try Out</button>
            </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Explore;
