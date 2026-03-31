<script lang="ts">
  import type { Id } from 'tinybase';
  import type { Queries } from 'tinybase/queries';
  import { useResultSortedRowIds, useResultTableCellIds } from '../ui-svelte/queries.svelte.js';
  import ResultCellView from '../ui-svelte/ResultCellView.svelte';

  let {
    queryId,
    cellId = $bindable<Id | undefined>(undefined),
    descending = $bindable(false),
    offset = $bindable(0),
    limit,
    queries,
    idColumn = true,
  }: {
    queryId: Id;
    cellId?: Id;
    descending?: boolean;
    offset?: number;
    limit?: number;
    queries?: Queries;
    idColumn?: boolean;
  } = $props();

  const rowIds = $derived(useResultSortedRowIds(queryId, cellId, descending, offset, limit, queries));
  const cellIds = $derived(useResultTableCellIds(queryId, queries));

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
      {#each cellIds.current as cId (cId)}
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
        {#each cellIds.current as cId (cId)}
          <td>
            <ResultCellView {queryId} rowId={rId} cellId={cId} {queries} />
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
