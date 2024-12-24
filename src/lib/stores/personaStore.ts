import { writable } from 'svelte/store';

export interface Persona {
  id: string;
  name: string;
}

export const personas: Persona[] = [
  { id: 'assistant', name: 'Assistant' },
  { id: 'developer', name: 'Developer' },
  { id: 'analyst', name: 'Analyst' },
  { id: 'writer', name: 'Writer' }
];

export const selectedPersona = writable<string>('assistant');