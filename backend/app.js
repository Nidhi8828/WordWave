// Import necessary packages using ES6 import syntax
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import fs from 'fs';
import { exec } from 'child_process';
import path from 'path';

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

// Export the app for use in server.js
export default app;
