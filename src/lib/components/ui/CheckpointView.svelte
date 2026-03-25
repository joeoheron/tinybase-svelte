<script lang="ts">
  import type { Id } from 'tinybase';
  import type { Checkpoints } from 'tinybase/checkpoints';
  import { useCheckpoint } from '../../checkpoints.svelte.js';

  let {
    checkpointId,
    checkpoints,
    debugIds = false,
  }: {
    checkpointId: Id;
    checkpoints?: Checkpoints;
    debugIds?: boolean;
  } = $props();

  const label = $derived(useCheckpoint(checkpointId, checkpoints));
</script>

{#if debugIds}
  <span data-id={checkpointId}>{String(label.current ?? '')}</span>
{:else}
  {String(label.current ?? '')}
{/if}
