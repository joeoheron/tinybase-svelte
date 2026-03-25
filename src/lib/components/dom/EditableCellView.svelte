<script lang="ts">
  import type { Store, MergeableStore } from 'tinybase';
  import type { Id } from 'tinybase';
  import { useCell } from '../../store.svelte.js';

  let {
    tableId,
    rowId,
    cellId,
    store,
  }: {
    tableId: Id;
    rowId: Id;
    cellId: Id;
    store?: Store | MergeableStore;
  } = $props();

  const cellValue = $derived(useCell(tableId, rowId, cellId, store));
  const valueType = $derived(typeof cellValue.current);
</script>

{#if valueType === 'boolean'}
  <input
    type="checkbox"
    checked={cellValue.current as boolean}
    onchange={(e) => { cellValue.current = (e.target as HTMLInputElement).checked; }}
  />
{:else if valueType === 'number'}
  <input
    type="number"
    value={cellValue.current as number}
    oninput={(e) => { cellValue.current = Number((e.target as HTMLInputElement).value); }}
  />
{:else}
  <input
    type="text"
    value={String(cellValue.current ?? '')}
    oninput={(e) => { cellValue.current = (e.target as HTMLInputElement).value; }}
  />
{/if}
