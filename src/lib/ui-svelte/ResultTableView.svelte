<script lang="ts">
  import type { Id } from 'tinybase';
  import type { Queries } from 'tinybase/queries';
  import type { Snippet } from 'svelte';
  import { useResultRowIds } from './queries.svelte.js';
  import ResultRowView from './ResultRowView.svelte';

  let {
    queryId,
    queries,
    row,
    separator,
    debugIds = false,
  }: {
    queryId: Id;
    queries?: Queries;
    row?: Snippet<[Id, Id]>;
    separator?: string;
    debugIds?: boolean;
  } = $props();

  const rowIds = $derived(useResultRowIds(queryId, queries));
</script>

{#each rowIds.current as rId (rId)}
  {#if separator && rowIds.current.indexOf(rId) > 0}{separator}{/if}
  {#if row}
    {@render row(queryId, rId)}
  {:else}
    <ResultRowView {queryId} rowId={rId} {queries} {separator} {debugIds} />
  {/if}
{/each}
