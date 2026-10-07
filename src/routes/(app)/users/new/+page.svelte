<script lang="ts">
  let { data, form } = $props();
</script>

<svelte:head>
  <title>Tambah User | NexaDesk</title>
</svelte:head>

<div class="space-y-6">
  <div>
    <h1 class="text-2xl font-bold text-gray-900">Tambah User</h1>
    <p class="mt-1 text-sm text-gray-500">
      Tambahkan pengguna baru ke NexaDesk.
    </p>
  </div>

  <div class="max-w-2xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
    <form method="POST" class="space-y-5">

        {#if form?.error}
        <div class="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {form.error}
        </div>
        {/if}
        
      <div>
        <label for="name" class="mb-1 block text-sm font-medium text-gray-700">
          Nama
        </label>

        <input
          id="name"
          name="name"
          type="text"
          required
          class="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-black"
          placeholder="Nama lengkap"
        />
      </div>

      <div>
        <label for="email" class="mb-1 block text-sm font-medium text-gray-700">
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          required
          class="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-black"
          placeholder="nama@email.com"
        />
      </div>

      <div>
        <label for="password" class="mb-1 block text-sm font-medium text-gray-700">
          Password
        </label>

        <input
          id="password"
          name="password"
          type="password"
          required
          class="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-black"
          placeholder="Password"
        />
      </div>

      <div>
        <label for="role" class="mb-1 block text-sm font-medium text-gray-700">
          Role
        </label>

        <select
          id="role"
          name="role"
          class="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-black"
        >
          <option value="EMPLOYEE">Employee</option>
          <option value="IT_SUPPORT">IT Support</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>

      <div>
        <label for="departmentId" class="mb-1 block text-sm font-medium text-gray-700">
          Department
        </label>

        <select
          id="departmentId"
          name="departmentId"
          required
          class="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-black"
        >
          {#each data.departments as department}
            <option value={department.id}>
              {department.name}
            </option>
          {/each}
        </select>
      </div>

      <div class="flex justify-end gap-3 pt-2">
        <a
          href="/users"
          class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Batal
        </a>

        <button
          type="submit"
          class="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
        
          Tambah User
        </button>
      </div>

    </form>
  </div>
</div>