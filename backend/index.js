const express = require('express');
const cors = require('cors');
require('dotenv').config();

const captureRoutes = require('./routes/captureRoutes');

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

// Routes
app.use('/', captureRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
