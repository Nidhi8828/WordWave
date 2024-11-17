// Import necessary packages using ES6 import syntax
import dotenv from 'dotenv';
import app from './app.js';

// Load environment variables from a custom .env file
dotenv.config({ path: './config/.env' });

// Get the port number from the environment variables
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
