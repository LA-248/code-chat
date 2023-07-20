// Global variable to store the user's programming language selection
// Replace with a callback function
let selection = '';

const loadingMessage = document.createElement('p');
const recentQuestion = document.createElement('div');

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

  loadingMessage.className = 'loadingMessage';
  loadingMessage.textContent =
    'Please wait while the request is being processed...';
  form.appendChild(loadingMessage);
}

function removeLoadingMessage() {
  const form = document.getElementById('form');
  form.removeChild(loadingMessage);
}

function addQuestionToChatHistory(element) {
  const chatHistory = document.querySelector('.chat-history');
  recentQuestion.className = 'recentQuestion';
  recentQuestion.textContent = element.question;
  recentQuestion.style.fontSize = '14px';
  chatHistory.append(recentQuestion);
}

function displayRecentQuestion(element) {
  recentQuestion.addEventListener('click', () => {
    const questionTextBox = document.querySelector('.question-text-box');
    const answerBox = document.querySelector('.answer-text-box');
    questionTextBox.textContent = element.question;
    answerBox.textContent = element.answerText;
  })
}

export {
  setLanguageSelection,
  displayQuestion,
  displayLoadingMessage,
  removeLoadingMessage,
  addQuestionToChatHistory,
  displayRecentQuestion,
  selection,
};
