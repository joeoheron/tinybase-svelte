<script lang="ts">
  import type { Store, MergeableStore } from 'tinybase';
  import type { Id } from 'tinybase';
  import type { Relationships } from 'tinybase/relationships';
  import type { Snippet } from 'svelte';
  import { useLocalRowIds } from '../../relationships.svelte.js';
  import RowView from './RowView.svelte';

  let {
    relationshipId,
    remoteRowId,
    tableId,
    relationships,
    store,
    row,
    separator,
    debugIds = false,
  }: {
    relationshipId: Id;
    remoteRowId: Id;
    tableId: Id;
    relationships?: Relationships;
    store?: Store | MergeableStore;
    row?: Snippet<[Id, Id]>;
    separator?: string;
    debugIds?: boolean;
  } = $props();

  const localRowIds = $derived(useLocalRowIds(relationshipId, remoteRowId, relationships));
</script>

{#each localRowIds.current as rId (rId)}
  {#if separator && localRowIds.current.indexOf(rId) > 0}{separator}{/if}
  {#if row}
    {@render row(tableId, rId)}
  {:else}
    <RowView {tableId} rowId={rId} {store} {separator} {debugIds} />
  {/if}
{/each}
