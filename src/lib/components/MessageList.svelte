<script lang="ts">
  import { format } from 'date-fns';
  import type { Message } from '../types';
  
  export let messages: Message[] = [];
  export let onSelect: (text: string) => void = () => {};
  
  function handleSelection() {
    const selection = window.getSelection()?.toString();
    if (selection) {
      onSelect(selection);
    }
  }
</script>

<div class="flex-1 overflow-y-auto p-4 space-y-4" on:mouseup={handleSelection}>
  {#each messages as message (message.id)}
    <div class="flex flex-col {message.type === 'user' ? 'items-end' : 'items-start'}">
      <div class="max-w-[70%] rounded-lg p-3 {message.type === 'user' ? 'bg-blue-500 text-white' : message.type === 'webhook' ? 'bg-purple-500 text-white' : 'bg-gray-200'}">
        <p class="text-sm">{message.content}</p>
        <span class="text-xs opacity-75">
          {format(message.timestamp, 'HH:mm')} - {message.sender}
        </span>
      </div>
    </div>
  {/each}
</div>