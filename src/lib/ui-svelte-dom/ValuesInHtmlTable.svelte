<script lang="ts">
  import type { Store, MergeableStore } from 'tinybase';
  import { useValueIds } from '../ui-svelte/store.svelte.js';
  import EditableValueView from './EditableValueView.svelte';
  import ValueView from '../ui-svelte/ValueView.svelte';

  let {
    store,
    editable = false,
  }: {
    store?: Store | MergeableStore;
    editable?: boolean;
  } = $props();

  const valueIds = $derived(useValueIds(store));
</script>

<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Value</th>
    </tr>
  </thead>
  <tbody>
    {#each valueIds.current as vId (vId)}
      <tr>
        <td>{vId}</td>
        <td>
          {#if editable}
            <EditableValueView valueId={vId} {store} />
          {:else}
            <ValueView valueId={vId} {store} />
          {/if}
        </td>
      </tr>
    {/each}
  </tbody>
</table>
