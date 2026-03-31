<script lang="ts">
  import type { Store, MergeableStore } from 'tinybase';
  import type { Id } from 'tinybase';
  import { useCell } from './store.svelte.js';

  let {
    tableId,
    rowId,
    cellId,
    store,
    debugIds = false,
  }: {
    tableId: Id;
    rowId: Id;
    cellId: Id;
    store?: Store | MergeableStore;
    debugIds?: boolean;
  } = $props();

  const cell = $derived(useCell(tableId, rowId, cellId, store));
</script>

{#if debugIds}
  <span data-id={cellId}>{String(cell.current ?? '')}</span>
{:else}
  {String(cell.current ?? '')}
{/if}
