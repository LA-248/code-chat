const express = require('express');

const app = express();
app.use(express.json());

app.get('/api/key', (req, res) => {
  const apiKey = process.env.API_KEY;
  res.json({ apiKey });
});

module.exports = app;
