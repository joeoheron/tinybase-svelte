<script lang="ts">
  import type { Store, MergeableStore, Persister, Synchronizer } from 'tinybase';
  import type { Metrics } from 'tinybase/metrics';
  import type { Indexes } from 'tinybase/indexes';
  import type { Relationships } from 'tinybase/relationships';
  import type { Checkpoints } from 'tinybase/checkpoints';
  import type { Queries } from 'tinybase/queries';
  import type { Snippet } from 'svelte';
  import {
    setStoreContext, setMetricsContext, setIndexesContext,
    setRelationshipsContext, setCheckpointsContext, setQueriesContext,
    setPersisterContext, setSynchronizerContext,
  } from '../../context/index.js';

  let {
    store,
    metrics,
    indexes,
    relationships,
    checkpoints,
    queries,
    persister,
    synchronizer,
    children,
  }: {
    store: Store | MergeableStore;
    metrics?: Metrics;
    indexes?: Indexes;
    relationships?: Relationships;
    checkpoints?: Checkpoints;
    queries?: Queries;
    persister?: Persister;
    synchronizer?: Synchronizer;
    children: Snippet;
  } = $props();

  // setContext must be called synchronously during component initialisation.
  setStoreContext(store);
  if (metrics) setMetricsContext(metrics);
  if (indexes) setIndexesContext(indexes);
  if (relationships) setRelationshipsContext(relationships);
  if (checkpoints) setCheckpointsContext(checkpoints);
  if (queries) setQueriesContext(queries);
  if (persister) setPersisterContext(persister);
  if (synchronizer) setSynchronizerContext(synchronizer);
</script>

{@render children()}
