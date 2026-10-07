<script lang="ts">
  let { data, form } = $props();
</script>

<svelte:head>
  <title>Create Ticket | NexaDesk</title>
</svelte:head>

<div class="mx-auto max-w-3xl space-y-8">

  <!-- Header -->
  <div>
    <a
      href="/tickets"
      class="inline-flex items-center text-sm font-medium text-gray-500 transition hover:text-gray-900"
    >
      ← Back to Tickets
    </a>

    <div class="mt-5">
      <h1 class="text-2xl font-bold tracking-tight text-gray-900">
        Create Ticket
      </h1>

      <p class="mt-1.5 text-sm leading-6 text-gray-500">
        Describe the issue you're experiencing so IT Support can help you.
      </p>
    </div>
  </div>

  <!-- Form -->
  <div class="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">

    <form method="POST" class="space-y-6">

      {#if form?.error}
        <div
          class="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          role="alert"
        >
          {form.error}
        </div>
      {/if}

      <!-- Title -->
      <div>
        <label
          for="title"
          class="block text-sm font-medium text-gray-900"
        >
          Judul Masalah
        </label>

        <p class="mt-1 text-xs text-gray-500">
          Berikan judul singkat yang menjelaskan masalah.
        </p>

        <input
          id="title"
          name="title"
          type="text"
          required
          maxlength="200"
          placeholder="Contoh: Laptop tidak bisa menyala"
          class="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
        />
      </div>

      <!-- Description -->
      <div>
        <label
          for="description"
          class="block text-sm font-medium text-gray-900"
        >
          Deskripsi
        </label>

        <p class="mt-1 text-xs text-gray-500">
          Jelaskan masalah secara detail, termasuk apa yang terjadi dan kapan masalah mulai muncul.
        </p>

        <textarea
          id="description"
          name="description"
          required
          maxlength="1000"
          rows="7"
          placeholder="Jelaskan masalah yang kamu alami..."
          class="mt-2 w-full resize-y rounded-lg border border-gray-300 px-3 py-2.5 text-sm leading-6 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
        ></textarea>
      </div>

      <!-- Category & Priority -->
      <div class="grid gap-6 sm:grid-cols-2">

        <!-- Category -->
        <div>
          <label
            for="categoryId"
            class="block text-sm font-medium text-gray-900"
          >
            Category
          </label>

          <select
            id="categoryId"
            name="categoryId"
            required
            class="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
          >
            <option value="" disabled selected>
              Pilih category
            </option>

            {#each data.categories as category}
              <option value={category.id}>
                {category.name}
              </option>
            {/each}
          </select>
        </div>

        <!-- Priority -->
        <div>
          <label
            for="priority"
            class="block text-sm font-medium text-gray-900"
          >
            Priority
          </label>

          <select
            id="priority"
            name="priority"
            required
            class="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM" selected>Medium</option>
            <option value="HIGH">High</option>
            <option value="URGENT">Urgent</option>
          </select>
        </div>

      </div>

      <!-- Action -->
      <div class="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">

        <a
          href="/tickets"
          class="inline-flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          Batal
        </a>

        <button
          type="submit"
          class="inline-flex items-center justify-center rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Submit Ticket
        </button>

      </div>

    </form>

  </div>

</div>