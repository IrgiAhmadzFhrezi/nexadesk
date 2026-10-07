<script lang="ts">
  let { data, form } = $props();

  function getRoleClass(role: string) {
    if (role === 'ADMIN') {
      return 'bg-purple-50 text-purple-700';
    }

    if (role === 'IT_SUPPORT') {
      return 'bg-blue-50 text-blue-700';
    }

    return 'bg-gray-100 text-gray-700';
  }

  function getRoleLabel(role: string) {
    if (role === 'IT_SUPPORT') {
      return 'IT Support';
    }

    if (role === 'ADMIN') {
      return 'Admin';
    }

    return 'Employee';
  }
</script>

<svelte:head>
  <title>Users | NexaDesk</title>
</svelte:head>

<div class="space-y-6">

  <!-- Header -->
  <div>
    <h1 class="text-2xl font-bold tracking-tight text-gray-900">
      Users
    </h1>

    <p class="mt-1 text-sm text-gray-500">
      Kelola pengguna dan akses NexaDesk.
    </p>
  </div>

  <!-- Error -->
  {#if form?.error}
    <div
      class="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
      role="alert"
    >
      {form.error}
    </div>
  {/if}

  <!-- Users -->
  <div class="overflow-hidden rounded-xl border border-gray-200 bg-white">

    <!-- Section Header -->
    <div class="border-b border-gray-200 px-5 py-4 sm:px-6">
      <div class="flex items-center justify-between gap-4">
        <div>
          <h2 class="text-base font-semibold text-gray-900">
            Daftar Users
          </h2>

          <p class="mt-1 text-sm text-gray-500">
            {data.users.length} user terdaftar di NexaDesk.
          </p>
        </div>
      </div>
    </div>

    <!-- Desktop Table -->
    <div class="hidden overflow-x-auto md:block">
      <table class="w-full text-left text-sm">
        <thead class="border-b border-gray-200 bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-xs font-medium uppercase tracking-wide text-gray-500">
              User
            </th>

            <th class="px-6 py-3 text-xs font-medium uppercase tracking-wide text-gray-500">
              Department
            </th>

            <th class="px-6 py-3 text-xs font-medium uppercase tracking-wide text-gray-500">
              Role
            </th>

            <th class="px-6 py-3 text-right text-xs font-medium uppercase tracking-wide text-gray-500">
              Action
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-100">

          {#if data.users.length === 0}
            <tr>
              <td
                colspan="4"
                class="px-6 py-12 text-center"
              >
                <p class="text-sm font-medium text-gray-900">
                  No users found
                </p>

                <p class="mt-1 text-sm text-gray-500">
                  Belum ada user yang terdaftar.
                </p>
              </td>
            </tr>
          {:else}

            {#each data.users as user}
              <tr class="transition hover:bg-gray-50">

                <!-- User -->
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">

                    <div
                      class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-600"
                    >
                      {user.name.charAt(0).toUpperCase()}
                    </div>

                    <div class="min-w-0">
                      <p class="truncate font-medium text-gray-900">
                        {user.name}
                      </p>

                      <p class="truncate text-xs text-gray-500">
                        {user.email}
                      </p>
                    </div>

                  </div>
                </td>

                <!-- Department -->
                <td class="px-6 py-4 text-sm text-gray-600">
                  {user.department}
                </td>

                <!-- Role -->
                <td class="px-6 py-4">
                  <span
                    class={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getRoleClass(user.role)}`}
                  >
                    {getRoleLabel(user.role)}
                  </span>
                </td>

                <!-- Actions -->
                <td class="px-6 py-4">
                  <div class="flex justify-end gap-2">

                    <a
                      href={`/users/${user.id}/edit`}
                      class="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                      Edit
                    </a>

                    <form
                      method="POST"
                      action="?/delete"
                      onsubmit={() => confirm('Yakin ingin menghapus user ini?')}
                    >
                      <input
                        type="hidden"
                        name="userId"
                        value={user.id}
                      />

                      <button
                        type="submit"
                        class="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </form>

                  </div>
                </td>

              </tr>
            {/each}

          {/if}

        </tbody>
      </table>
    </div>

    <!-- Mobile Cards -->
    <div class="divide-y divide-gray-100 md:hidden">

      {#if data.users.length === 0}

        <div class="px-5 py-12 text-center">
          <p class="text-sm font-medium text-gray-900">
            No users found
          </p>

          <p class="mt-1 text-sm text-gray-500">
            Belum ada user yang terdaftar.
          </p>
        </div>

      {:else}

        {#each data.users as user}
          <div class="p-5">

            <!-- User -->
            <div class="flex items-start justify-between gap-4">

              <div class="flex min-w-0 items-center gap-3">

                <div
                  class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-600"
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>

                <div class="min-w-0">
                  <p class="truncate font-medium text-gray-900">
                    {user.name}
                  </p>

                  <p class="truncate text-sm text-gray-500">
                    {user.email}
                  </p>
                </div>

              </div>

              <span
                class={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${getRoleClass(user.role)}`}
              >
                {getRoleLabel(user.role)}
              </span>

            </div>

            <!-- Details -->
            <div class="mt-4 grid grid-cols-2 gap-4 border-t border-gray-100 pt-4">

              <div>
                <p class="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Department
                </p>

                <p class="mt-1 text-sm font-medium text-gray-700">
                  {user.department}
                </p>
              </div>

              <div>
                <p class="text-xs font-medium uppercase tracking-wide text-gray-400">
                  User ID
                </p>

                <p class="mt-1 text-sm font-medium text-gray-700">
                  #{user.id}
                </p>
              </div>

            </div>

            <!-- Actions -->
            <div class="mt-4 flex gap-2">

              <a
                href={`/users/${user.id}/edit`}
                class="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-center text-xs font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Edit
              </a>

              <form
                method="POST"
                action="?/delete"
                class="flex-1"
                onsubmit={() => confirm('Yakin ingin menghapus user ini?')}
              >
                <input
                  type="hidden"
                  name="userId"
                  value={user.id}
                />

                <button
                  type="submit"
                  class="w-full rounded-lg border border-red-200 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50"
                >
                  Delete
                </button>
              </form>

            </div>

          </div>
        {/each}

      {/if}

    </div>

  </div>

</div>