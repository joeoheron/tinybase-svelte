<script lang="ts">
  import type { Store, MergeableStore } from 'tinybase';
  import type { Id } from 'tinybase';
  import type { Snippet } from 'svelte';
  import { useTableIds } from './store.svelte.js';
  import TableView from './TableView.svelte';

  let {
    store,
    table,
    separator,
    debugIds = false,
  }: {
    store?: Store | MergeableStore;
    table?: Snippet<[Id]>;
    separator?: string;
    debugIds?: boolean;
  } = $props();

  const tableIds = $derived(useTableIds(store));
</script>

{#each tableIds.current as tId (tId)}
  {#if separator && tableIds.current.indexOf(tId) > 0}{separator}{/if}
  {#if table}
    {@render table(tId)}
  {:else}
    <TableView tableId={tId} {store} {separator} {debugIds} />
  {/if}
{/each}
