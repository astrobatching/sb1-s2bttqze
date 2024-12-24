<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher<{
    upload: { file: File };
  }>();
  
  function handleFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    
    if (file) {
      dispatch('upload', { file });
      input.value = ''; // Reset input
    }
  }
</script>

<label 
  class="p-2 rounded-full hover:bg-gray-100 text-gray-500 cursor-pointer transition-colors"
  title="Upload file"
>
  <span class="material-icons">attach_file</span>
  <input 
    type="file" 
    class="hidden" 
    on:change={handleFileSelect}
    accept="image/*,.pdf,.doc,.docx,.txt"
  />
</label>