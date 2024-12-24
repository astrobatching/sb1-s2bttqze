<script lang="ts">
  import { settings } from '../stores/settings';
  import { validateWebhook } from '../utils/webhook';
  import { validateJSON } from '../utils/validators';

  async function testWebhook() {
    const result = await validateWebhook($settings.webhookUrl);
    // Handle result
  }
</script>

<div class="space-y-3">
  <h4 class="font-semibold text-sm">Settings</h4>
  
  <!-- OpenWeb Configuration -->
  <div class="space-y-2">
    <h5 class="font-medium text-sm">OpenWeb Settings</h5>
    <label class="block text-sm">
      API Endpoint
      <input
        type="text"
        bind:value={$settings.openWeb.endpoint}
        class="w-full mt-1 px-2 py-1 border rounded text-sm"
        placeholder="https://api.openweb.example/v1"
      />
    </label>
    <label class="block text-sm">
      API Key
      <input
        type="password"
        bind:value={$settings.openWeb.apiKey}
        class="w-full mt-1 px-2 py-1 border rounded text-sm"
      />
    </label>
    <label class="block text-sm">
      Model
      <input
        type="text"
        bind:value={$settings.openWeb.model}
        class="w-full mt-1 px-2 py-1 border rounded text-sm"
        placeholder="default"
      />
    </label>
  </div>

  <!-- Webhook Configuration -->
  <div class="space-y-2">
    <h5 class="font-medium text-sm">Webhook Settings</h5>
    <label class="block text-sm">
      Webhook URL
      <input
        type="text"
        bind:value={$settings.webhookUrl}
        class="w-full mt-1 px-2 py-1 border rounded text-sm"
      />
    </label>
    <button
      on:click={testWebhook}
      class="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
    >
      Test Webhook
    </button>
  </div>

  <!-- Coda API Configuration -->
  <div class="space-y-2">
    <h5 class="font-medium text-sm">Coda Settings</h5>
    <label class="block text-sm">
      Coda API Key
      <input
        type="password"
        bind:value={$settings.codaApiKey}
        class="w-full mt-1 px-2 py-1 border rounded text-sm"
      />
    </label>
  </div>

  <!-- Discord Webhook -->
  <div class="space-y-2">
    <h5 class="font-medium text-sm">Discord Settings</h5>
    <label class="block text-sm">
      Discord Webhook URL
      <input
        type="text"
        bind:value={$settings.discordWebhook}
        class="w-full mt-1 px-2 py-1 border rounded text-sm"
      />
    </label>
  </div>
</div>