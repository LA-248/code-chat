import getCompletion from './openai-chat-api.js';
import { selection } from './language-selection.js';

function displayQuestion() {
  const questionTextBox = document.querySelector('.question-text-box');
  const input = document.getElementById('question-input').value;
  questionTextBox.textContent = input;
}

// Function that displays the answer returned by the OpenAI API in the appropriate text box
function displayAnswer(event) {
  // Prevent the page from automatically refreshing on form submission
  event.preventDefault();
  const input = document.getElementById('question-input').value;
  getCompletion(input, selection);
}

function displayLoadingMessage() {
  const form = document.getElementById('form');
  const loadingMessage = document.createElement('p');

  loadingMessage.className = 'loadingMessage';
  loadingMessage.textContent =
    'Please wait while the request is being processed...';
  form.appendChild(loadingMessage);

  return loadingMessage;
}

function removeLoadingMessage(loadingMessage) {
  const form = document.getElementById('form');
  form.removeChild(loadingMessage);
}

export {
  displayQuestion,
  displayAnswer,
  displayLoadingMessage,
  removeLoadingMessage
};
