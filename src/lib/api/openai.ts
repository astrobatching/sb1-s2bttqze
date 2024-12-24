import type { APIResponse, OpenAIConfig } from './types';

export async function callOpenAI(
  prompt: string,
  config: OpenAIConfig
): Promise<APIResponse<string>> {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`
      },
      body: JSON.stringify({
        model: config.model,
        messages: [{ role: 'user', content: prompt }],
        temperature: config.temperature ?? 0.7,
        max_tokens: config.maxTokens
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'OpenAI API error');
    }

    return {
      success: true,
      data: data.choices[0]?.message?.content
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}