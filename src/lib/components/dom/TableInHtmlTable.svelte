<script lang="ts">
  import type { Store, MergeableStore } from 'tinybase';
  import type { Id } from 'tinybase';
  import type { Snippet } from 'svelte';
  import { useTableCellIds, useRowIds } from '../../store.svelte.js';
  import EditableCellView from './EditableCellView.svelte';
  import CellView from '../ui/CellView.svelte';

  let {
    tableId,
    store,
    idColumn = true,
    customCellIds,
    editable = false,
    headerRow,
    bodyRow,
  }: {
    tableId: Id;
    store?: Store | MergeableStore;
    idColumn?: boolean;
    customCellIds?: Id[];
    editable?: boolean;
    headerRow?: Snippet<[Id[]]>;
    bodyRow?: Snippet<[Id, Id]>;
  } = $props();

  const tableCellIds = $derived(useTableCellIds(tableId, store));
  const rowIds = $derived(useRowIds(tableId, store));
  const cellIds = $derived(customCellIds ?? tableCellIds.current);
</script>

<table>
  <thead>
    {#if headerRow}
      {@render headerRow(cellIds)}
    {:else}
      <tr>
        {#if idColumn}<th>ID</th>{/if}
        {#each cellIds as cId (cId)}<th>{cId}</th>{/each}
      </tr>
    {/if}
  </thead>
  <tbody>
    {#each rowIds.current as rId (rId)}
      {#if bodyRow}
        {@render bodyRow(tableId, rId)}
      {:else}
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
      {/if}
    {/each}
  </tbody>
</table>
