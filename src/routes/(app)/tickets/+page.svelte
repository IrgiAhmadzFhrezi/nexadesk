<script lang="ts">
  import TicketCard from '$lib/components/TicketCard.svelte';

  let { data } = $props();
</script>

<svelte:head>
  <title>Tickets | NexaDesk</title>
</svelte:head>

<div class="space-y-6">

  <!-- Header -->
  <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
    <div>
      <h1 class="text-2xl font-bold tracking-tight text-gray-900">
        Tickets
      </h1>

      <p class="mt-1 text-sm text-gray-500">
        Manage and track support requests.
      </p>
    </div>

    <a
      href="/tickets/new"
      class="inline-flex w-fit items-center rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
    >
      + Create Ticket
    </a>
  </div>

  <!-- Tabs -->
  {#if data.view === 'my' || data.view === 'unassigned' || data.userRole === 'IT_SUPPORT' || data.userRole === 'ADMIN'}
    <div class="overflow-x-auto border-b border-gray-200">
      <nav class="flex min-w-max gap-6">

        <a
          href="/tickets"
          class={`border-b-2 pb-3 text-sm font-medium transition ${
            data.view !== 'my' && data.view !== 'unassigned'
              ? 'border-black text-gray-900'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          All Tickets
        </a>

        {#if data.userRole === 'IT_SUPPORT'}
          <a
            href="/tickets?view=my"
            class={`border-b-2 pb-3 text-sm font-medium transition ${
              data.view === 'my'
                ? 'border-black text-gray-900'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            My Assigned Tickets
          </a>
        {/if}

        {#if data.userRole === 'IT_SUPPORT' || data.userRole === 'ADMIN'}
          <a
            href="/tickets?view=unassigned"
            class={`border-b-2 pb-3 text-sm font-medium transition ${
              data.view === 'unassigned'
                ? 'border-black text-gray-900'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            Unassigned
          </a>
        {/if}

      </nav>
    </div>
  {/if}

  <!-- Filters -->
  <form method="GET" class="rounded-xl border border-gray-200 bg-white p-4">
    <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

      <!-- Search -->
      <div class="sm:col-span-2 lg:col-span-1">
        <label
          for="search"
          class="mb-1.5 block text-xs font-medium text-gray-600"
        >
          Search
        </label>

        <input
          id="search"
          type="text"
          name="search"
          value={data.search}
          placeholder="Search tickets..."
          class="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
        />
      </div>

      <!-- Status -->
      <div>
        <label
          for="status"
          class="mb-1.5 block text-xs font-medium text-gray-600"
        >
          Status
        </label>

        <select
          id="status"
          name="status"
          value={data.status}
          class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
        >
          <option value="">All Status</option>
          <option value="OPEN">Open</option>
          <option value="ASSIGNED">Assigned</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="WAITING_USER">Waiting User</option>
          <option value="RESOLVED">Resolved</option>
          <option value="CLOSED">Closed</option>
        </select>
      </div>

      <!-- Priority -->
      <div>
        <label
          for="priority"
          class="mb-1.5 block text-xs font-medium text-gray-600"
        >
          Priority
        </label>

        <select
          id="priority"
          name="priority"
          value={data.priority}
          class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
        >
          <option value="">All Priority</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
          <option value="URGENT">Urgent</option>
        </select>
      </div>

      <!-- Category -->
      <div>
        <label
          for="category"
          class="mb-1.5 block text-xs font-medium text-gray-600"
        >
          Category
        </label>

        <select
          id="category"
          name="category"
          value={data.category}
          class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
        >
          <option value="">All Category</option>

          {#each data.categories as item}
            <option value={item.id}>
              {item.name}
            </option>
          {/each}
        </select>
      </div>

    </div>

    <div class="mt-3 flex justify-end">
      <button
        type="submit"
        class="rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
      >
        Apply Filters
      </button>
    </div>
  </form>

  <!-- Ticket List -->
  <div class="space-y-4">

    {#if data.tickets.length === 0}
      <div class="rounded-xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
        <h2 class="text-sm font-semibold text-gray-900">
          No tickets found
        </h2>

        <p class="mt-1 text-sm text-gray-500">
          Try adjusting your search or filters.
        </p>
      </div>
    {:else}
      {#each data.tickets as ticket}
        <TicketCard {ticket} />
      {/each}
    {/if}

  </div>

</div>