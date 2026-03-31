<script lang="ts">
  import type { Id } from 'tinybase';
  import type { Metrics } from 'tinybase/metrics';
  import { useMetric } from './metrics.svelte.js';

  let {
    metricId,
    metrics,
    debugIds = false,
  }: {
    metricId: Id;
    metrics?: Metrics;
    debugIds?: boolean;
  } = $props();

  const metric = $derived(useMetric(metricId, metrics));
</script>

{#if debugIds}
  <span data-id={metricId}>{String(metric.current ?? '')}</span>
{:else}
  {String(metric.current ?? '')}
{/if}
