import { questionInput } from './modules/language-selection.js';
import { displayQuestion, displayAnswer } from './modules/chat-window.js';
import { removeHeading } from './modules/chat-history.js';

const form = document.getElementById('form');

// Once the user submits their question, display the answer returned and the question asked
form.addEventListener('submit', (event) => {
  removeHeading();
  const answerBox = document.querySelector('.answer-text-box');
  displayAnswer(event);
  displayQuestion();
  questionInput.value = '';
  answerBox.textContent = '';
});

// Tasks to perform on window load
window.onload = () => {
  // Disable question input until the user selects a programming language to ask questions about
  questionInput.disabled = true;
  if (questionInput.disabled === true) {
    questionInput.style.backgroundColor = '#f8f8f8';
    questionInput.placeholder = 'Please select a programming language';
  }
};
