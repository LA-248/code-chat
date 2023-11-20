const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ['*'],
    methods: ['POST', 'GET'],
  })
);

app.get('/api/key', (req, res) => {
  const apiKey = process.env.API_KEY;
  res.json({ apiKey });
});

module.exports = app;
