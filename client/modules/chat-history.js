const questionHistory = JSON.parse(localStorage.getItem('questionHistory')) || [];

// Initialize the counter for setting the ID attributes of each question - the IDs must ascend
let idCounter = 0;

// Creates and appends a new HTML element for a recent question in the chat history
function createRecentQuestion(prompt) {
  const chatHistory = document.querySelector('.chat-history');
  const recentQuestion = document.createElement('div');

  recentQuestion.className = 'recent-question';
  recentQuestion.style.fontSize = '14px';
  recentQuestion.textContent = prompt.question;
  recentQuestion.setAttribute('id', (idCounter += 1));
  chatHistory.append(recentQuestion);

  const questionID = recentQuestion.getAttribute('id');
  return questionID;
}

// Add the question, answer, and assign an ID to the most recent prompt - then add it to localStorage
function saveQuestionToHistory(questionText, answerText, questionID) {
  const newQuestion = {
    question: questionText,
    answer: answerText,
    id: questionID,
  };

  questionHistory.push(newQuestion);

  localStorage.setItem('questionHistory', JSON.stringify(questionHistory));
  console.log(questionHistory);
}

// Add each question asked to the UI
function addRecentQuestionToUI() {
  questionHistory.forEach((element) => {
    createRecentQuestion(element);
  });
}

// Add the index of each question in the chat history to an array called 'indices'
function retrieveIndicesOfRecentQuestions() {
  const allRecentQuestions = document.querySelectorAll('.recent-question');
  const allRecentQuestionsArray = Array.from(allRecentQuestions);
  const indices = [];
  
  allRecentQuestionsArray.forEach((element, index) => indices.push(index));

  // Return the array so it can be used in the function below
  return indices;
}

// Displays the question and answer information of a clicked question in the chat window
function displayClickedPromptInChatWindow(event) {
  if (event.target.className === 'recent-question') {
    const questionTextBox = document.querySelector('.question-text-box');
    const answerBox = document.querySelector('.answer-text-box');

    const questionIndices = retrieveIndicesOfRecentQuestions();
    const clickedQuestionId = parseInt(event.target.getAttribute('id'), 10);

    // Calculate the index of the clicked question in the questionIndices array
    // Since array indices start from 0, subtract 1 from the clickedQuestionId
    const clickedQuestionIndex = clickedQuestionId - 1;
   
    // Check if the calculated clickedQuestionIndex is within the valid range
    if (clickedQuestionIndex >= 0 && clickedQuestionIndex < questionIndices.length) {
      const clickedQuestion = questionIndices[clickedQuestionIndex];
      questionTextBox.textContent = questionHistory[clickedQuestion].question;
      answerBox.textContent = questionHistory[clickedQuestion].answer;
    }
  }
}

// Add a click event listener to each question in the chat history which calls the 'displayClickedPromptInChatWindow' function when triggered
function addClickListenerToRecentQuestions() {
  const chatHistory = document.querySelector('.chat-history');
  chatHistory.addEventListener('click', (event) => {
    if (event.target.classList.contains('recent-question')) {
      displayClickedPromptInChatWindow(event);
    }
  });
}

addRecentQuestionToUI();
addClickListenerToRecentQuestions();

export { createRecentQuestion, saveQuestionToHistory };