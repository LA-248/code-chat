import getCompletion from './openai-chat-api.js';
import { selection } from './language-selection.js';

// Display the question asked by the user in the chat window
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
  // Call the function which sends an API request to OpenAI's chat completion endpoint and displays the answer in the chat window
  getCompletion(input, selection);
}

export { displayQuestion, displayAnswer };
