<script lang="ts">
  import { writable } from 'svelte/store';

  export const selectedPersona = writable('assistant');

  const personas = [
    { id: 'assistant', name: 'Assistant' },
    { id: 'developer', name: 'Developer' },
    { id: 'analyst', name: 'Analyst' },
    { id: 'writer', name: 'Writer' }
  ];
</script>

<div class="flex-1">
  <label class="block text-sm font-medium text-gray-700">Persona</label>
  <select
    bind:value={$selectedPersona}
    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
  >
    {#each personas as persona}
      <option value={persona.id}>{persona.name}</option>
    {/each}
  </select>
</div>