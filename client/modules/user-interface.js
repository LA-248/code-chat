// Global variable to store the user's programming language selection
// Replace with a callback function
let selection = '';

const loadingMessage = document.createElement('p');

function setLanguageSelection(event) {
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
  const mainContainer = document.querySelector('.main-container');

  loadingMessage.className = 'loadingMessage';
  loadingMessage.textContent =
    'Please wait while the request is being processed...';
  mainContainer.appendChild(loadingMessage);
}

function removeLoadingMessage() {
  const mainContainer = document.querySelector('.main-container');
  mainContainer.removeChild(loadingMessage);
}

export {
  setLanguageSelection,
  displayQuestion,
  displayLoadingMessage,
  removeLoadingMessage,
  selection,
};
