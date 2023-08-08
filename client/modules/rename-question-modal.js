const dialog = document.getElementById('rename-modal');

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

function openModal() {
  dialog.showModal();
}

function closeModalOnClick(event) {
  // Check if the clicked element is outside the modal
  if (event.target === dialog) {
    dialog.close();
  }
}

export { displayRenameQuestionButton, openModal, closeModalOnClick };
