import type { APIResponse } from './types';
import type { OpenWebConfig } from '../types/openweb';

export async function callOpenWeb(
  prompt: string,
  config: OpenWebConfig
): Promise<APIResponse<string>> {
  try {
    const response = await fetch(config.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`,
        ...config.headers
      },
      body: JSON.stringify({
        prompt,
        model: config.model,
        parameters: config.parameters
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'OpenWeb API error');
    }

    return {
      success: true,
      data: data.response
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}