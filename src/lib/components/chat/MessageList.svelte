<script lang="ts">
  import type { Message } from '../../types';
  import ContextMenu from './ContextMenu.svelte';
  import MessageComponent from './Message.svelte';
  
  export let messages: Message[] = [];
  export let onSelect: (text: string) => void;
  
  let contextMenu = {
    show: false,
    x: 0,
    y: 0
  };
  
  function handleContextMenu(event: MouseEvent) {
    event.preventDefault();
    const selection = window.getSelection()?.toString();
    if (selection) {
      contextMenu = {
        show: true,
        x: event.clientX,
        y: event.clientY
      };
      onSelect(selection);
    }
  }

  function handleAction(event: CustomEvent<{ type: string }>) {
    const selection = window.getSelection()?.toString() || '';
    switch (event.detail.type) {
      case 'task':
        // Handle task conversion
        break;
      case 'idea':
        // Handle idea saving
        break;
      case 'discord':
        // Handle Discord sharing
        break;
      case 'copy':
        navigator.clipboard.writeText(selection);
        break;
    }
  }
</script>

<div 
  class="flex-1 overflow-y-auto p-1 space-y-1" 
  on:contextmenu={handleContextMenu}
  on:click={() => (contextMenu.show = false)}
>
  {#each messages as message (message.id)}
    <MessageComponent {message} />
  {/each}
</div>

<ContextMenu 
  bind:show={contextMenu.show}
  x={contextMenu.x}
  y={contextMenu.y}
  on:action={handleAction}
/>