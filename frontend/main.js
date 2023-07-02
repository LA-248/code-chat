const mainContainer = document.querySelector('.main-container');
const answerBox = document.querySelector('.answer-text-box');
const languageSelection = document.querySelector('.language-selection-cards');
const languageCard = document.querySelector('.language-card');
const form = document.getElementById('form');
const loadingMessage = document.createElement('p');

// Global variable to store the user's programming language selection
// Replace with a callback function
let selection;

function selectLanguage(event) {
  if (event.target.className === 'card') {
    selection = event.target.textContent;
    console.log(selection);
  }
}

function displayLoadingMessage() {
  loadingMessage.className = 'loadingMessage';
  loadingMessage.textContent =
    'Please wait while the request is being processed...';
  mainContainer.appendChild(loadingMessage);
}

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
    mainContainer.removeChild(loadingMessage);
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
});
