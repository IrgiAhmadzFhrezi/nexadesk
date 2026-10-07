<script lang="ts">
  let { data, form } = $props();
</script>

<svelte:head>
  <title>Categories | NexaDesk</title>
</svelte:head>

<div class="space-y-6">

  <!-- Header -->
  <div>
    <h1 class="text-2xl font-bold tracking-tight text-gray-900">
      Categories
    </h1>

    <p class="mt-1 text-sm text-gray-500">
      Kelola kategori yang digunakan pada ticket.
    </p>
  </div>

  <!-- Add Category -->
  <div class="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">

    <div>
      <h2 class="text-base font-semibold text-gray-900">
        Tambah Category
      </h2>

      <p class="mt-1 text-sm text-gray-500">
        Tambahkan kategori baru untuk ticket.
      </p>
    </div>

    <form
      method="POST"
      action="?/create"
      class="mt-5 flex flex-col gap-3 sm:flex-row"
    >
      <input
        type="text"
        name="name"
        placeholder="Contoh: Hardware"
        required
        class="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black sm:flex-1"
      />

      <button
        type="submit"
        class="inline-flex items-center justify-center rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
      >
        Tambah Category
      </button>
    </form>

    {#if form?.error}
      <div
        class="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        role="alert"
      >
        {form.error}
      </div>
    {/if}

    {#if form?.success}
      <div
        class="mt-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
        role="status"
      >
        Kategori berhasil diproses.
      </div>
    {/if}

  </div>

  <!-- Categories -->
  <div class="overflow-hidden rounded-xl border border-gray-200 bg-white">

    <div class="border-b border-gray-200 px-5 py-4 sm:px-6">
      <div>
        <h2 class="text-base font-semibold text-gray-900">
          Daftar Categories
        </h2>

        <p class="mt-1 text-sm text-gray-500">
          {data.categories.length} kategori tersedia di NexaDesk.
        </p>
      </div>
    </div>

    <!-- Desktop -->
    <div class="hidden overflow-x-auto md:block">
      <table class="w-full text-left text-sm">

        <thead class="border-b border-gray-200 bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-xs font-medium uppercase tracking-wide text-gray-500">
              ID
            </th>

            <th class="px-6 py-3 text-xs font-medium uppercase tracking-wide text-gray-500">
              Category
            </th>

            <th class="px-6 py-3 text-right text-xs font-medium uppercase tracking-wide text-gray-500">
              Action
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-100">

          {#if data.categories.length === 0}

            <tr>
              <td colspan="3" class="px-6 py-12 text-center">
                <p class="text-sm font-medium text-gray-900">
                  No categories found
                </p>

                <p class="mt-1 text-sm text-gray-500">
                  Belum ada kategori yang tersedia.
                </p>
              </td>
            </tr>

          {:else}

            {#each data.categories as category}

              <tr class="transition hover:bg-gray-50">

                <td class="px-6 py-4 text-sm text-gray-500">
                  #{category.id}
                </td>

                <td class="px-6 py-4">
                  <span class="font-medium text-gray-900">
                    {category.name}
                  </span>
                </td>

                <td class="px-6 py-4">
                  <div class="flex justify-end gap-2">

                    <!-- Update -->
                    <form
                      method="POST"
                      action="?/update"
                      class="flex items-center gap-2"
                    >
                      <input
                        type="hidden"
                        name="id"
                        value={category.id}
                      />

                      <input
                        type="text"
                        name="name"
                        value={category.name}
                        required
                        class="w-40 rounded-lg border border-gray-300 px-3 py-1.5 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                      />

                      <button
                        type="submit"
                        class="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
                      >
                        Simpan
                      </button>
                    </form>

                    <!-- Delete -->
                    <form
                      method="POST"
                      action="?/delete"
                      onsubmit={() =>
                        confirm(`Hapus kategori "${category.name}"?`)
                      }
                    >
                      <input
                        type="hidden"
                        name="id"
                        value={category.id}
                      />

                      <button
                        type="submit"
                        class="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
                      >
                        Hapus
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

    <!-- Mobile -->
    <div class="divide-y divide-gray-100 md:hidden">

      {#if data.categories.length === 0}

        <div class="px-5 py-12 text-center">
          <p class="text-sm font-medium text-gray-900">
            No categories found
          </p>

          <p class="mt-1 text-sm text-gray-500">
            Belum ada kategori yang tersedia.
          </p>
        </div>

      {:else}

        {#each data.categories as category}

          <div class="p-5">

            <div class="flex items-start justify-between gap-4">

              <div class="min-w-0">
                <p class="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Category
                </p>

                <p class="mt-1 font-medium text-gray-900">
                  {category.name}
                </p>
              </div>

              <span class="shrink-0 text-xs font-medium text-gray-400">
                #{category.id}
              </span>

            </div>

            <div class="mt-4 border-t border-gray-100 pt-4">

              <!-- Update -->
              <form
                method="POST"
                action="?/update"
                class="space-y-3"
              >
                <input
                  type="hidden"
                  name="id"
                  value={category.id}
                />

                <div>
                  <label
                    for={`category-${category.id}`}
                    class="mb-1.5 block text-xs font-medium text-gray-500"
                  >
                    Nama Category
                  </label>

                  <input
                    id={`category-${category.id}`}
                    type="text"
                    name="name"
                    value={category.name}
                    required
                    class="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                  />
                </div>

                <div class="flex gap-2">

                  <button
                    type="submit"
                    class="flex-1 rounded-lg bg-black px-3 py-2.5 text-xs font-medium text-white transition hover:bg-gray-800"
                  >
                    Simpan Perubahan
                  </button>

                  <!-- Delete -->
                  <button
                    type="submit"
                    form={`delete-${category.id}`}
                    class="rounded-lg border border-red-200 px-3 py-2.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
                  >
                    Hapus
                  </button>

                </div>

              </form>

              <form
                id={`delete-${category.id}`}
                method="POST"
                action="?/delete"
                onsubmit={() =>
                  confirm(`Hapus kategori "${category.name}"?`)
                }
              >
                <input
                  type="hidden"
                  name="id"
                  value={category.id}
                />
              </form>

            </div>

          </div>

        {/each}

      {/if}

    </div>

  </div>

</div>