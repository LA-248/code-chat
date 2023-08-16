// Create and display a loading message which is shown whilst the response to the question is being retrieved
function displayLoadingMessage() {
  const questionInputForm = document.getElementById('question-input-form');
  const loadingMessage = document.createElement('p');

  loadingMessage.className = 'loading-message';
  loadingMessage.textContent = 'Please wait while the request is being processed...';
  questionInputForm.appendChild(loadingMessage);

  return loadingMessage;
}

// Remove the loading message once the answer has been retrieved
function removeLoadingMessage(loadingMessage) {
  const questionInputForm = document.getElementById('question-input-form');
  questionInputForm.removeChild(loadingMessage);
}

export { displayLoadingMessage, removeLoadingMessage };