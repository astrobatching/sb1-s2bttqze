export interface N8NConfig {
  webhookUrl: string;
  nodeType: string;
  payload?: Record<string, any>;
}

export async function sendToN8N(config: N8NConfig, data: any): Promise<boolean> {
  try {
    const response = await fetch(config.webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nodeType: config.nodeType,
        data,
        ...config.payload
      })
    });
    
    return response.ok;
  } catch (error) {
    console.error('Failed to send to n8n:', error);
    return false;
  }
}