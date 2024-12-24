<script lang="ts">
  import { onMount } from 'svelte';
  import type { Message } from '../../types';
  import MessageList from './MessageList.svelte';
  import ChatInput from './ChatInput.svelte';
  
  let messages: Message[] = [];
  let selectedText = '';
  
  function handleMessageSend({ detail }: CustomEvent<{ message: string }>) {
    addMessage(detail.message);
  }
  
  function handleFileUpload({ detail }: CustomEvent<{ file: File }>) {
    addMessage(`File uploaded: ${detail.file.name}`, 'system');
  }
  
  function handleVoiceRecord({ detail }: CustomEvent<{ audio: Blob }>) {
    addMessage('Voice message recorded', 'system');
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
  }
</script>

<div class="flex flex-col h-full">
  <MessageList 
    {messages} 
    onSelect={handleTextSelection} 
  />
  <ChatInput 
    on:send={handleMessageSend}
    on:file={handleFileUpload}
    on:voice={handleVoiceRecord}
  />
</div>