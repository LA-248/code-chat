export default async function fetchAPIKey() {
  try {
    const response = await fetch('http://localhost:3000/api/key', {
      method: 'GET',
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
