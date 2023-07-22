import getCompletion from './modules/openai-chat-api.js';
import {
  setLanguageSelection,
  displayQuestion,
  selection
} from './modules/user-interface.js';
import {
  addRecentQuestionToUI,
  addClickListenerToChatHistory
} from './modules/chat-history.js';

const questionInput = document.getElementById('question-input');
const form = document.getElementById('form');

// Function that displays the answer returned by the OpenAI API in the appropriate text box
function displayAnswer(event) {
  // Prevent the page from automatically refreshing on form submission
  event.preventDefault();
  const input = document.getElementById('question-input').value;
  getCompletion(input, selection);
}

// Sets the border for the button of the selected programming language
function setLanguageButtonBorder(event) {
  const clickedButton = event.target;
  const allLanguageButtons = document.querySelectorAll('.language-button');

  // Remove the 'active' class from all buttons when clicking on one
  if (clickedButton.classList.contains('language-button')) {
    allLanguageButtons.forEach((button) => {
      button.classList.remove('active');
    });
    // Add the 'active' class only to the button that was clicked
    clickedButton.classList.add('active');
  }
}

function setSelectedLanguage() {
  const languageSelection = document.querySelector('.language-selection-buttons');
  
  languageSelection.addEventListener('click', (event) => {
    setLanguageSelection(event);
    setLanguageButtonBorder(event);
    questionInput.disabled = false;
    questionInput.style.backgroundColor = 'white';
  });
}

// Once the user submits their question, display the answer returned and the question asked
form.addEventListener('submit', (event) => {
  const answerBox = document.querySelector('.answer-text-box');
  
  displayAnswer(event);
  displayQuestion();
  questionInput.value = '';
  answerBox.textContent = '';
});

window.onload = () => {
  // Disable question input until the user selects a programming language to ask questions about
  questionInput.disabled = true;
  if (questionInput.disabled === true) {
    questionInput.style.backgroundColor = '#f8f8f8';
    questionInput.placeholder = 'Please select a programming language';
  }
};

setSelectedLanguage()
addRecentQuestionToUI()
addClickListenerToChatHistory();
