const mainContainer = document.querySelector('.main-container');
const answerBox = document.querySelector('.answer-text-box');
const languageSelection = document.querySelector('.language-selection-cards');
const card = document.querySelector('.card');

function selectLanguage(event) {
  if (event.target.className === 'card') {
    const selection = event.target.textContent;
    console.log(selection);
    return selection;
  }
}

languageSelection.addEventListener('click', (event) => {
  selectLanguage(event);
});

async function getCompletion(message, language) {
  const url = 'https://api.openai.com/v1/chat/completions';
  const apiKey = '';

  const loadingMessage = document.createElement('p');
  loadingMessage.className = 'loadingMessage';
  loadingMessage.textContent =
    'Please wait while the request is being processed...';
  mainContainer.appendChild(loadingMessage);

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
            content: `You are a JavaScript helper chatbot who answers questions about using JavaScript.`,
          },
          { role: 'user', content: message },
        ],
        top_p: 1.0,
        frequency_penalty: 0.5,
        presence_penalty: 0.0,
      }),
    });

    // Handle the response
    const data = await response.json();
    console.log(data);
    mainContainer.removeChild(loadingMessage);
    const answer = data.choices[0].message.content;
    answerBox.textContent = answer;
    document.body.removeChild(loadingMessage);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

function displayAnswer(event) {
  event.preventDefault();
  const input = document.getElementById('ask-question').value;
  const language = selectLanguage(event);
  getCompletion(input, language);
}

const form = document.getElementById('form');
form.addEventListener('submit', (event) => {
  displayAnswer(event);
});
