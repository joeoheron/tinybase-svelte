<script lang="ts">
  let { children } = $props();
</script>

<nav>
  <a href="/">svelte-tinybase</a>
  <span>·</span>
  <a href="/examples/todos">todos</a>
</nav>

{@render children()}

<style>
  nav {
    padding: 1rem;
    border-bottom: 1px solid #ddd;
    display: flex;
    gap: 0.5rem;
    align-items: center;
    font-family: monospace;
  }
  nav a { color: inherit; }
</style>
