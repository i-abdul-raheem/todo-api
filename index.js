const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const db = require('./db');
const route = require('./routes');

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use('/', route);

app.listen(PORT, () => {
  console.log('Trying to connect to database');
  db.on('open', () => {
    console.log('Connected to database.');
    console.log(`Server started: http://localhost:${PORT}`);
  });
  db.on('error', (err) => {
    console.error(new Error(err));
  });
});
