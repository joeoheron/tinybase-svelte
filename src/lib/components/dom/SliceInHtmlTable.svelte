<script lang="ts">
  import type { Store, MergeableStore } from 'tinybase';
  import type { Id } from 'tinybase';
  import type { Indexes } from 'tinybase/indexes';
  import { useSliceRowIds } from '../../indexes.svelte.js';
  import { useTableCellIds } from '../../store.svelte.js';
  import EditableCellView from './EditableCellView.svelte';
  import CellView from '../ui/CellView.svelte';

  let {
    indexId,
    sliceId,
    tableId,
    indexes,
    store,
    idColumn = true,
    customCellIds,
    editable = false,
  }: {
    indexId: Id;
    sliceId: Id;
    tableId: Id;
    indexes?: Indexes;
    store?: Store | MergeableStore;
    idColumn?: boolean;
    customCellIds?: Id[];
    editable?: boolean;
  } = $props();

  const sliceRowIds = $derived(useSliceRowIds(indexId, sliceId, indexes));
  const tableCellIds = $derived(useTableCellIds(tableId, store));
  const cellIds = $derived(customCellIds ?? tableCellIds.current);
</script>

<table>
  <thead>
    <tr>
      {#if idColumn}<th>ID</th>{/if}
      {#each cellIds as cId (cId)}<th>{cId}</th>{/each}
    </tr>
  </thead>
  <tbody>
    {#each sliceRowIds.current as rId (rId)}
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
