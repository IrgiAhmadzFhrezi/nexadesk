<script lang="ts">
  import StatusBadge from '$lib/components/StatusBadge.svelte';
  import PriorityBadge from '$lib/components/PriorityBadge.svelte';

  let { ticket } = $props();
</script>

<a
  href={`/tickets/${ticket.id}`}
  class="block rounded-xl border border-gray-200 bg-white p-5 transition hover:border-gray-300 hover:shadow-sm sm:p-6"
>
  <div class="space-y-5">

    <!-- Header -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

      <div class="min-w-0">
        <p class="text-xs font-medium text-gray-400">
          Ticket #{ticket.id}
        </p>

        <h2 class="mt-1 line-clamp-2 text-base font-semibold leading-6 text-gray-900 sm:text-lg">
          {ticket.title}
        </h2>
      </div>

      <div class="flex shrink-0 flex-wrap items-center gap-2">
        <StatusBadge status={ticket.status} />
        <PriorityBadge priority={ticket.priority} />
      </div>

    </div>

    <!-- Information -->
    <div class="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-gray-100 pt-5 sm:grid-cols-4">

      <!-- Requester -->
      <div class="min-w-0">
        <p class="text-xs font-medium uppercase tracking-wide text-gray-400">
          Requester
        </p>

        <p class="mt-1 truncate text-sm font-medium text-gray-700">
          {ticket.requester}
        </p>
      </div>

      <!-- Department -->
      <div class="min-w-0">
        <p class="text-xs font-medium uppercase tracking-wide text-gray-400">
          Department
        </p>

        <p class="mt-1 truncate text-sm font-medium text-gray-700">
          {ticket.department}
        </p>
      </div>

      <!-- Category -->
      <div class="min-w-0">
        <p class="text-xs font-medium uppercase tracking-wide text-gray-400">
          Category
        </p>

        <p class="mt-1 truncate text-sm font-medium text-gray-700">
          {ticket.category}
        </p>
      </div>

      <!-- Assigned -->
      <div class="min-w-0">
        <p class="text-xs font-medium uppercase tracking-wide text-gray-400">
          Assigned To
        </p>

        <p class="mt-1 truncate text-sm font-medium text-gray-700">
          {ticket.assignedTo ?? 'Unassigned'}
        </p>
      </div>

    </div>

  </div>
</a>