let model;

// Set the LLM model selected by the user from the dropdown menu
function setSelectedModel() {
  const modelDropdownMenu = document.getElementById('model-dropdown-menu');

  // Set the model selected by the user
  modelDropdownMenu.addEventListener('change', (event) => {
    model = event.target.value;
    console.log(model);
  });
}

setSelectedModel();

export { model };
