export async function validateWebhook(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ test: true })
    });
    return response.ok;
  } catch (error) {
    return false;
  }
}