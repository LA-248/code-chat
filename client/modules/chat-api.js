import { displayLoadingMessage, removeLoadingMessage } from './loading-message.js';
import { createRecentQuestion, saveQuestionToHistory, questionHistory } from './chat-history.js';
import { questionInput, selection } from './language-selection.js';

export default async function getCompletion(message, language) {
  const url = 'https://code-chat-backend.vercel.app/api/get-completion';

  const answerTextBox = document.querySelector('.answer-text-box');
  const loadingMessage = displayLoadingMessage();

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, language }),
    });

    const data = await response.json();
    questionInput.disabled = false;
    questionInput.style.backgroundColor = '#353535';
    removeLoadingMessage(loadingMessage);

    const answer = data;
    answerTextBox.textContent = answer;

    const questionTextBox = document.querySelector('.question-text-box').textContent;
    // Save the prompt's information to localStorage
    saveQuestionToHistory(questionTextBox, answer, selection);
    // Create and append the most recent question asked to the chat history
    const lastQuestion = questionHistory[questionHistory.length - 1]
    createRecentQuestion(lastQuestion);
  } catch (error) {
    console.error('Error:', error.message);
  }
}
