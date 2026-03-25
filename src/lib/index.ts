/**
 * svelte-tinybase
 * 
 * Svelte bindings for TinyBase - reactive local-first data management
 * 
 * @example
 * ```svelte
 * <script>
 *   import { createStore } from 'tinybase';
 *   import { TinyBaseProvider, table, rowIds } from 'svelte-tinybase';
 *   
 *   const store = createStore();
 *   store.setTable('todos', { '1': { title: 'Hello', done: false } });
 *   
 *   const todos = table(store, 'todos');
 *   const ids = rowIds(store, 'todos');
 * </script>
 * 
 * <TinyBaseProvider {store}>
 *   {#each $ids as id}
 *     <div>{$todos[id].title}</div>
 *   {/each}
 * </TinyBaseProvider>
 * ```
 */

// Re-export everything
export * from './stores';
export * from './context';
export * from './components';
