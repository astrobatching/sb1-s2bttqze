import { writable } from 'svelte/store';

export interface Settings {
  webhookUrl: string;
  codaApiKey: string;
  discordWebhook: string;
  openWeb: {
    endpoint: string;
    apiKey: string;
    model: string;
  };
}

const defaultSettings: Settings = {
  webhookUrl: '',
  codaApiKey: '',
  discordWebhook: '',
  openWeb: {
    endpoint: '',
    apiKey: '',
    model: 'default'
  }
};

// Settings data store
export const settings = writable<Settings>(defaultSettings);

// Settings visibility store
export const settingsVisible = writable(false);

export function toggleSettings() {
  settingsVisible.update(value => !value);
}

// Load settings from localStorage
const savedSettings = localStorage.getItem('assistant-settings');
if (savedSettings) {
  settings.set(JSON.parse(savedSettings));
}

// Save settings when they change
settings.subscribe((value) => {
  localStorage.setItem('assistant-settings', JSON.stringify(value));
});