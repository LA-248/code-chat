const questionHistory = JSON.parse(localStorage.getItem('questionHistory')) || [];

// Add the question and answer of the most recent prompt to localStorage
function saveQuestionToHistory(questionText, answerText) { 
  const newQuestion = {
    question: questionText,
    answer: answerText
  };
  
  questionHistory.push(newQuestion);
  
  localStorage.setItem('questionHistory', JSON.stringify(questionHistory));
  console.log(questionHistory);
}

function createRecentQuestion(prompt) {
  const chatHistory = document.querySelector('.chat-history');
  const recentQuestion = document.createElement('div');
  
  recentQuestion.className = 'recent-question';
  recentQuestion.style.fontSize = '14px';
  recentQuestion.textContent = prompt.question;
  chatHistory.append(recentQuestion);
}

function addRecentQuestionToUI() {
  questionHistory.forEach(element => {
    createRecentQuestion(element);
  });
}

function displayClickedPromptInChatWindow(event) {
  if (event.target.className === 'recent-question') {
    const questionTextBox = document.querySelector('.question-text-box');
    const answerBox = document.querySelector('.answer-text-box');
    questionTextBox.textContent = questionHistory[0].question;
    answerBox.textContent = questionHistory[0].answer;
  }
}

function addClickListenerToChatHistory() {
  const chatHistory = document.querySelector('.chat-history');
  chatHistory.addEventListener('click', event => {
    if (event.target.classList.contains('recent-question')) {
      displayClickedPromptInChatWindow(event);
    }
  });
}

export {
  saveQuestionToHistory,
  addRecentQuestionToUI,
  addClickListenerToChatHistory
}