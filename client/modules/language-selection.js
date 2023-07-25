let selection;
const questionInput = document.getElementById('question-input');

// Set the programming language selected by the user
function setLanguageSelection(event) {
  if (event.target.className === 'language-button') {
    selection = event.target.textContent;
    questionInput.placeholder = `Ask any question about using ${selection}`;
    console.log(selection);
  }
}

// Sets the border for the button of the selected programming language
function setLanguageButtonBorder(event) {
  const clickedButton = event.target;
  const allLanguageButtons = document.querySelectorAll('.language-button');

  // Remove the 'active' class from all buttons when clicking on one
  if (clickedButton.classList.contains('language-button')) {
    allLanguageButtons.forEach((button) => {
      button.classList.remove('active');
    });
    // Add the 'active' class only to the button that was clicked
    clickedButton.classList.add('active');
  }
}

// Set up the event listener for the language selection buttons - which calls the above functions when triggered
function setSelectedLanguage() {
  const languageSelection = document.querySelector(
    '.language-selection-buttons'
  );

  languageSelection.addEventListener('click', (event) => {
    setLanguageSelection(event);
    setLanguageButtonBorder(event);
    questionInput.disabled = false;
    questionInput.style.backgroundColor = 'white';
  });
}

setSelectedLanguage();

export { selection, questionInput };
