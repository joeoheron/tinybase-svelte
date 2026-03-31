<script lang="ts">
  import type { Id } from 'tinybase';
  import type { Queries } from 'tinybase/queries';
  import { useResultCell } from './queries.svelte.js';

  let {
    queryId,
    rowId,
    cellId,
    queries,
    debugIds = false,
  }: {
    queryId: Id;
    rowId: Id;
    cellId: Id;
    queries?: Queries;
    debugIds?: boolean;
  } = $props();

  const cell = $derived(useResultCell(queryId, rowId, cellId, queries));
</script>

{#if debugIds}
  <span data-id={cellId}>{String(cell.current ?? '')}</span>
{:else}
  {String(cell.current ?? '')}
{/if}
