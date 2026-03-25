<script lang="ts">
  import type { Store, MergeableStore } from 'tinybase';
  import type { Id } from 'tinybase';
  import { useTableCellIds, useSortedRowIds } from '../../store.svelte.js';
  import EditableCellView from './EditableCellView.svelte';
  import CellView from '../ui/CellView.svelte';

  let {
    tableId,
    cellId = $bindable<Id | undefined>(undefined),
    descending = $bindable(false),
    offset = $bindable(0),
    limit,
    store,
    idColumn = true,
    customCellIds,
    editable = false,
  }: {
    tableId: Id;
    cellId?: Id;
    descending?: boolean;
    offset?: number;
    limit?: number;
    store?: Store | MergeableStore;
    idColumn?: boolean;
    customCellIds?: Id[];
    editable?: boolean;
  } = $props();

  const tableCellIds = $derived(useTableCellIds(tableId, store));
  const rowIds = $derived(useSortedRowIds(tableId, cellId, descending, offset, limit, store));
  const cellIds = $derived(customCellIds ?? tableCellIds.current);

  function toggleSort(cId: Id) {
    if (cellId === cId) {
      descending = !descending;
    } else {
      cellId = cId;
      descending = false;
      offset = 0;
    }
  }
</script>

<table>
  <thead>
    <tr>
      {#if idColumn}<th>ID</th>{/if}
      {#each cellIds as cId (cId)}
        <th
          onclick={() => toggleSort(cId)}
          style="cursor: pointer"
          aria-sort={cellId === cId ? (descending ? 'descending' : 'ascending') : 'none'}
        >
          {cId}
          {#if cellId === cId}{descending ? ' ▼' : ' ▲'}{/if}
        </th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each rowIds.current as rId (rId)}
      <tr>
        {#if idColumn}<td>{rId}</td>{/if}
        {#each cellIds as cId (cId)}
          <td>
            {#if editable}
              <EditableCellView {tableId} rowId={rId} cellId={cId} {store} />
            {:else}
              <CellView {tableId} rowId={rId} cellId={cId} {store} />
            {/if}
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
