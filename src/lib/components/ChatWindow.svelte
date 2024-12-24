<script lang="ts">
  import { onMount } from 'svelte';
  import type { Message } from '../types';
  import MessageList from './MessageList.svelte';
  import ChatInput from './ChatInput.svelte';
  import { selectedModel } from '../stores/modelStore';
  import { selectedPersona } from '../stores/personaStore';
  
  let messages: Message[] = [];
  let selectedText = '';
  
  function handleMessageSend({ detail }: CustomEvent<{ message: string }>) {
    addMessage(detail.message);
  }
  
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
  
  function handleTextSelection(text: string) {
    selectedText = text;
    // Highlight action buttons based on content
    const isTaskList = text.includes('- [ ]') || text.includes('* [ ]');
    const isIdeaPile = text.toLowerCase().includes('idea:') || text.includes('💡');
    
    // Update UI to show relevant actions
    document.querySelectorAll('[data-action]').forEach(button => {
      const action = button.getAttribute('data-action');
      if (action === 'task' && isTaskList) {
        button.classList.add('bg-blue-100');
      } else if (action === 'idea' && isIdeaPile) {
        button.classList.add('bg-pink-100');
      } else {
        button.classList.remove('bg-blue-100', 'bg-pink-100');
      }
    });
  }
</script>

<div class="flex flex-col h-[600px] w-full bg-white rounded-lg shadow-lg">
  <MessageList {messages} onSelect={handleTextSelection} />
  <ChatInput on:send={handleMessageSend} />
</div>