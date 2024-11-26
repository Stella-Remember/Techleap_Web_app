require('dotenv').config(); // Load environment variables
const express = require('express');
const connectDB = require('./src/config/db'); // Path to MongoDB connection logic
const authRoutes = require('./src/routes/authRoutes'); // Import authentication routes

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // Middleware to parse JSON requests

// Health Check Route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is running and connected to MongoDB!' });
});

// Routes
app.use('/api/auth', authRoutes); // Mount authentication routes

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(`Error: ${err.message}`);
  res.status(500).json({ error: 'Something went wrong on the server' });
});

// Handle undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

