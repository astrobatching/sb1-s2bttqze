<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { MenuAction } from '../../types/menu';
  import { contextMenuActions } from '../../data/menuActions';
  
  export let show = false;
  export let x = 0;
  export let y = 0;
  
  const dispatch = createEventDispatcher<{
    action: { type: MenuAction['id'] };
  }>();

  function handleAction(type: MenuAction['id']) {
    dispatch('action', { type });
    show = false;
  }

  // Ensure menu stays within viewport
  $: adjustedX = Math.min(x, window.innerWidth - 160);
  $: adjustedY = Math.min(y, window.innerHeight - 200);
</script>

{#if show}
  <div 
    class="fixed z-50 bg-white rounded-lg shadow-lg py-1 min-w-[160px] border border-gray-100"
    style="left: {adjustedX}px; top: {adjustedY}px;"
  >
    {#each contextMenuActions as action}
      <button
        class="w-full px-3 py-1.5 flex items-center gap-2 text-sm {action.class}"
        on:click={() => handleAction(action.id)}
      >
        <span class="material-icons text-sm">{action.icon}</span>
        {action.label}
      </button>
    {/each}
  </div>
{/if}

<style>
  div {
    animation: fadeIn 0.1s ease-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
</style>