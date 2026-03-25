<script lang="ts">
  import type { Store, MergeableStore } from 'tinybase';
  import type { Id } from 'tinybase';
  import type { Indexes } from 'tinybase/indexes';
  import type { Snippet } from 'svelte';
  import { useSliceRowIds } from '../../indexes.svelte.js';
  import RowView from './RowView.svelte';

  let {
    indexId,
    sliceId,
    tableId,
    indexes,
    store,
    row,
    separator,
    debugIds = false,
  }: {
    indexId: Id;
    sliceId: Id;
    tableId: Id;
    indexes?: Indexes;
    store?: Store | MergeableStore;
    row?: Snippet<[Id, Id]>;
    separator?: string;
    debugIds?: boolean;
  } = $props();

  const rowIds = $derived(useSliceRowIds(indexId, sliceId, indexes));
</script>

{#if debugIds}
  <span data-id={sliceId}>
    {#each rowIds.current as rId (rId)}
      {#if separator && rowIds.current.indexOf(rId) > 0}{separator}{/if}
      {#if row}
        {@render row(indexId, rId)}
      {:else}
        <RowView {tableId} rowId={rId} {store} {separator} {debugIds} />
      {/if}
    {/each}
  </span>
{:else}
  {#each rowIds.current as rId (rId)}
    {#if separator && rowIds.current.indexOf(rId) > 0}{separator}{/if}
    {#if row}
      {@render row(indexId, rId)}
    {:else}
      <RowView {tableId} rowId={rId} {store} {separator} {debugIds} />
    {/if}
  {/each}
{/if}
