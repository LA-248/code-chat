import {
  selectLanguage,
  displayLoadingMessage,
  removeLoadingMessage,
  selection,
} from './modules/user-interface.js';

const answerBox = document.querySelector('.answer-text-box');
const languageSelection = document.querySelector('.language-selection-cards');
const form = document.getElementById('form');

async function getCompletion(message, language) {
  const url = 'https://api.openai.com/v1/chat/completions';
  const apiKey = '';

  displayLoadingMessage();

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a ${language} helper chatbot who answers questions about using ${language}.`,
          },
          { role: 'user', content: message },
        ],
        top_p: 1.0,
        frequency_penalty: 0.5,
        presence_penalty: 0.0,
      }),
    });

    const data = await response.json();
    console.log(data);
    removeLoadingMessage();
    const answer = data.choices[0].message.content;
    answerBox.textContent = answer;
  } catch (error) {
    console.error('Error:', error.message);
  }
}

function displayAnswer(event) {
  event.preventDefault();
  const input = document.getElementById('question-input').value;
  getCompletion(input, selection);
}

languageSelection.addEventListener('click', (event) => {
  selectLanguage(event);
});

form.addEventListener('submit', (event) => {
  displayAnswer(event);
  const questionInput = document.getElementById('question-input');
  questionInput.value = '';
});
