<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import VoiceRecorder from './VoiceRecorder.svelte';
  import FileUpload from './FileUpload.svelte';
  
  const dispatch = createEventDispatcher<{
    send: { message: string };
    file: { file: File };
    voice: { audio: Blob };
  }>();
  
  let message = '';
  
  function handleSend() {
    if (!message.trim()) return;
    dispatch('send', { message: message.trim() });
    message = '';
  }
  
  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  }
  
  function handleVoiceRecord(event: CustomEvent<{ audio: Blob }>) {
    dispatch('voice', event.detail);
  }
  
  function handleFileUpload(event: CustomEvent<{ file: File }>) {
    dispatch('file', event.detail);
  }
</script>

<div class="border-t p-2">
  <div class="flex gap-1">
    <div class="flex-1 flex gap-1 items-center">
      <textarea
        bind:value={message}
        on:keypress={handleKeyPress}
        placeholder="Type your message..."
        class="flex-1 resize-none border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="1"
      ></textarea>
      
      <VoiceRecorder on:record={handleVoiceRecord} />
      <FileUpload on:upload={handleFileUpload} />
    </div>
    
    <button
      on:click={handleSend}
      class="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-1"
    >
      <span class="material-icons text-sm">send</span>
      Send
    </button>
  </div>
</div>