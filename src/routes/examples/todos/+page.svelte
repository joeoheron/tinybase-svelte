<script lang="ts">
  import { createStore } from 'tinybase';
  import { Provider, useRowIds } from '$lib';
  import TodoItem from './TodoItem.svelte';

  const store = createStore().setTable('todos', {
    a: { text: 'Buy groceries', done: false },
    b: { text: 'Walk the dog', done: true },
    c: { text: 'Read a book', done: false },
  });

  const rowIds = useRowIds('todos', store);

  let input = $state('');
  let nextId = $state(0);

  function addTodo() {
    const text = input.trim();
    if (!text) return;
    store.setRow('todos', `todo${nextId++}`, { text, done: false });
    input = '';
  }
</script>

<Provider {store}>
  <h2>Todos</h2>

  <ul>
    {#each rowIds.current as rowId (rowId)}
      <TodoItem {rowId} onDelete={() => store.delRow('todos', rowId)} />
    {/each}
  </ul>

  <form onsubmit={(e) => { e.preventDefault(); addTodo(); }}>
    <input bind:value={input} placeholder="New todo…" />
    <button type="submit">Add</button>
  </form>
</Provider>

<style>
  h2 { margin-top: 1.5rem; }
  ul { list-style: none; padding: 0; min-width: 20rem; }
  form { display: flex; gap: 0.5rem; margin-top: 1rem; }
  input { flex: 1; padding: 0.25rem 0.5rem; }
</style>
