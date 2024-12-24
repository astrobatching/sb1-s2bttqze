import { writable } from 'svelte/store';

export interface Model {
  id: string;
  name: string;
}

export const models: Model[] = [
  { id: 'gpt-4', name: 'GPT-4' },
  { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo' },
  { id: 'claude-2', name: 'Claude 2' },
  { id: 'gemini-pro', name: 'Gemini Pro' }
];

export const selectedModel = writable<string>('gpt-4');