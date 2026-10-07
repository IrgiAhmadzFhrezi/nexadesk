<script lang="ts">
  let { status } = $props();
</script>

{#if status === "OPEN"}
  <span class="badge open">OPEN</span>
{:else if status === "ASSIGNED"}
  <span class="badge assigned">ASSIGNED</span>
{:else if status === "IN_PROGRESS"}
  <span class="badge in-progress">IN PROGRESS</span>
{:else if status === "WAITING_USER"}
  <span class="badge waiting">WAITING USER</span>
{:else if status === "RESOLVED"}
  <span class="badge resolved">RESOLVED</span>
{:else if status === "CLOSED"}
  <span class="badge closed">CLOSED</span>
{:else}
  <span class="badge">{status}</span>
{/if}

<style>
  .badge {
    display: inline-block;
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
  }

  .open {
    background: #dcfce7;
    color: #166534;
  }

  .assigned {
    background: #dbeafe;
    color: #1e40af;
  }

  .in-progress {
    background: #fef3c7;
    color: #92400e;
  }

  .waiting {
    background: #ffedd5;
    color: #9a3412;
  }

  .resolved {
    background: #ede9fe;
    color: #6b21a8;
  }

  .closed {
    background: #e5e7eb;
    color: #374151;
  }
</style>