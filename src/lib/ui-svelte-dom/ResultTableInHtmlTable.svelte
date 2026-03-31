<script lang="ts">
  import type { Id } from 'tinybase';
  import type { Queries } from 'tinybase/queries';
  import { useResultRowIds, useResultTableCellIds } from '../ui-svelte/queries.svelte.js';
  import ResultCellView from '../ui-svelte/ResultCellView.svelte';

  let {
    queryId,
    queries,
    idColumn = true,
  }: {
    queryId: Id;
    queries?: Queries;
    idColumn?: boolean;
  } = $props();

  const rowIds = $derived(useResultRowIds(queryId, queries));
  const cellIds = $derived(useResultTableCellIds(queryId, queries));
</script>

<table>
  <thead>
    <tr>
      {#if idColumn}<th>ID</th>{/if}
      {#each cellIds.current as cId (cId)}<th>{cId}</th>{/each}
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
