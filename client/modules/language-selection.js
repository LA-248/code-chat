let languageSelection;
const questionInput = document.getElementById('question-input');

// Set the programming language selected by the user
function setLanguageSelection(event) {
  languageSelection = event.target.value;
  if (languageSelection === 'Select') {
    questionInput.disabled = true;
    questionInput.style.backgroundColor = '#353535';
    questionInput.placeholder = 'Please select a programming language';
  } else {
    questionInput.disabled = false;
    questionInput.style.backgroundColor = '#292828';
    questionInput.placeholder = `Ask any question about using ${languageSelection}`;
  }

  console.log(languageSelection);
}

// Set up the event listener for the language selection dropdown menu -
// which calls the 'setLanguageSelection' function when the user changes language in the dropdown menu
function setSelectedLanguage() {
  const dropdownMenu = document.getElementById('dropdown-menu');

  dropdownMenu.addEventListener('change', (event) => {
    setLanguageSelection(event);
  });
}

setSelectedLanguage();

export { languageSelection, questionInput };
