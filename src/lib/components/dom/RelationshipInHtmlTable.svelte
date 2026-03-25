<script lang="ts">
  import type { Store, MergeableStore } from 'tinybase';
  import type { Id } from 'tinybase';
  import type { Relationships } from 'tinybase/relationships';
  import { useRowIds, useTableCellIds } from '../../store.svelte.js';
  import { useRemoteRowId } from '../../relationships.svelte.js';
  import EditableCellView from './EditableCellView.svelte';
  import CellView from '../ui/CellView.svelte';

  let {
    relationshipId,
    remoteTableId,
    localTableId,
    relationships,
    store,
    idColumn = true,
    editable = false,
  }: {
    relationshipId: Id;
    remoteTableId: Id;
    localTableId: Id;
    relationships?: Relationships;
    store?: Store | MergeableStore;
    idColumn?: boolean;
    editable?: boolean;
  } = $props();

  const localRowIds = $derived(useRowIds(localTableId, store));
  const remoteCellIds = $derived(useTableCellIds(remoteTableId, store));
</script>

{#snippet RemoteRow(localRowId: Id)}
  {@const remoteId = useRemoteRowId(relationshipId, localRowId, relationships)}
  {#if remoteId.current !== undefined}
    <tr>
      {#if idColumn}<td>{localRowId} &rarr; {remoteId.current}</td>{/if}
      {#each remoteCellIds.current as cId (cId)}
        <td>
          {#if editable}
            <EditableCellView tableId={remoteTableId} rowId={remoteId.current} cellId={cId} {store} />
          {:else}
            <CellView tableId={remoteTableId} rowId={remoteId.current} cellId={cId} {store} />
          {/if}
        </td>
      {/each}
    </tr>
  {/if}
{/snippet}

<table>
  <thead>
    <tr>
      {#if idColumn}<th>Local ID &rarr; Remote ID</th>{/if}
      {#each remoteCellIds.current as cId (cId)}<th>{cId}</th>{/each}
    </tr>
  </thead>
  <tbody>
    {#each localRowIds.current as rId (rId)}
      {@render RemoteRow(rId)}
    {/each}
  </tbody>
</table>
