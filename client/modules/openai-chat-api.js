import fetchAPIKey from './api-key-fetcher.js';
import { displayLoadingMessage, removeLoadingMessage } from './loading-message.js';
import { createRecentQuestion, saveQuestionToHistory, questionHistory } from './chat-history.js';
import { selection } from './language-selection.js';

// Make an API request to OpenAI's chat completion endpoint and display the message response as an answer
export default async function getCompletion(message, language) {
  const url = 'https://api.openai.com/v1/chat/completions';
  const apiKey = await fetchAPIKey();

  const answerBox = document.querySelector('.answer-text-box');
  const loadingMessage = displayLoadingMessage();

  try {
    const response = await fetch(url, {
      method: 'POST',
      // credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are a ${language} helper chatbot who answers questions about using ${language}.`,
          },
          { role: 'user', content: message },
        ],
        top_p: 1.0,
        frequency_penalty: 0.5,
        presence_penalty: 0.0,
      }),
    });

    const data = await response.json();
    console.log(data);
    removeLoadingMessage(loadingMessage);
    // Extract the generated answer from the API response and display it in the answer text box
    const answer = data.choices[0].message.content;
    answerBox.textContent = answer;

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
