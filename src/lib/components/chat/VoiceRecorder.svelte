<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher<{
    record: { audio: Blob };
  }>();
  
  let isRecording = false;
  let mediaRecorder: MediaRecorder | null = null;
  let audioChunks: BlobPart[] = [];
  
  async function toggleRecording() {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        
        mediaRecorder.ondataavailable = (event) => {
          audioChunks.push(event.data);
        };
        
        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
          dispatch('record', { audio: audioBlob });
          audioChunks = [];
        };
        
        mediaRecorder.start();
        isRecording = true;
      } catch (error) {
        console.error('Microphone access denied:', error);
      }
    } else {
      mediaRecorder?.stop();
      isRecording = false;
    }
  }
</script>

<button
  on:click={toggleRecording}
  class="p-2 rounded-full hover:bg-gray-100 transition-colors"
  class:text-red-500={isRecording}
  class:text-gray-500={!isRecording}
  title="Voice input"
>
  <span class="material-icons">
    {isRecording ? 'mic' : 'mic_none'}
  </span>
</button>