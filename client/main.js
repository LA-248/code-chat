import { questionInput } from './modules/language-selection.js';
import { displayQuestion, displayAnswer } from './modules/chat-window.js';
import { removeHeading } from './modules/chat-history.js';
import { model } from './modules/model-selection.js';

const questionInputForm = document.getElementById('question-input-form');

// Once the user submits their question, display the answer returned and the question asked
questionInputForm.addEventListener('submit', (event) => {
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
    questionInput.style.backgroundColor = '#353535';
    questionInput.placeholder = 'Please select a programming language';
  }

  // Set a model by default on window load
  let model = 'pplx-7b-chat';
  console.log(model);
};
