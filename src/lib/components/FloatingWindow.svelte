<script lang="ts">
  import { onMount } from 'svelte';
  import Settings from './Settings.svelte';
  import ActionButtons from './ActionButtons.svelte';
  import ModelSelector from './model/ModelSelector.svelte';
  import PersonaSelector from './persona/PersonaSelector.svelte';
  import ChatWindow from './chat/ChatWindow.svelte';
  import { isDragging, windowPosition } from '../stores/window';
  import { settingsVisible, toggleSettings } from '../stores/settings';
  import { handleDragStart } from '../utils/drag';

  let isMinimized = false;

  function toggleMinimize() {
    isMinimized = !isMinimized;
  }
</script>

<div
  class="md:fixed bg-white overflow-hidden transform-gpu fixed inset-0 md:inset-auto md:w-[500px] md:rounded-xl md:shadow-2xl flex flex-col"
  class:w-auto={isMinimized}
  style="left: {$windowPosition.x}px; top: {$windowPosition.y}px; transition: {$isDragging ? 'none' : 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'};"
>
  <!-- Header -->
  <div
    class="flex items-center justify-between p-2 bg-gradient-to-r from-teal-700 to-blue-900 text-white cursor-move shrink-0"
    on:mousedown={handleDragStart}
  >
    <div class="flex items-center gap-2">
      <img 
        src="/microphone-logo.svg" 
        alt="Structural Sage Logo" 
        class="w-5 h-5"
      />
      <h3 class="font-medium text-sm" style="font-family: 'Helvetica Neue', sans-serif;">STRUCTURAL SAGE</h3>
    </div>
    
    <div class="flex gap-1">
      <button
        on:click={toggleSettings}
        class="p-1 hover:bg-teal-600 rounded-lg transition-colors"
        title="Settings"
      >
        <span class="material-icons text-sm">settings</span>
      </button>
      <button
        on:click={toggleMinimize}
        class="p-1 hover:bg-teal-600 rounded-lg transition-colors md:block hidden"
        title={isMinimized ? 'Maximize' : 'Minimize'}
      >
        <span class="material-icons text-sm">
          {isMinimized ? 'expand_more' : 'expand_less'}
        </span>
      </button>
    </div>
  </div>

  <!-- Content -->
  {#if !isMinimized}
    <div class="flex flex-col flex-1 overflow-hidden">
      <div class="p-2 space-y-2 shrink-0">
        <div class="flex gap-2">
          <ModelSelector />
          <PersonaSelector />
        </div>
        
        <ActionButtons />
        
        {#if $settingsVisible}
          <Settings />
        {/if}
      </div>
      
      <div class="flex-1 min-h-0">
        <ChatWindow />
      </div>
    </div>
  {/if}
</div>

<style>
  :global(.material-icons) {
    font-size: 20px;
  }
</style>