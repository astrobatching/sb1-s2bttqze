<script lang="ts">
  import { onMount } from 'svelte';
  import { format } from 'date-fns';
  import type { Message, WebhookConfig } from './types';

  let messages: Message[] = [];
  let newMessage = '';
  let webhookConfig: WebhookConfig = {
    url: '',
    method: 'POST',
    headers: {}
  };

  function addMessage(content: string, type: 'user' | 'system' | 'webhook' = 'user') {
    const message: Message = {
      id: crypto.randomUUID(),
      content,
      timestamp: new Date(),
      sender: type === 'user' ? 'You' : 'System',
      type
    };
    messages = [...messages, message];
  }

  async function sendMessage() {
    if (!newMessage.trim()) return;
    
    addMessage(newMessage);
    
    if (webhookConfig.url) {
      try {
        const response = await fetch(webhookConfig.url, {
          method: webhookConfig.method,
          headers: {
            'Content-Type': 'application/json',
            ...webhookConfig.headers
          },
          body: JSON.stringify({
            message: newMessage,
            timestamp: new Date().toISOString()
          })
        });
        
        if (!response.ok) {
          throw new Error('Webhook request failed');
        }
        
        const data = await response.json();
        addMessage(`Webhook response: ${JSON.stringify(data)}`, 'webhook');
      } catch (error) {
        addMessage(`Error: ${error.message}`, 'system');
      }
    }
    
    newMessage = '';
  }

  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }
</script>

<div class="flex flex-col h-[600px] w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
  <div class="flex-1 overflow-y-auto p-4 space-y-4">
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
  
  <div class="border-t p-4">
    <div class="flex gap-2">
      <textarea
        bind:value={newMessage}
        on:keypress={handleKeyPress}
        placeholder="Type your message..."
        class="flex-1 resize-none border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="2"
      ></textarea>
      <button
        on:click={sendMessage}
        class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Send
      </button>
    </div>
    
    <div class="mt-4">
      <input
        bind:value={webhookConfig.url}
        placeholder="Webhook URL"
        class="w-full p-2 border rounded-lg mb-2"
      />
      <select
        bind:value={webhookConfig.method}
        class="w-full p-2 border rounded-lg"
      >
        <option value="GET">GET</option>
        <option value="POST">POST</option>
      </select>
    </div>
  </div>
</div>