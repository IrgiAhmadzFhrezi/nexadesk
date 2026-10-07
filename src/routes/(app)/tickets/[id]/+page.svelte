<script lang="ts">
  import StatusBadge from '$lib/components/StatusBadge.svelte';
  import PriorityBadge from '$lib/components/PriorityBadge.svelte';

  let { data, form } = $props();

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
  <title>Ticket #{data.ticket.id} | NexaDesk</title>
</svelte:head>

<div class="space-y-6">

  <!-- Header -->
<div class="border-b border-gray-200 pb-6">

    <!-- Back -->
    <a
      href="/tickets"
      class="inline-flex items-center text-sm font-medium text-gray-500 transition hover:text-gray-900"
    >
      ← Back to Tickets
    </a>


    <!-- Ticket Header -->
    <div class="mt-5 flex items-start justify-between gap-6">

      <!-- Left -->
      <div class="min-w-0">

        <!-- Ticket Meta -->
        <div class="flex flex-wrap items-center gap-2 text-sm text-gray-500">

          <span class="font-medium text-gray-900">
            #{data.ticket.id}
          </span>

          <span>•</span>

          <span>
            {data.ticket.category}
          </span>

          <span>•</span>

          <span>
            {data.ticket.department}
          </span>

        </div>


        <!-- Title -->
        <h1 class="mt-2 text-2xl font-bold tracking-tight text-gray-900">
          {data.ticket.title}
        </h1>


        <!-- Requester -->
        <p class="mt-2 text-sm text-gray-500">
          Submitted by
          <span class="font-medium text-gray-700">
            {data.ticket.requester}
          </span>
        </p>

      </div>


      <!-- Status -->
      <div class="shrink-0">
        <StatusBadge status={data.ticket.status} />
      </div>

    </div>

  </div>


  <!-- Main Content -->
  <div class="grid gap-6 lg:grid-cols-3">

    <!-- Left Column -->
    <div class="space-y-6 lg:col-span-2">

      <!-- Description -->
      <section class="rounded-xl border border-gray-200 bg-white p-6">

        <h2 class="text-base font-semibold text-gray-900">
          Description
        </h2>

        <div class="mt-4 rounded-lg bg-gray-50 p-4">
          <p class="whitespace-pre-wrap text-sm leading-7 text-gray-700">
            {data.ticket.description}
          </p>
        </div>

      </section>


      <!-- Solution -->
    {#if data.ticket.solution}
      <section class="rounded-xl border border-green-200 bg-white p-6">

        <div class="flex items-start justify-between gap-4">

          <div>
            <h2 class="text-base font-semibold text-gray-900">
              Solution
            </h2>

            <p class="mt-1 text-sm text-gray-500">
              Resolution provided by IT Support.
            </p>
          </div>

          <span
            class="shrink-0 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700"
          >
            Resolved
          </span>

        </div>

        <div class="mt-5 rounded-lg bg-green-50/50 p-4">

          <p class="whitespace-pre-wrap text-sm leading-7 text-gray-700">
            {data.ticket.solution}
          </p>

        </div>

      </section>
    {/if}


      <!-- Actions -->
      <section class="rounded-xl border border-gray-200 bg-white p-6">

        <div>
          <h2 class="text-base font-semibold text-gray-900">
            Actions
          </h2>

          <p class="mt-1 text-sm text-gray-500">
            Manage the ticket based on its current status.
          </p>
        </div>


        {#if form?.statusError}
          <div class="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {form.statusError}
          </div>
        {/if}


        <!-- OPEN -->
        {#if data.ticket.status === "OPEN"}

          {#if data.userRole === "ADMIN"}

            <div class="mt-6 rounded-lg bg-gray-50 p-4">

              <p class="text-sm font-medium text-gray-900">
                Assign this ticket
              </p>

              <p class="mt-1 text-sm text-gray-500">
                Choose an IT Support member to handle this ticket.
              </p>

              <form method="POST" action="?/status" class="mt-4 space-y-3">

                <div>
                  <label
                    for="assignedTo"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Assign To
                  </label>

                  <select
                    id="assignedTo"
                    name="assignedTo"
                    required
                    class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-gray-500 focus:ring-1 focus:ring-gray-300"
                  >
                    {#each data.supportUsers as support}
                      <option value={support.id}>
                        {support.name}
                      </option>
                    {/each}
                  </select>
                </div>

                <button
                  type="submit"
                  name="status"
                  value="ASSIGNED"
                  class="rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                  Assign Ticket
                </button>

              </form>

            </div>

          {:else if data.userRole === "IT_SUPPORT"}

            <div class="mt-6 rounded-lg bg-gray-50 p-4">

              <p class="text-sm font-medium text-gray-900">
                This ticket is available
              </p>

              <p class="mt-1 text-sm text-gray-500">
                Take this ticket to start handling the issue.
              </p>

              <form method="POST" action="?/status" class="mt-4">

                <input
                  type="hidden"
                  name="assignedTo"
                  value={data.userId}
                />

                <button
                  type="submit"
                  name="status"
                  value="ASSIGNED"
                  class="rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                  Take Ticket
                </button>

              </form>

            </div>

          {/if}


        <!-- ASSIGNED -->
        {:else if data.ticket.status === "ASSIGNED"}

          {#if data.canStartProgress}

            <div class="mt-6 rounded-lg bg-gray-50 p-4">

              <p class="text-sm font-medium text-gray-900">
                Ticket assigned to you
              </p>

              <p class="mt-1 text-sm text-gray-500">
                Start working on this ticket when you're ready.
              </p>

              <form method="POST" action="?/status" class="mt-4">

                <button
                  type="submit"
                  name="status"
                  value="IN_PROGRESS"
                  class="rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                  Start Progress
                </button>

              </form>

            </div>

          {:else}

            <div class="mt-6 rounded-lg bg-gray-50 p-4">
              <p class="text-sm text-gray-500">
                Ticket sedang ditugaskan kepada IT Support.
              </p>
            </div>

          {/if}


        <!-- IN PROGRESS -->
        {:else if data.ticket.status === "IN_PROGRESS"}

          {#if data.canManageTicket}

            <div class="mt-6 space-y-6">

              <!-- Waiting User -->
              <div class="rounded-lg border border-gray-200 p-4">

                <p class="text-sm font-medium text-gray-900">
                  Waiting for User
                </p>

                <p class="mt-1 text-sm text-gray-500">
                  Use this when you need additional information or confirmation from the requester.
                </p>

                <form method="POST" action="?/status" class="mt-4">

                  <button
                    type="submit"
                    name="status"
                    value="WAITING_USER"
                    class="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                  >
                    Waiting for User
                  </button>

                </form>

              </div>


              <!-- Resolve -->
              <div class="rounded-lg border border-gray-200 p-4">

                <p class="text-sm font-medium text-gray-900">
                  Resolve Ticket
                </p>

                <p class="mt-1 text-sm text-gray-500">
                  Describe the solution before marking this ticket as resolved.
                </p>

                <form method="POST" action="?/status" class="mt-4 space-y-3">

                  <div>
                    <label
                      for="solution"
                      class="mb-1.5 block text-sm font-medium text-gray-700"
                    >
                      Solution
                    </label>

                    <textarea
                      id="solution"
                      name="solution"
                      placeholder="Jelaskan solusi yang diberikan..."
                      required
                      rows="5"
                      class="w-full rounded-lg border border-gray-300 p-3 text-sm leading-6 outline-none transition focus:border-gray-500 focus:ring-1 focus:ring-gray-300"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    name="status"
                    value="RESOLVED"
                    class="rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-green-700"
                  >
                    Resolve Ticket
                  </button>

                </form>

              </div>

            </div>

          {:else}

            <div class="mt-6 rounded-lg bg-gray-50 p-4">
              <p class="text-sm text-gray-500">
                Anda bukan IT Support yang ditugaskan pada ticket ini.
              </p>
            </div>

          {/if}


        <!-- WAITING USER -->
        {:else if data.ticket.status === "WAITING_USER"}

          {#if data.canManageTicket}

            <div class="mt-6 rounded-lg bg-gray-50 p-4">

              <p class="text-sm font-medium text-gray-900">
                Waiting for requester
              </p>

              <p class="mt-1 text-sm text-gray-500">
                Continue the ticket when the requester has provided the required information.
              </p>

              <form method="POST" action="?/status" class="mt-4">

                <button
                  type="submit"
                  name="status"
                  value="IN_PROGRESS"
                  class="rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                  Back to Progress
                </button>

              </form>

            </div>

          {/if}


        <!-- RESOLVED -->
        {:else if data.ticket.status === "RESOLVED"}

          {#if data.canCloseTicket}

            <div class="mt-6 rounded-lg bg-green-50 p-4">

              <p class="text-sm font-medium text-green-900">
                Ticket resolved
              </p>

              <p class="mt-1 text-sm text-green-700">
                Please confirm that the issue has been resolved.
              </p>

              <form method="POST" action="?/status" class="mt-4">

                <button
                  type="submit"
                  name="status"
                  value="CLOSED"
                  class="rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-green-700"
                >
                  Close Ticket
                </button>

              </form>

            </div>

          {:else}

            <div class="mt-6 rounded-lg bg-green-50 p-4">

              <p class="text-sm font-medium text-green-900">
                Ticket resolved
              </p>

              <p class="mt-1 text-sm text-green-700">
                Ticket telah diselesaikan dan menunggu konfirmasi requester.
              </p>

            </div>

          {/if}


        <!-- CLOSED -->
        {:else if data.ticket.status === "CLOSED"}

          <div class="mt-6 rounded-lg bg-gray-50 p-4">

            <p class="text-sm font-medium text-gray-900">
              Ticket closed
            </p>

            <p class="mt-1 text-sm text-gray-500">
              Ticket sudah ditutup dan tidak dapat diproses kembali.
            </p>

          </div>

        {/if}

      </section>


      <!-- Comments -->

  <section class="rounded-xl border border-gray-200 bg-white p-6">

  <!-- Header -->
  <div>
    <h2 class="text-base font-semibold text-gray-900">
      Comments
    </h2>

    <p class="mt-1 text-sm text-gray-500">
      Discussion and communication about this ticket.
    </p>
  </div>


  <!-- Comment List -->
  {#if data.comments.length === 0}

    <div class="mt-6 rounded-lg bg-gray-50 p-5 text-center">
      <p class="text-sm text-gray-500">
        Belum ada komentar.
      </p>
    </div>

  {:else}

    <div class="mt-6 space-y-5">

      {#each data.comments as comment}

        <div class="flex gap-3">

          <!-- Avatar -->
          <div
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-600"
          >
            {comment.user.slice(0, 1).toUpperCase()}
          </div>


          <!-- Comment -->
          <div class="min-w-0 flex-1">

            <div class="flex flex-wrap items-baseline gap-x-2 gap-y-1">

              <strong class="text-sm font-semibold text-gray-900">
                {comment.user}
              </strong>

              <span class="text-xs text-gray-400">
                {comment.createdAt.toLocaleString('id-ID', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>

            </div>


            <div class="mt-2 rounded-lg bg-gray-50 px-4 py-3">

              <p class="whitespace-pre-wrap text-sm leading-6 text-gray-700">
                {comment.comment}
              </p>

            </div>

          </div>

        </div>

      {/each}

    </div>

  {/if}


  <!-- Add Comment -->
  <div class="mt-7 border-t border-gray-100 pt-6">

    <h3 class="text-sm font-semibold text-gray-900">
      Add Comment
    </h3>

    <p class="mt-1 text-sm text-gray-500">
      Add information or communicate with other users involved in this ticket.
    </p>


    <form method="POST" action="?/comment" class="mt-4">

      <textarea
        name="comment"
        placeholder="Tulis komentar..."
        required
        rows="4"
        class="w-full rounded-lg border border-gray-300 p-3 text-sm leading-6 outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-300"
      ></textarea>


      {#if form?.commentError}
        <p class="mt-2 text-sm text-red-600">
          {form.commentError}
        </p>
      {/if}


      <div class="mt-3 flex justify-end">

        <button
          type="submit"
          class="rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Send Comment
        </button>

      </div>

    </form>

  </div>

  </section>
    </div>

    <!-- Right Column -->
  <aside class="h-fit rounded-xl border border-gray-200 bg-white p-6">

    <h2 class="text-base font-semibold text-gray-900">
      Ticket Information
    </h2>

    <div class="mt-6 divide-y divide-gray-100">

      <!-- Priority -->
      <div class="pb-5">
        <p class="text-xs font-medium uppercase tracking-wide text-gray-500">
          Priority
        </p>

        <div class="mt-2">
          <PriorityBadge priority={data.ticket.priority} />
        </div>
      </div>

      <!-- Created -->
      <div class="py-5">
        <p class="text-xs font-medium uppercase tracking-wide text-gray-500">
          Created
        </p>

        <p class="mt-2 text-sm font-medium text-gray-900">
          {formatDate(data.ticket.createdAt)}
        </p>
      </div>


      <!-- Requester -->
      <div class="py-5">
        <p class="text-xs font-medium uppercase tracking-wide text-gray-500">
          Requester
        </p>

        <p class="mt-2 text-sm font-medium text-gray-900">
          {data.ticket.requester}
        </p>
      </div>


      <!-- Assigned To -->
      <div class="py-5">
        <p class="text-xs font-medium uppercase tracking-wide text-gray-500">
          Assigned To
        </p>

        <p class="mt-2 text-sm font-medium text-gray-900">
          {data.ticket.assignedTo ?? "Belum ditugaskan"}
        </p>
      </div>


      <!-- Department -->
      <div class="py-5">
        <p class="text-xs font-medium uppercase tracking-wide text-gray-500">
          Department
        </p>

        <p class="mt-2 text-sm font-medium text-gray-900">
          {data.ticket.department}
        </p>
      </div>


      <!-- Category -->
      <div class="pt-5">
        <p class="text-xs font-medium uppercase tracking-wide text-gray-500">
          Category
        </p>

        <p class="mt-2 text-sm font-medium text-gray-900">
          {data.ticket.category}
        </p>
      </div>

    </div>

  </aside>
  </div>

  <!-- Activity History -->
  <section class="rounded-xl border border-gray-200 bg-white p-6">

    <!-- Header -->
    <div>
      <h2 class="text-base font-semibold text-gray-900">
        Activity History
      </h2>

      <p class="mt-1 text-sm text-gray-500">
        Track changes and actions performed on this ticket.
      </p>
    </div>

    {#if data.activities.length === 0}

      <div class="mt-6 rounded-lg bg-gray-50 p-5 text-center">
        <p class="text-sm text-gray-500">
          Belum ada aktivitas.
        </p>
      </div>

    {:else}

      <div class="relative mt-7 ml-1">

        {#each data.activities as activity, index}

          <div class="relative flex gap-4">

            <!-- Timeline Line -->
            {#if index < data.activities.length - 1}
              <div
                class="absolute left-1.5 top-3 h-full w-px bg-gray-200"
              ></div>
            {/if}

            <!-- Timeline Dot -->
            <div
              class="relative z-10 mt-1 h-3 w-3 shrink-0 rounded-full border-2 border-white bg-gray-400 ring-1 ring-gray-200"
            ></div>

            <!-- Activity Content -->
            <div class="min-w-0 pb-7">

              <div class="flex flex-wrap items-baseline gap-x-2 gap-y-1">

                <strong class="text-sm font-semibold text-gray-900">
                  {activity.user}
                </strong>

                <span class="text-xs text-gray-400">
                  {activity.createdAt.toLocaleString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>

              </div>

              <p class="mt-1 text-sm leading-6 text-gray-600">
                {activity.action}
              </p>

            </div>
          </div>
        {/each}

      </div>

    {/if}

  </section>
</div>