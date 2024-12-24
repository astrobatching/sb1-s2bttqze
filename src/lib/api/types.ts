import type { Message } from '../types';

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface WebhookPayload {
  message: Message;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface CodaConfig {
  apiKey: string;
  docId: string;
  tableId: string;
}

export interface N8NConfig {
  webhookUrl: string;
  nodeType: string;
  payload?: Record<string, any>;
}

export interface OpenAIConfig {
  apiKey: string;
  model: string;
  temperature?: number;
  maxTokens?: number;
}