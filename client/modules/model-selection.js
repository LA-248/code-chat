let model;

// Set the programming language selected by the user
function setModelSelection(event) {
  model = event.target.value;
  console.log(model);
}

// Set the LLM model selected by the user from the dropdown menu
function setSelectedModel() {
  const modelDropdownMenu = document.getElementById('model-dropdown-menu');

  modelDropdownMenu.addEventListener('change', (event) => {
    setModelSelection(event);
  });
}

setSelectedModel();

export { model };
