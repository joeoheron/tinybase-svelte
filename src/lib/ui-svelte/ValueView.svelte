<script lang="ts">
  import type { Store, MergeableStore } from 'tinybase';
  import type { Id } from 'tinybase';
  import { useValue } from './store.svelte.js';

  let {
    valueId,
    store,
    debugIds = false,
  }: {
    valueId: Id;
    store?: Store | MergeableStore;
    debugIds?: boolean;
  } = $props();

  const val = $derived(useValue(valueId, store));
</script>

{#if debugIds}
  <span data-id={valueId}>{String(val.current ?? '')}</span>
{:else}
  {String(val.current ?? '')}
{/if}
