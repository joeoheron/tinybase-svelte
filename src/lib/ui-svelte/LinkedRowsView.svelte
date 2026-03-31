<script lang="ts">
  import type { Store, MergeableStore } from 'tinybase';
  import type { Id } from 'tinybase';
  import type { Relationships } from 'tinybase/relationships';
  import type { Snippet } from 'svelte';
  import { useLinkedRowIds } from './relationships.svelte.js';
  import RowView from './RowView.svelte';

  let {
    relationshipId,
    firstRowId,
    tableId,
    relationships,
    store,
    row,
    separator,
    debugIds = false,
  }: {
    relationshipId: Id;
    firstRowId: Id;
    tableId: Id;
    relationships?: Relationships;
    store?: Store | MergeableStore;
    row?: Snippet<[Id, Id]>;
    separator?: string;
    debugIds?: boolean;
  } = $props();

  const linkedRowIds = $derived(useLinkedRowIds(relationshipId, firstRowId, relationships));
</script>

{#each linkedRowIds.current as rId (rId)}
  {#if separator && linkedRowIds.current.indexOf(rId) > 0}{separator}{/if}
  {#if row}
    {@render row(tableId, rId)}
  {:else}
    <RowView {tableId} rowId={rId} {store} {separator} {debugIds} />
  {/if}
{/each}
