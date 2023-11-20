const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Origin',
    'https://code-chat-frontend.vercel.app'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.options('*', (req, res) => {
  res.sendStatus(200);
});

app.get('/api/key', (req, res) => {
  const apiKey = process.env.API_KEY;
  res.json({ apiKey });
});

module.exports = app;
