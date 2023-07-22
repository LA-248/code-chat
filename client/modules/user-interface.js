// Global variable to store the user's programming language selection
let selection = '';

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
  setLanguageSelection,
  displayQuestion,
  displayLoadingMessage,
  removeLoadingMessage,
  selection,
};
