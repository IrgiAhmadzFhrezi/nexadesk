<script lang="ts">
  let { priority } = $props();
</script>

{#if priority === "LOW"}
    <span class="badge low">🟢 LOW</span>
{:else if priority === "MEDIUM"}
    <span class="badge medium">🟡 MEDIUM</span>
{:else if priority === "HIGH"}
    <span class="badge high">🔴 HIGH</span>
{:else if priority === "URGENT"}
    <span class="badge urgent">🚨 URGENT</span>
{:else}
    <span class="badge">{priority}</span>
{/if}

<style>
  .badge {
    display: inline-block;
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
  }

  .low {
    background: #d1fae5;
    color: #065f46;
  }

  .medium {
    background: #fef3c7;
    color: #78350f;
  }

  .high {
    background: #fee2e2;
    color: #991b1b;
  }

  .urgent {
    background: #fef2f2;
    color: #b91c1c;
  }

  </style>