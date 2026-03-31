<script lang="ts">
  import type { Store, MergeableStore } from 'tinybase';
  import type { Id } from 'tinybase';
  import type { Relationships } from 'tinybase/relationships';
  import type { Snippet } from 'svelte';
  import { useRemoteRowId } from './relationships.svelte.js';
  import RowView from './RowView.svelte';

  let {
    relationshipId,
    localRowId,
    tableId,
    relationships,
    store,
    cell,
    separator,
    debugIds = false,
  }: {
    relationshipId: Id;
    localRowId: Id;
    tableId: Id;
    relationships?: Relationships;
    store?: Store | MergeableStore;
    cell?: Snippet<[Id, Id, Id]>;
    separator?: string;
    debugIds?: boolean;
  } = $props();

  const remoteId = $derived(useRemoteRowId(relationshipId, localRowId, relationships));
</script>

{#if remoteId.current !== undefined}
  <RowView {tableId} rowId={remoteId.current} {store} {cell} {separator} {debugIds} />
{/if}
