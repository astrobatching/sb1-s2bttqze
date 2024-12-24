export interface OpenWebConfig {
  endpoint: string;
  apiKey: string;
  model?: string;
  headers?: Record<string, string>;
  parameters?: {
    temperature?: number;
    maxTokens?: number;
    topP?: number;
    frequencyPenalty?: number;
    presencePenalty?: number;
    [key: string]: any;
  };
}