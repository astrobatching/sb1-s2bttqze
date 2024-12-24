import type { APIResponse, CodaConfig } from './types';

export async function addToCoda<T extends Record<string, any>>(
  data: T,
  config: CodaConfig
): Promise<APIResponse> {
  try {
    const response = await fetch(
      `https://coda.io/apis/v1/docs/${config.docId}/tables/${config.tableId}/rows`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          rows: [{ cells: data }]
        })
      }
    );

    if (!response.ok) {
      throw new Error('Coda API error');
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}