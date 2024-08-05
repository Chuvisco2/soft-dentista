const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Import routes
const patientRoutes = require('./routes/patient');
const authRoutes = require('./routes/auth');
const appointmentRoutes = require('./routes/appointment');
const transactionRoutes = require('./routes/transaction'); // Import transaction routes

// Import middlewares
const errorHandler = require('./middleware/errorHandler');

// Middleware setup
app.use(bodyParser.json());
app.use(cors());

// Route setup
app.use('/api/patients', patientRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/transactions', transactionRoutes); // Use transaction routes

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
