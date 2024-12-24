import type { APIResponse, N8NConfig } from './types';

export async function sendToN8N<T>(
  data: T,
  config: N8NConfig
): Promise<APIResponse> {
  try {
    const response = await fetch(config.webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nodeType: config.nodeType,
        data,
        ...config.payload
      })
    });

    if (!response.ok) {
      throw new Error('n8n webhook error');
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}