const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors(), {
  origin: [],
  methods: ['POST', 'GET'],
  credentials: true,
});

app.get('/api/key', (req, res) => {
  const apiKey = process.env.API_KEY;
  res.setHeader('Content-Type', 'application/json');
  res.json({ apiKey });
});

module.exports = app;
