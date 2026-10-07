<script lang="ts">
  let { user, mobileMenuOpen, onMenuToggle } = $props();
</script>

<header class="navbar">
  <button
    type="button"
    class="menu-button"
    aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
    onclick={onMenuToggle}
  >
    {mobileMenuOpen ? '✕' : '☰'}
  </button>

  <div class="user">

    <span>{user?.name}</span>

    <form method="POST" action="/logout">
      <button type="submit">
        Logout
      </button>
    </form>

  </div>

</header>

<style>
  .navbar {
    height: 64px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e5e7eb;
    background: white;
  }

  .user {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 16px;
    padding: 0 24px;
    font-size: 14px;
    color: #374151;
  }

  button {
    border: none;
    background: none;
    padding: 0;
    color: #ff0000;
    cursor: pointer;
    font: inherit;
  }

  button:hover {
    color: #111827;
  }

  .menu-button {
    display: none;
  }

  @media (max-width: 768px) {
    .menu-button {
      display: block;
      border: none;
      background: none;
      padding: 0 16px;
      font-size: 22px;
      color: #374151;
      cursor: pointer;
    }
  }
</style>