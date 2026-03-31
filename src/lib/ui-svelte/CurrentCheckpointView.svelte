<script lang="ts">
  import type { Checkpoints } from 'tinybase/checkpoints';
  import { useCheckpointState } from './checkpoints.svelte.js';
  import CheckpointView from './CheckpointView.svelte';

  let {
    checkpoints,
  }: {
    checkpoints?: Checkpoints;
  } = $props();

  const state = $derived(useCheckpointState(checkpoints));
</script>

{#if state.current !== undefined}
  <CheckpointView checkpointId={state.current} {checkpoints} />
{/if}
