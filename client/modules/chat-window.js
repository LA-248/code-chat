import getCompletion from './chat-api.js';
import { questionInput, selection } from './language-selection.js';

// Display the question asked by the user in the chat window
function displayQuestion() {
  const questionTextBox = document.querySelector('.question-text-box');
  const input = document.getElementById('question-input').value;
  questionTextBox.textContent = `${input} | ${selection}`;
  questionTextBox.style.color = 'white';
}

// Function that displays the answer returned by the Perplexity's API in the appropriate text box
function displayAnswer(event) {
  // Prevent the page from automatically refreshing on form submission
  event.preventDefault();
  const input = document.getElementById('question-input').value;

  questionInput.disabled = true;
  if (questionInput.disabled === true) {
    questionInput.style.backgroundColor = '#353535';
  }

  // Call the function that sends an API request to Perplexity's chat completion endpoint and displays the answer in the chat window
  getCompletion(input, selection);
}

function createNewChat() {
  const newChatButton = document.querySelector('.new-chat-button');
  newChatButton.addEventListener('click', () => {
    window.location.reload();
  });
}

createNewChat();

export { displayQuestion, displayAnswer };
