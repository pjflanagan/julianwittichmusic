
export async function fetchEvents() {
  const response = await fetch('/.netlify/functions/events');
  return await response.json();
}
