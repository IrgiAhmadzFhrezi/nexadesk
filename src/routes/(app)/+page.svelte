<script lang="ts">
  let { data } = $props();

  function getStatusClass(status: string) {
    if (status === 'OPEN') return 'bg-blue-50 text-blue-700';
    if (status === 'ASSIGNED') return 'bg-purple-50 text-purple-700';
    if (status === 'IN_PROGRESS') return 'bg-yellow-50 text-yellow-700';
    if (status === 'WAITING_USER') return 'bg-orange-50 text-orange-700';
    if (status === 'RESOLVED') return 'bg-green-50 text-green-700';
    if (status === 'CLOSED') return 'bg-gray-100 text-gray-700';

    return 'bg-gray-100 text-gray-700';
  }

  function getStatusLabel(status: string) {
    if (status === 'IN_PROGRESS') return 'In Progress';
    if (status === 'WAITING_USER') return 'Waiting User';

    return status.charAt(0) + status.slice(1).toLowerCase();
  }

  function getPriorityClass(priority: string) {
    if (priority === 'LOW') return 'bg-gray-100 text-gray-700';
    if (priority === 'MEDIUM') return 'bg-blue-50 text-blue-700';
    if (priority === 'HIGH') return 'bg-orange-50 text-orange-700';
    if (priority === 'URGENT') return 'bg-red-50 text-red-700';

    return 'bg-gray-100 text-gray-700';
  }

  function getPriorityLabel(priority: string) {
    return priority.charAt(0) + priority.slice(1).toLowerCase();
  }

  function formatDate(date: string | Date) {
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  }
</script>

<svelte:head>
  <title>Dashboard | NexaDesk</title>
</svelte:head>

<div class="space-y-6">

  <!-- Dashboard Header -->
  <div>
    <h1 class="text-2xl font-bold text-gray-900">
      Dashboard
    </h1>

    <p class="mt-1 text-sm text-gray-500">
      Overview ticket NexaDesk
    </p>
  </div>

  <!-- Ticket Statistics -->
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">

    <!-- Open -->
    <div class="rounded-xl border border-gray-200 bg-white p-5">
      <p class="text-sm font-medium text-gray-500">
        Open
      </p>

      <p class="mt-3 text-3xl font-bold tracking-tight text-gray-900">
        {data.ticketStats.open}
      </p>

      <p class="mt-1 text-xs text-gray-400">
        Belum ditangani
      </p>
    </div>

    <!-- Assigned -->
    <div class="rounded-xl border border-gray-200 bg-white p-5">
      <p class="text-sm font-medium text-gray-500">
        Assigned
      </p>

      <p class="mt-3 text-3xl font-bold tracking-tight text-gray-900">
        {data.ticketStats.assigned}
      </p>

      <p class="mt-1 text-xs text-gray-400">
        Sudah ditugaskan
      </p>
    </div>

    <!-- In Progress -->
    <div class="rounded-xl border border-gray-200 bg-white p-5">
      <p class="text-sm font-medium text-gray-500">
        In Progress
      </p>

      <p class="mt-3 text-3xl font-bold tracking-tight text-gray-900">
        {data.ticketStats.inProgress}
      </p>

      <p class="mt-1 text-xs text-gray-400">
        Sedang ditangani
      </p>
    </div>

    <!-- Waiting User -->
    <div class="rounded-xl border border-gray-200 bg-white p-5">
      <p class="text-sm font-medium text-gray-500">
        Waiting User
      </p>

      <p class="mt-3 text-3xl font-bold tracking-tight text-gray-900">
        {data.ticketStats.waitingUser}
      </p>

      <p class="mt-1 text-xs text-gray-400">
        Menunggu respon
      </p>
    </div>

    <!-- Resolved -->
    <div class="rounded-xl border border-gray-200 bg-white p-5">
      <p class="text-sm font-medium text-gray-500">
        Resolved
      </p>

      <p class="mt-3 text-3xl font-bold tracking-tight text-gray-900">
        {data.ticketStats.resolved}
      </p>

      <p class="mt-1 text-xs text-gray-400">
        Sudah diselesaikan
      </p>
    </div>

    <!-- Closed -->
    <div class="rounded-xl border border-gray-200 bg-white p-5">
      <p class="text-sm font-medium text-gray-500">
        Closed
      </p>

      <p class="mt-3 text-3xl font-bold tracking-tight text-gray-900">
        {data.ticketStats.closed}
      </p>

      <p class="mt-1 text-xs text-gray-400">
        Sudah ditutup
      </p>
    </div>

  </div>

  <!-- Recent Tickets -->
  <section class="overflow-hidden rounded-xl border border-gray-200 bg-white">

    <div class="flex items-center justify-between border-b border-gray-200 px-5 py-4">

      <div>
        <h2 class="text-base font-semibold text-gray-900">
          Recent Tickets
        </h2>

        <p class="mt-1 text-sm text-gray-500">
          5 ticket terbaru
        </p>
      </div>

      <a
        href="/tickets"
        class="text-sm font-medium text-gray-500 transition hover:text-gray-900"
      >
        View all →
      </a>

    </div>

    <div class="divide-y divide-gray-200">

      {#if data.recentTickets.length === 0}

        <div class="px-5 py-10 text-center">
          <p class="text-sm text-gray-500">
            Belum ada ticket.
          </p>
        </div>

      {:else}

        {#each data.recentTickets as ticket}

          <a
            href={`/tickets/${ticket.id}`}
            class="flex items-center justify-between gap-6 px-5 py-4 transition hover:bg-gray-50"
          >

            <div class="min-w-0">

              <div class="flex items-center gap-2">

                <span class="shrink-0 text-sm font-medium text-gray-500">
                  #{ticket.id}
                </span>

                <h3 class="truncate text-sm font-medium text-gray-900">
                  {ticket.title}
                </h3>

              </div>

              <div class="mt-2 flex items-center gap-3 text-xs text-gray-400">

                <span>
                  {formatDate(ticket.createdAt)}
                </span>

                <span>•</span>

                <span
                  class={`rounded-full px-2.5 py-1 text-xs font-medium ${getPriorityClass(ticket.priority)}`}
                >
                  {getPriorityLabel(ticket.priority)}
                </span>

              </div>

            </div>

            <span
              class={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(ticket.status)}`}
            >
              {getStatusLabel(ticket.status)}
            </span>

          </a>

        {/each}

      {/if}

    </div>

  </section>

</div>
```
