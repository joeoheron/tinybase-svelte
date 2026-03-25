<script lang="ts">
  import type { Store, MergeableStore, Persister, Synchronizer } from 'tinybase';
  import type { Metrics } from 'tinybase/metrics';
  import type { Indexes } from 'tinybase/indexes';
  import type { Relationships } from 'tinybase/relationships';
  import type { Checkpoints } from 'tinybase/checkpoints';
  import type { Queries } from 'tinybase/queries';
  import {
    setStoreContext,
    setMetricsContext,
    setIndexesContext,
    setRelationshipsContext,
    setCheckpointsContext,
    setQueriesContext,
    setPersisterContext,
    setSynchronizerContext,
  } from '../context';

  // Props
  export let store: Store | MergeableStore;
  export let metrics: Metrics | undefined = undefined;
  export let indexes: Indexes | undefined = undefined;
  export let relationships: Relationships | undefined = undefined;
  export let checkpoints: Checkpoints | undefined = undefined;
  export let queries: Queries | undefined = undefined;
  export let persister: Persister | undefined = undefined;
  export let synchronizer: Synchronizer | undefined = undefined;

  // Set all contexts
  setStoreContext(store);
  if (metrics) setMetricsContext(metrics);
  if (indexes) setIndexesContext(indexes);
  if (relationships) setRelationshipsContext(relationships);
  if (checkpoints) setCheckpointsContext(checkpoints);
  if (queries) setQueriesContext(queries);
  if (persister) setPersisterContext(persister);
  if (synchronizer) setSynchronizerContext(synchronizer);
</script>

<slot />
