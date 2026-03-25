<script lang="ts">
  import type { Store, MergeableStore } from 'tinybase';
  import type { Id } from 'tinybase';
  import type { Snippet } from 'svelte';
  import { useRowIds } from '../../store.svelte.js';
  import RowView from './RowView.svelte';

  let {
    tableId,
    store,
    row,
    separator,
    debugIds = false,
    customRowIds,
  }: {
    tableId: Id;
    store?: Store | MergeableStore;
    row?: Snippet<[Id, Id]>;
    separator?: string;
    debugIds?: boolean;
    customRowIds?: Id[];
  } = $props();

  const rowIds = $derived(useRowIds(tableId, store));
  const ids = $derived(customRowIds ?? rowIds.current);
</script>

{#if debugIds}
  <span data-id={tableId}>
    {#each ids as rId (rId)}
      {#if separator && ids.indexOf(rId) > 0}{separator}{/if}
      {#if row}
        {@render row(tableId, rId)}
      {:else}
        <RowView {tableId} rowId={rId} {store} {separator} {debugIds} />
      {/if}
    {/each}
  </span>
{:else}
  {#each ids as rId (rId)}
    {#if separator && ids.indexOf(rId) > 0}{separator}{/if}
    {#if row}
      {@render row(tableId, rId)}
    {:else}
      <RowView {tableId} rowId={rId} {store} {separator} {debugIds} />
    {/if}
  {/each}
{/if}
