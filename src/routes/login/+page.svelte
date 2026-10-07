<svelte:head>
  <title>Login | NexaDesk</title>
</svelte:head>

<div class="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8">

  <div class="w-full max-w-md">

    <!-- Branding -->
    <div class="mb-8 text-center">
      <div class="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-black text-lg font-bold text-white">
        N
      </div>

      <h1 class="mt-4 text-xl font-bold tracking-tight text-gray-900">
        NexaDesk
      </h1>

      <p class="mt-1 text-sm text-gray-500">
        IT Helpdesk Management System
      </p>
    </div>

    <!-- Login Card -->
    <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

      <div class="mb-6">
        <h2 class="text-xl font-semibold tracking-tight text-gray-900">
          Welcome back
        </h2>

        <p class="mt-1.5 text-sm leading-6 text-gray-500">
          Sign in to continue to your account.
        </p>
      </div>

      <form method="POST" class="space-y-5">

        <!-- Email -->
        <div>
          <label
            for="email"
            class="block text-sm font-medium text-gray-900"
          >
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            autocomplete="email"
            placeholder="nama@email.com"
            required
            class="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
          />
        </div>

        <!-- Password -->
        <div>
          <label
            for="password"
            class="block text-sm font-medium text-gray-900"
          >
            Password
          </label>

          <input
            id="password"
            name="password"
            type="password"
            autocomplete="current-password"
            placeholder="Masukkan password"
            required
            class="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
          />
        </div>

        <!-- Submit -->
        <button
          type="submit"
          class="w-full rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
        >
          Sign In
        </button>

      </form>

    </div>

    <!-- Footer -->
    <p class="mt-6 text-center text-xs text-gray-400">
      NexaDesk · IT Support Management
    </p>

  </div>

</div>