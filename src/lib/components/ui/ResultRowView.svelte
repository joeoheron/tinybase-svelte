<script lang="ts">
  import type { Id } from 'tinybase';
  import type { Queries } from 'tinybase/queries';
  import type { Snippet } from 'svelte';
  import { useResultCellIds } from '../../queries.svelte.js';
  import ResultCellView from './ResultCellView.svelte';

  let {
    queryId,
    rowId,
    queries,
    cell,
    separator,
    debugIds = false,
    customCellIds,
  }: {
    queryId: Id;
    rowId: Id;
    queries?: Queries;
    cell?: Snippet<[Id, Id, Id]>;
    separator?: string;
    debugIds?: boolean;
    customCellIds?: Id[];
  } = $props();

  const cellIds = $derived(useResultCellIds(queryId, rowId, queries));
  const ids = $derived(customCellIds ?? cellIds.current);
</script>

{#if debugIds}
  <span data-id={rowId}>
    {#each ids as cId (cId)}
      {#if separator && ids.indexOf(cId) > 0}{separator}{/if}
      {#if cell}
        {@render cell(queryId, rowId, cId)}
      {:else}
        <ResultCellView {queryId} {rowId} cellId={cId} {queries} {debugIds} />
      {/if}
    {/each}
  </span>
{:else}
  {#each ids as cId (cId)}
    {#if separator && ids.indexOf(cId) > 0}{separator}{/if}
    {#if cell}
      {@render cell(queryId, rowId, cId)}
    {:else}
      <ResultCellView {queryId} {rowId} cellId={cId} {queries} {debugIds} />
    {/if}
  {/each}
{/if}
