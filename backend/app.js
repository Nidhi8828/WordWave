// Import necessary packages using ES6 import syntax
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import fs from 'fs';
import { exec } from 'child_process';
import path from 'path';
import axios from "axios";

const RAPIDAPI_KEY='f63a9c47bbmshaf645ec8659af3ep1f7c7cjsna7c8a41d7b50';

// Initialize Express app
const app = express();

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse incoming JSON requests

// Example route for testing
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

// Setup file upload handling with multer
const upload = multer({ dest: 'uploads/' });

// Endpoint to handle PDF extraction
app.post('/api/extract-text', upload.single('pdf'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    // Command to execute the PHP script with the uploaded file as an argument
    console.log("File object:");
    console.log(req.file);
    const command = `php ./readpdf1.php ${req.file.originalname}`;
    // const command = `php ${path.resolve("C:/Users/Nidhi/Desktop/Projects/AUDIOTRANSLATEHUB/Audio_Translate_Hub/backend", 'readpdf1.php')} ${path.resolve("C:/Users/Nidhi/Desktop/Projects/AUDIOTRANSLATEHUB/Audio_Translate_Hub/backend", 'uploads', req.file.filename)}`;


    // Execute the command
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error("Error executing PHP script:", error);
        return res.status(500).json({ error: 'Failed to extract text from PDF' });
      }

      if (stderr) {
        console.error("PHP script stderr:", stderr);
        return res.status(500).json({ error: 'Error in PHP script' });
      }

      // Send back the extracted text
      res.json({ text: stdout.trim() });
    });
  } catch (error) {
    console.error("Error during API request:", error);
    res.status(500).json({ error: 'Failed to extract text from PDF' });
  } finally {
    // Clean up the uploaded file safely
    try {
      fs.unlinkSync(req.file.path);
    } catch (unlinkError) {
      console.error("Error cleaning up file:", unlinkError);
    }
  }
});

app.post('/api/translate', async (req, res) => {
  const { text, language } = req.body;
  console.log(text);
  console.log(language);

  // Check if text and language are provided
  if (!text || !language) {
    return res.status(400).json({ error: 'Text and language are required' });
  }

  try {
    // Define the RapidAPI Google Translate API URL
    const translationApiUrl = 'https://free-google-translator.p.rapidapi.com/external-api/free-google-translator';
    
    // Make the POST request to Google Translate API via RapidAPI
    const response = await axios.post(
      translationApiUrl,
      {
        from: 'en',  // Automatically detect source language
        to: language,  // The target language passed from the frontend
        query: text,  // The extracted text to translate
      },
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-rapidapi-key': RAPIDAPI_KEY,  // Your RapidAPI key from .env file
          'x-rapidapi-host': 'free-google-translator.p.rapidapi.com',
        },
      }
    );
    console.log(response.data);
    console.log(response.data.translation);
    // Return the translated text in the response
    res.json({ translatedText: response.data.translation });
  } catch (error) {
    console.error('Error during translation:', error);
    res.status(500).json({ error: 'Failed to translate text' });
  }
});


// Export the app for use in server.js
export default app;
