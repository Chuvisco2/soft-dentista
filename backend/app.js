const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./src/routes');
const errorHandler = require('./src/middleware/errorHandler');

app.use(cors());
app.use(bodyParser.json());
app.use('/api', routes);

// Middleware de Manipulação de Erros
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

// backend/app.js
const cron = require('node-cron');
const alignmentReminderJob = require('./src/jobs/alignmentReminderJob');
const returnReminderJob = require('./src/jobs/returnReminderJob');

cron.schedule('0 8 * * *', alignmentReminderJob);  // Executa todos os dias às 08:00
cron.schedule('0 9 * * *', returnReminderJob);     // Executa todos os dias às 09:00



});

module.exports = app;
