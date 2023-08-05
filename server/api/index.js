const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors({
  origin: ['https://code-chat-frontend.vercel.app'],
  methods: ['POST', 'GET'],
}));

app.get('/api/key', (req, res) => {
  const apiKey = process.env.API_KEY;
  res.setHeader('Content-Type', 'application/json');
  res.json({ apiKey });
});

module.exports = app;
