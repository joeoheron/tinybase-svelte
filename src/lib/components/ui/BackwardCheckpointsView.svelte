<script lang="ts">
  import type { Id } from 'tinybase';
  import type { Checkpoints } from 'tinybase/checkpoints';
  import type { Snippet } from 'svelte';
  import { useCheckpointState } from '../../checkpoints.svelte.js';
  import CheckpointView from './CheckpointView.svelte';

  let {
    checkpoints,
    checkpoint,
    separator,
  }: {
    checkpoints?: Checkpoints;
    checkpoint?: Snippet<[Id]>;
    separator?: string;
  } = $props();

  const state = $derived(useCheckpointState(checkpoints));
</script>

{#each state.backward as cpId (cpId)}
  {#if separator && state.backward.indexOf(cpId) > 0}{separator}{/if}
  {#if checkpoint}
    {@render checkpoint(cpId)}
  {:else}
    <CheckpointView checkpointId={cpId} {checkpoints} />
  {/if}
{/each}
