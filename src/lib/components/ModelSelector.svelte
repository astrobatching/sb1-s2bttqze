<script lang="ts">
  import { writable } from 'svelte/store';

  export const selectedModel = writable('gpt-4');

  const models = [
    { id: 'gpt-4', name: 'GPT-4' },
    { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo' },
    { id: 'claude-2', name: 'Claude 2' },
    { id: 'gemini-pro', name: 'Gemini Pro' }
  ];
</script>

<div class="flex-1">
  <label class="block text-sm font-medium text-gray-700">Model</label>
  <select
    bind:value={$selectedModel}
    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
  >
    {#each models as model}
      <option value={model.id}>{model.name}</option>
    {/each}
  </select>
</div>