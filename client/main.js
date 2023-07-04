import {
  setLanguageSelection,
  displayQuestion,
  displayLoadingMessage,
  removeLoadingMessage,
  selection,
} from './modules/user-interface.js';

const answerBox = document.querySelector('.answer-text-box');
const languageSelection = document.querySelector('.language-selection-buttons');
const questionInput = document.getElementById('question-input');
const form = document.getElementById('form');

// Make an API request to OpenAI's chat completion endpoint and display the message response as an answer
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

// Function that displays the answer returned by the OpenAI API in the appropriate text box
function displayAnswer(event) {
  // Prevent the page from automatically refreshing on form submission
  event.preventDefault();
  const input = document.getElementById('question-input').value;
  getCompletion(input, selection);
}

// Sets the border for the card of the selected programming language
function setLanguageButtonBorder(event) {
  const clickedButton = event.target;
  const allLanguageButtons = document.querySelectorAll('.language-button');

  // Remove the 'active' class from all buttons when clicking on one
  if (clickedButton.classList.contains('language-button')) {
    allLanguageButtons.forEach(button => {
      button.classList.remove('active');
    });
    // Add the 'active' class only to the button that was clicked
    clickedButton.classList.add('active');
  }
}

languageSelection.addEventListener('click', (event) => {
  setLanguageSelection(event);
  setLanguageButtonBorder(event);
  questionInput.disabled = false;
  questionInput.style.backgroundColor = 'white';
});

// Once the user submits their question, display the answer returned and the question asked
form.addEventListener('submit', (event) => {
  displayAnswer(event);
  displayQuestion();
  questionInput.value = '';
  answerBox.textContent = '';
});

window.onload = () => {
  questionInput.disabled = true;
  if (questionInput.disabled === true) {
    questionInput.style.backgroundColor = '#f8f8f8';
    questionInput.placeholder = 'Please select a programming language';
  }
};
