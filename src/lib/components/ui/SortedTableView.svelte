<script lang="ts">
  import type { Store, MergeableStore } from 'tinybase';
  import type { Id } from 'tinybase';
  import type { Snippet } from 'svelte';
  import { useSortedRowIds } from '../../store.svelte.js';
  import RowView from './RowView.svelte';

  let {
    tableId,
    cellId,
    descending = false,
    offset = 0,
    limit,
    store,
    row,
    separator,
    debugIds = false,
  }: {
    tableId: Id;
    cellId?: Id;
    descending?: boolean;
    offset?: number;
    limit?: number;
    store?: Store | MergeableStore;
    row?: Snippet<[Id, Id]>;
    separator?: string;
    debugIds?: boolean;
  } = $props();

  const rowIds = $derived(useSortedRowIds(tableId, cellId, descending, offset, limit, store));
</script>

{#if debugIds}
  <span data-id={tableId}>
    {#each rowIds.current as rId (rId)}
      {#if separator && rowIds.current.indexOf(rId) > 0}{separator}{/if}
      {#if row}
        {@render row(tableId, rId)}
      {:else}
        <RowView {tableId} rowId={rId} {store} {separator} {debugIds} />
      {/if}
    {/each}
  </span>
{:else}
  {#each rowIds.current as rId (rId)}
    {#if separator && rowIds.current.indexOf(rId) > 0}{separator}{/if}
    {#if row}
      {@render row(tableId, rId)}
    {:else}
      <RowView {tableId} rowId={rId} {store} {separator} {debugIds} />
    {/if}
  {/each}
{/if}
