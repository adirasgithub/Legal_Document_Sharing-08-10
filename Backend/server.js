const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const { getDocumentLinks } = require('./controllers/documentController');

// Load env vars
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', (req, res, next) => {
  console.log(`Received ${req.method} request to ${req.originalUrl}`);
  next();
}, authRoutes);
app.get('/api/document-links', getDocumentLinks);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});