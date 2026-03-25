// Context helpers + Provider
export * from './context/index.js';
export { default as Provider } from './components/Provider.svelte';

// Store rune bindings
export {
  useHasTables, useTables, useTableIds,
  useHasTable, useTable, useTableCellIds,
  useRowIds, useSortedRowIds, useRowCount, useHasRow, useRow,
  useCellIds, useHasCell, useCell,
  useHasValues, useValues, useValueIds, useHasValue, useValue,
} from './store.svelte.js';

// Metrics
export { useMetricIds, useMetric } from './metrics.svelte.js';

// Indexes
export { useIndexIds, useSliceIds, useSliceRowIds } from './indexes.svelte.js';

// Relationships
export {
  useRelationshipIds, useRemoteRowId, useLocalRowIds, useLinkedRowIds,
} from './relationships.svelte.js';

// Checkpoints
export { useCheckpointIds, useCheckpoint, useCheckpointState } from './checkpoints.svelte.js';

// Queries (TinyQL)
export {
  useQueryIds,
  useResultTable, useResultTableCellIds,
  useResultRowIds, useResultSortedRowIds, useResultRowCount,
  useResultRow, useResultCellIds, useResultCell,
} from './queries.svelte.js';

// Synchronizer
export { useSyncStatus, useIsConnected } from './synchronizer.svelte.js';
