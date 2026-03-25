<script lang="ts">
  import type { Store, MergeableStore } from 'tinybase';
  import type { Id } from 'tinybase';
  import type { Snippet } from 'svelte';
  import { useCellIds } from '../../store.svelte.js';
  import CellView from './CellView.svelte';

  let {
    tableId,
    rowId,
    store,
    cell,
    separator,
    debugIds = false,
    customCellIds,
  }: {
    tableId: Id;
    rowId: Id;
    store?: Store | MergeableStore;
    cell?: Snippet<[Id, Id, Id]>;
    separator?: string;
    debugIds?: boolean;
    customCellIds?: Id[];
  } = $props();

  const cellIds = $derived(useCellIds(tableId, rowId, store));
  const ids = $derived(customCellIds ?? cellIds.current);
</script>

{#if debugIds}
  <span data-id={rowId}>
    {#each ids as cId (cId)}
      {#if separator && ids.indexOf(cId) > 0}{separator}{/if}
      {#if cell}
        {@render cell(tableId, rowId, cId)}
      {:else}
        <CellView {tableId} {rowId} cellId={cId} {store} {debugIds} />
      {/if}
    {/each}
  </span>
{:else}
  {#each ids as cId (cId)}
    {#if separator && ids.indexOf(cId) > 0}{separator}{/if}
    {#if cell}
      {@render cell(tableId, rowId, cId)}
    {:else}
      <CellView {tableId} {rowId} cellId={cId} {store} {debugIds} />
    {/if}
  {/each}
{/if}
