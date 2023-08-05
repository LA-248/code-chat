export default async function fetchAPIKey() {
  try {
    const response = await fetch('https://code-chat-backend.vercel.app/api/key', {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    const apiKey = data.apiKey;
    return apiKey;
  } catch (error) {
    console.error('Error:', error.message);
  }
}
