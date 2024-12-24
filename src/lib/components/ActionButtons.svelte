<script lang="ts">
  import { settings } from '../stores/settings';
  import { copyToClipboard } from '../utils/clipboard';
  import { exportToDiscord } from '../utils/discord';
  import { generateTasks } from '../utils/tasks';
  import { downloadJSON } from '../utils/export';

  let selectedAction: string | null = null;
  
  async function handleCopy() {
    const success = await copyToClipboard(window.getSelection()?.toString() || '');
    if (!success) {
      console.error('Failed to copy text');
    }
  }

  async function handleExport() {
    const success = await exportToDiscord();
    if (!success) {
      console.error('Failed to export to Discord');
    }
  }

  async function handleGenerateTasks() {
    const tasks = await generateTasks();
    console.log('Generated tasks:', tasks);
  }

  function handleExportFormat(format: 'json') {
    const text = window.getSelection()?.toString() || '';
    if (format === 'json') {
      downloadJSON(text, 'export.json');
    }
  }
</script>

<div class="flex flex-wrap gap-2 p-2 bg-gray-50 rounded-lg">
  <button
    data-action="copy"
    on:click={handleCopy}
    class="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center gap-2 transition-colors"
  >
    <span class="material-icons text-gray-600">content_copy</span>
    Copy
  </button>
  
  <button
    data-action="discord"
    on:click={handleExport}
    disabled={!$settings.discordWebhook}
    class="px-4 py-2 bg-indigo-100 hover:bg-indigo-200 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
  >
    <span class="material-icons text-indigo-600">share</span>
    Discord
  </button>
  
  <button
    data-action="task"
    on:click={handleGenerateTasks}
    class="px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg flex items-center gap-2 transition-colors"
  >
    <span class="material-icons text-blue-600">task_alt</span>
    Tasks
  </button>
  
  <button
    data-action="idea"
    on:click={() => handleExportFormat('json')}
    class="px-4 py-2 bg-pink-100 hover:bg-pink-200 rounded-lg flex items-center gap-2 transition-colors"
  >
    <span class="material-icons text-pink-600">lightbulb</span>
    Ideas
  </button>
</div>