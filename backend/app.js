// app.js
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
});

module.exports = app;
