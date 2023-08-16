import { displayRenameQuestionButton, openModal, closeModalOnClick } from "./rename-question-modal.js";

const questionHistory = JSON.parse(localStorage.getItem('questionHistory')) || [];
let clickedQuestionIndex;

// This counter is attached to the 'recent-question' HTML element and incremented each time a new question is created
let recentQuestionIdCounter = 0;

// Creates and appends a new HTML element for a recent question in the chat history
function createRecentQuestion(prompt) {
  const chatHistory = document.querySelector('.chat-history');
  const recentQuestion = document.createElement('div');

  recentQuestion.className = 'recent-question';
  recentQuestion.style.fontSize = '14px';
  recentQuestion.textContent = `${prompt.question}`;
  recentQuestion.setAttribute('id', (recentQuestionIdCounter += 1));
  chatHistory.append(recentQuestion);
}

// Add the question, answer, and assign an ID to the most recent prompt - then add it to localStorage
function saveQuestionToHistory(questionText, answerText, languageSelection) {
  const newQuestion = {
    question: questionText,
    answer: answerText,
    language: languageSelection,
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

function removeMainHeading() {
  let isHeadingRemoved = false;

  return function () {
    const heading = document.querySelector('.heading-text-wrapper');
    if (isHeadingRemoved === false) {
      heading.remove();;
      isHeadingRemoved = true;
    }
  }
}

const removeHeading = removeMainHeading();

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
    removeHeading();

    const questionTextBox = document.querySelector('.question-text-box');
    const answerBox = document.querySelector('.answer-text-box');

    const questionIndices = retrieveIndicesOfRecentQuestions();
    const clickedQuestionId = parseInt(event.target.getAttribute('id'), 10);

    // Calculate the index of the clicked question in the questionIndices array
    // Since array indices start from 0, subtract 1 from the clickedQuestionId
    clickedQuestionIndex = clickedQuestionId - 1;

    // Check if the calculated clickedQuestionIndex is within the valid range
    if (clickedQuestionIndex >= 0 && clickedQuestionIndex < questionIndices.length) {
      const clickedQuestion = questionIndices[clickedQuestionIndex];
      questionTextBox.textContent = `${questionHistory[clickedQuestion].question}`;
      answerBox.textContent = questionHistory[clickedQuestion].answer;
    }
  }
}

// Creates a button that allows the user to take a certain action on a question from their chat history (e.g. deleting or renaming a question)
function createDeleteQuestionButton() {
  let isDeleteButtonAppended = false;

  return function () {
    const questionWrapper = document.querySelector('.question-wrapper');
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.textContent = 'Delete chat';

    console.log(deleteButton);

    if (isDeleteButtonAppended === false) {
      questionWrapper.append(deleteButton);
      isDeleteButtonAppended = true;
    }
  };
}

const displayDeleteQuestionButton = createDeleteQuestionButton();

// Removes the current question that is being displayed in the chat window when the user clicks the 'Delete chat' button
function removeQuestionFromChatHistory() {
  const deleteButton = document.querySelector('.delete-button');
  const questionName = deleteButton.previousElementSibling;
  const answer = document.querySelector('.answer-text-box');
  const recentQuestions = document.querySelectorAll('.recent-question');
  const recentQuestionsArray = Array.from(recentQuestions);

  // Find the question in localStorage which matches the current question being displayed
  const deleteFromLocalStorage = questionHistory.find(element => element.question === questionName.textContent);
  // Find the question in the chat history that matches the current question being displayed
  const questionToDelete = recentQuestionsArray.find(question => question.textContent === questionName.textContent);

  // If there is a match, delete it from localStorage
  // The clickedQuestionIndex is retrieved from the 'displayClickedPromptInChatWindow' function - which is called when a user clicks on a question in the chat history
  if (deleteFromLocalStorage) {
    questionHistory.splice(clickedQuestionIndex, 1);
  }

  // If there is a match, remove it from the chat history UI
  if (questionToDelete) {
    questionToDelete.remove();
  }

  // Clear the contents of the chat window after the question has been deleted
  questionName.textContent = '';
  answer.textContent = '';
  
  localStorage.setItem('questionHistory', JSON.stringify(questionHistory));
}

// Add a click event listener to each question in the chat history which calls the relevant functions when triggered
function addClickListenerToRecentQuestions() {
  const chatHistory = document.querySelector('.chat-history');
  chatHistory.addEventListener('click', (event) => {
    if (event.target.classList.contains('recent-question')) {
      displayClickedPromptInChatWindow(event);
      displayDeleteQuestionButton();
      displayRenameQuestionButton();
    }
  });
}

/* 
Adds an event listener to the document, if the element clicked is the 'Delete chat' button, call the 'removeQuestionFromChatHistory' function
*/
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-button')) {
    removeQuestionFromChatHistory();
  }
});

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('rename-button')) {
    openModal();
  }
});

addRecentQuestionToUI();
addClickListenerToRecentQuestions();

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', closeModalOnClick);

export { createRecentQuestion, saveQuestionToHistory, questionHistory, removeHeading };
