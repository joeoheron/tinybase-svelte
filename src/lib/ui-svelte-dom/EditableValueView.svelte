<script lang="ts">
  import type { Store, MergeableStore } from 'tinybase';
  import type { Id } from 'tinybase';
  import { useValue } from '../ui-svelte/store.svelte.js';

  let {
    valueId,
    store,
  }: {
    valueId: Id;
    store?: Store | MergeableStore;
  } = $props();

  const val = $derived(useValue(valueId, store));
  const valueType = $derived(typeof val.current);
</script>

{#if valueType === 'boolean'}
  <input
    type="checkbox"
    checked={val.current as boolean}
    onchange={(e) => { val.current = (e.target as HTMLInputElement).checked; }}
  />
{:else if valueType === 'number'}
  <input
    type="number"
    value={val.current as number}
    oninput={(e) => { val.current = Number((e.target as HTMLInputElement).value); }}
  />
{:else}
  <input
    type="text"
    value={String(val.current ?? '')}
    oninput={(e) => { val.current = (e.target as HTMLInputElement).value; }}
  />
{/if}
