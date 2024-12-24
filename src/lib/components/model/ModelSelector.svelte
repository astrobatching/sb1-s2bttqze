<script lang="ts">
  import { models, selectedModel } from '../../stores/modelStore';
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