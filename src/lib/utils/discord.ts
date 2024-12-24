import { settings } from '../stores/settings';
import { get } from 'svelte/store';

export async function exportToDiscord(content?: string): Promise<boolean> {
  const { discordWebhook } = get(settings);
  
  if (!discordWebhook) {
    console.error('Discord webhook URL not configured');
    return false;
  }

  try {
    const response = await fetch(discordWebhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: content || window.getSelection()?.toString() || '',
      }),
    });
    
    return response.ok;
  } catch (error) {
    console.error('Failed to export to Discord:', error);
    return false;
  }
}