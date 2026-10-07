<script lang="ts">
  import { page } from '$app/state';

  type User = {
    id: number;
    name: string;
    email: string;
    role: string;
    departmentId: number;
  };

  let {
    user,
    mobileMenuOpen,
    onClose
  }: {
    user: User;
    mobileMenuOpen: boolean;
    onClose: () => void;
  } = $props();

  const menuItems = [
    {
      label: 'Dashboard',
      href: '/'
    },
    {
      label: 'Tickets',
      href: '/tickets'
    },
    {
      label: 'Users',
      href: '/users',
      adminOnly: true
    },
    {
      label: 'Categories',
      href: '/categories',
      adminOnly: true
    }
  ];
</script>

{#if mobileMenuOpen}
  <button
    class="overlay"
    type="button"
    aria-label="Tutup menu"
    onclick={onClose}
  ></button>
{/if}

<aside class:mobile-open={mobileMenuOpen} class="sidebar">
  <nav>
    {#each menuItems as item}
      {#if !item.adminOnly || user.role === 'ADMIN'}
        <a
          href={item.href}
          class:active={
            item.href === '/'
              ? page.url.pathname === '/'
              : page.url.pathname.startsWith(item.href)
          }
          onclick={onClose}
        >
          {item.label}
        </a>
      {/if}
    {/each}
  </nav>
</aside>

<style>
  .sidebar {
    width: 240px;
    min-height: 100vh;
    padding: 24px 16px;
    border-right: 1px solid #e5e7eb;
    background: #ffffff;
  }

  nav {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  a {
    padding: 10px 12px;
    border-radius: 8px;
    text-decoration: none;
    color: #374151;
    font-size: 14px;
    font-weight: 500;
    transition:
      background-color 150ms ease,
      color 150ms ease;
  }

  a:hover {
    background: #f3f4f6;
    color: #111827;
  }

  a.active {
    background: #f3f4f6;
    color: #111827;
    font-weight: 600;
  }

  .overlay {
    display: none;
  }

  @media (max-width: 768px) {
    .overlay {
      display: block;
      position: fixed;
      inset: 0;
      z-index: 40;
      width: 100%;
      height: 100%;
      padding: 0;
      border: none;
      background: rgba(0, 0, 0, 0.3);
      cursor: pointer;
    }

    .sidebar {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 50;
      width: 240px;
      height: 100vh;
      min-height: 100vh;
      padding: 24px 16px;
      border-right: 1px solid #e5e7eb;
      background: #ffffff;
      transform: translateX(-100%);
      transition: transform 200ms ease;
      box-shadow: 4px 0 12px rgba(0, 0, 0, 0.08);
    }

    .sidebar.mobile-open {
      transform: translateX(0);
    }
  }
</style>