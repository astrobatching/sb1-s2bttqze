export interface Message {
  id: string;
  content: string;
  timestamp: Date;
  sender: string;
  type: 'user' | 'system' | 'webhook';
}

export interface WebhookConfig {
  url: string;
  method: 'GET' | 'POST';
  headers: Record<string, string>;
}

export interface Settings {
  webhookUrl: string;
  codaApiKey: string;
  discordWebhook: string;
}