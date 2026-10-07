<script lang="ts">
  let { data } = $props();
</script>

<svelte:head>
  <title>Edit User | NexaDesk</title>
</svelte:head>

<div class="mx-auto max-w-3xl space-y-8">

  <!-- Header -->
  <div>
    <a
      href="/users"
      class="inline-flex items-center text-sm font-medium text-gray-500 transition hover:text-gray-900"
    >
      ← Back to Users
    </a>

    <div class="mt-5">
      <h1 class="text-2xl font-bold tracking-tight text-gray-900">
        Edit User
      </h1>

      <p class="mt-1.5 text-sm leading-6 text-gray-500">
        Ubah informasi dan akses pengguna NexaDesk.
      </p>
    </div>
  </div>

  <!-- Form -->
  <div class="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">

    <form method="POST" class="space-y-6">

      <!-- Name -->
      <div>
        <label
          for="name"
          class="block text-sm font-medium text-gray-900"
        >
          Nama
        </label>

        <p class="mt-1 text-xs text-gray-500">
          Nama lengkap pengguna.
        </p>

        <input
          id="name"
          name="name"
          type="text"
          value={data.user.name}
          required
          class="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
        />
      </div>

      <!-- Email -->
      <div>
        <label
          for="email"
          class="block text-sm font-medium text-gray-900"
        >
          Email
        </label>

        <p class="mt-1 text-xs text-gray-500">
          Email digunakan untuk login ke NexaDesk.
        </p>

        <input
          id="email"
          name="email"
          type="email"
          value={data.user.email}
          required
          class="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
        />
      </div>

      <!-- Role & Department -->
      <div class="grid gap-6 sm:grid-cols-2">

        <!-- Role -->
        <div>
          <label
            for="role"
            class="block text-sm font-medium text-gray-900"
          >
            Role
          </label>

          <p class="mt-1 text-xs text-gray-500">
            Menentukan akses pengguna.
          </p>

          <select
            id="role"
            name="role"
            value={data.user.role}
            class="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
          >
            <option value="EMPLOYEE">Employee</option>
            <option value="IT_SUPPORT">IT Support</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        <!-- Department -->
        <div>
          <label
            for="departmentId"
            class="block text-sm font-medium text-gray-900"
          >
            Department
          </label>

          <p class="mt-1 text-xs text-gray-500">
            Department pengguna.
          </p>

          <select
            id="departmentId"
            name="departmentId"
            value={data.user.departmentId}
            required
            class="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
          >
            {#each data.departments as department}
              <option value={department.id}>
                {department.name}
              </option>
            {/each}
          </select>
        </div>

      </div>

      <!-- Actions -->
      <div class="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">

        <a
          href="/users"
          class="inline-flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          Batal
        </a>

        <button
          type="submit"
          class="inline-flex items-center justify-center rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Simpan Perubahan
        </button>

      </div>

    </form>

  </div>

</div>