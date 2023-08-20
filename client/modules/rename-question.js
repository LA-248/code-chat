let clickedQuestionIndex;

const dialog = document.getElementById('rename-modal');
const chatHistory = document.querySelector('.chat-history');
const questionHistory = JSON.parse(localStorage.getItem('questionHistory')) || [];

// Creates a button that allows the user to rename a question
function createRenameQuestionButton() {
  let isRenameButtonAppended = false;

  return function () {
    const questionWrapper = document.querySelector('.question-wrapper');
    const renameButton = document.createElement('button');
    renameButton.className = 'rename-button';
    renameButton.textContent = 'Rename';

    if (isRenameButtonAppended === false) {
      questionWrapper.append(renameButton);
      isRenameButtonAppended = true;
    }
  };
}

const displayRenameQuestionButton = createRenameQuestionButton();

// Show the modal
function openModal() {
  dialog.showModal();
}

function closeModal() {
  dialog.close();
}

// Close the modal if the user clicks anywhere outside of it
function closeModalOnClick(event) {
  // Check if the clicked element is outside the modal
  if (event.target === dialog) {
    dialog.close();
  }
}

function retrieveClickedQuestionIndex(event) {
  if (event.target.className === 'recent-question') {
    const clickedQuestionId = parseInt(event.target.getAttribute('id'), 10);
    console.log(clickedQuestionId);
  
    clickedQuestionIndex = questionHistory.findIndex(question => question.id === clickedQuestionId);
    console.log(clickedQuestionIndex);
  }
}

// A function that renames the current question on display based on the input of the user
function renameQuestion(event) {
  event.preventDefault();

  const newQuestionName = document.getElementById('rename-input').value;
  const questionTextBox = document.querySelector('.question-text-box');

  questionTextBox.textContent = newQuestionName;
  questionHistory[clickedQuestionIndex].question = newQuestionName;

  localStorage.setItem('questionHistory', JSON.stringify(questionHistory));
}

function attachModalEventListeners() {
  const renameInputForm = document.getElementById('rename-input-form');
  const submitButton = document.querySelector('.submit-button');
  const closeButton = document.querySelector('.close-button');

  renameInputForm.addEventListener('submit', (event) => {
    renameQuestion(event);
    closeModal();
  });
  
  submitButton.addEventListener('click', (event) => {
    renameQuestion(event);
    closeModal();
  });
  
  closeButton.addEventListener('click', () => {
    closeModal();
  });
}

chatHistory.addEventListener('click', retrieveClickedQuestionIndex);

attachModalEventListeners();

export { displayRenameQuestionButton, openModal, closeModalOnClick };
