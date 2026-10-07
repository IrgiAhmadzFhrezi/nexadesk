<script lang="ts">
  import Sidebar from '$lib/components/Sidebar.svelte';
  import Navbar from '$lib/components/Navbar.svelte';

  let { children, data } = $props();
  let mobileMenuOpen = $state(false);
</script>

<div class="app">

  <div class="sidebar-column">
    <div class="brand">
      NexaDesk
    </div>

    <Sidebar
      user={data.user}
      mobileMenuOpen={mobileMenuOpen}
      onClose={() => (mobileMenuOpen = false)}
    />
  </div>

  <div class="content">

    <Navbar
      user={data.user}
      mobileMenuOpen={mobileMenuOpen}
      onMenuToggle={() => (mobileMenuOpen = !mobileMenuOpen)}
    />

    <main>
      {@render children()}
    </main>

  </div>

</div>

<style>
 .app {
  display: flex;
  min-height: 100vh;
}

.sidebar-column {
  width: 240px;
  flex-shrink: 0;
}

.brand {
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-bottom: 1px solid #e5e7eb;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #111827;
  background: white;
}

.content {
  flex: 1;
  min-width: 0;
}

main {
  padding: 24px;
}

/* Mobile */
@media (max-width: 768px) {
  .sidebar-column {
    width: 0;
  }

  .brand {
    display: none;
  }

  main {
    padding: 16px;
  }
}

</style>