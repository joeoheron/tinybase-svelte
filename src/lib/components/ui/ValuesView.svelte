<script lang="ts">
  import type { Store, MergeableStore } from 'tinybase';
  import type { Id } from 'tinybase';
  import type { Snippet } from 'svelte';
  import { useValueIds } from '../../store.svelte.js';
  import ValueView from './ValueView.svelte';

  let {
    store,
    value,
    separator,
    debugIds = false,
  }: {
    store?: Store | MergeableStore;
    value?: Snippet<[Id]>;
    separator?: string;
    debugIds?: boolean;
  } = $props();

  const valueIds = $derived(useValueIds(store));
</script>

{#each valueIds.current as vId (vId)}
  {#if separator && valueIds.current.indexOf(vId) > 0}{separator}{/if}
  {#if value}
    {@render value(vId)}
  {:else}
    <ValueView valueId={vId} {store} {debugIds} />
  {/if}
{/each}
