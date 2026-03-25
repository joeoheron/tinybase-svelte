<script lang="ts">
  import type { Store, MergeableStore } from 'tinybase';
  import type { Id } from 'tinybase';
  import type { Indexes } from 'tinybase/indexes';
  import type { Snippet } from 'svelte';
  import { useSliceIds } from '../../indexes.svelte.js';
  import SliceView from './SliceView.svelte';

  let {
    indexId,
    tableId,
    indexes,
    store,
    slice,
    separator,
    debugIds = false,
  }: {
    indexId: Id;
    tableId: Id;
    indexes?: Indexes;
    store?: Store | MergeableStore;
    slice?: Snippet<[Id, Id]>;
    separator?: string;
    debugIds?: boolean;
  } = $props();

  const sliceIds = $derived(useSliceIds(indexId, indexes));
</script>

{#if debugIds}
  <span data-id={indexId}>
    {#each sliceIds.current as sId (sId)}
      {#if separator && sliceIds.current.indexOf(sId) > 0}{separator}{/if}
      {#if slice}
        {@render slice(indexId, sId)}
      {:else}
        <SliceView {indexId} sliceId={sId} {tableId} {indexes} {store} {separator} {debugIds} />
      {/if}
    {/each}
  </span>
{:else}
  {#each sliceIds.current as sId (sId)}
    {#if separator && sliceIds.current.indexOf(sId) > 0}{separator}{/if}
    {#if slice}
      {@render slice(indexId, sId)}
    {:else}
      <SliceView {indexId} sliceId={sId} {tableId} {indexes} {store} {separator} {debugIds} />
    {/if}
  {/each}
{/if}
