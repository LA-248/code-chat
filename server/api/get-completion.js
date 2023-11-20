require('dotenv').config();
const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const { message, language } = req.body;
  const url = 'https://api.openai.com/v1/chat/completions';

  try {
    const openAIResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are a ${language} helper chatbot who answers questions about using ${language}.`,
          },
          { role: 'user', content: message },
        ],
      }),
    });

    const data = await openAIResponse.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};
