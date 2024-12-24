import type { APIResponse, WebhookPayload } from './types';

export async function sendWebhook(
  url: string,
  payload: WebhookPayload
): Promise<APIResponse> {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error('Webhook error');
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}