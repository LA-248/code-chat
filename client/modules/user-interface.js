// Global variable to store the user's programming language selection
// Replace with a callback function
let selection = '';

const mainContainer = document.querySelector('.main-container');
const loadingMessage = document.createElement('p');

function selectLanguage(event) {
  const questionInput = document.getElementById('question-input');
  if (event.target.className === 'language-button') {
    selection = event.target.textContent;
    questionInput.placeholder = `Ask any question about using ${selection}`;
    console.log(selection);
  }
}

function displayQuestion() {
  const questionTextBox = document.querySelector('.question-text-box');
  const input = document.getElementById('question-input').value;
  questionTextBox.textContent = input;
}

function displayLoadingMessage() {
  loadingMessage.className = 'loadingMessage';
  loadingMessage.textContent =
    'Please wait while the request is being processed...';
  mainContainer.appendChild(loadingMessage);
}

function removeLoadingMessage() {
  mainContainer.removeChild(loadingMessage);
}

export {
  selectLanguage,
  displayQuestion,
  displayLoadingMessage,
  removeLoadingMessage,
  setLanguageButtonBorder,
  selection,
};
