// Global variable to store the user's programming language selection
// Replace with a callback function
let selection = '';
const mainContainer = document.querySelector('.main-container');
const loadingMessage = document.createElement('p');

function selectLanguage(event) {
  const questionInput = document.getElementById('question-input');
  if (event.target.className === 'language-card') {
    selection = event.target.textContent;
    questionInput.placeholder = `Ask any question related to ${selection}`;
    console.log(selection);
  }
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
  displayLoadingMessage,
  removeLoadingMessage,
  selection,
};
