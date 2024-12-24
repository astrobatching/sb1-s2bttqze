<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher<{
    send: { message: string };
  }>();
  
  let message = '';
  let isRecording = false;
  
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
  
  async function toggleRecording() {
    isRecording = !isRecording;
    if (isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        // Handle recording logic
      } catch (error) {
        console.error('Microphone access denied:', error);
        isRecording = false;
      }
    } else {
      // Stop recording logic
    }
  }
</script>

<div class="border-t p-4">
  <div class="flex gap-2">
    <div class="flex-1 flex gap-2 items-center">
      <textarea
        bind:value={message}
        on:keypress={handleKeyPress}
        placeholder="Type your message..."
        class="flex-1 resize-none border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="2"
      ></textarea>
      
      <button
        on:click={toggleRecording}
        class="p-2 rounded-full hover:bg-gray-100 {isRecording ? 'text-red-500' : 'text-gray-500'}"
        title="Voice input"
      >
        🎤
      </button>
      
      <label class="p-2 rounded-full hover:bg-gray-100 text-gray-500 cursor-pointer" title="Upload file">
        📎
        <input type="file" class="hidden" on:change={() => {}} />
      </label>
    </div>
    
    <button
      on:click={handleSend}
      class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
    >
      Send
    </button>
  </div>
</div>