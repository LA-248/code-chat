// Create and display a loading message which is shown whilst the response to the question is being retrieved
function displayLoadingMessage() {
  const form = document.getElementById('form');
  const loadingMessage = document.createElement('p');

  loadingMessage.className = 'loadingMessage';
  loadingMessage.textContent = 'Please wait while the request is being processed...';
  form.appendChild(loadingMessage);

  return loadingMessage;
}

// Remove the loading message once the answer has been retrieved
function removeLoadingMessage(loadingMessage) {
  const form = document.getElementById('form');
  form.removeChild(loadingMessage);
}

export { displayLoadingMessage, removeLoadingMessage };