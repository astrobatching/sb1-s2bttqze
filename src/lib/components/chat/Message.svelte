<script lang="ts">
  import { format } from 'date-fns';
  import type { Message } from '../../types';
  
  export let message: Message;
  
  $: messageClass = {
    user: 'bg-blue-500 text-white',
    system: 'bg-gray-200 text-gray-800',
    webhook: 'bg-purple-500 text-white'
  }[message.type];
</script>

<div class="flex flex-col {message.type === 'user' ? 'items-end' : 'items-start'}">
  <div class="max-w-[70%] rounded-lg p-2 select-text {messageClass}">
    <p class="text-sm whitespace-pre-wrap">{message.content}</p>
    <span class="text-xs opacity-75">
      {format(message.timestamp, 'HH:mm')} - {message.sender}
    </span>
  </div>
</div>