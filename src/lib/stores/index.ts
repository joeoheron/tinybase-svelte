/**
 * svelte-tinybase stores
 * Reactive Svelte stores for TinyBase data
 */

// Store (tables, rows, cells, values)
export {
  // Tables
  tables,
  tableIds,
  hasTables,
  // Table
  table,
  hasTable,
  tableCellIds,
  // Rows
  rowIds,
  sortedRowIds,
  rowCount,
  row,
  rowWritable,
  hasRow,
  // Cells
  cellIds,
  cell,
  cellWritable,
  hasCell,
  // Values
  values,
  valueIds,
  hasValues,
  value,
  valueWritable,
  hasValue,
} from './store';

// Metrics
export {
  metricIds,
  metric,
} from './metrics';

// Indexes
export {
  indexIds,
  sliceIds,
  sliceRowIds,
} from './indexes';

// Relationships
export {
  relationshipIds,
  remoteRowId,
  localRowIds,
  linkedRowIds,
} from './relationships';

// Checkpoints (undo/redo)
export {
  checkpointIds,
  currentCheckpointId,
  backwardCheckpointIds,
  forwardCheckpointIds,
  checkpoint,
  canUndo,
  canRedo,
  undoRedoInfo,
  type UndoRedoInfo,
} from './checkpoints';

// Queries (TinyQL)
export {
  queryIds,
  resultTable,
  resultRowIds,
  resultSortedRowIds,
  resultRowCount,
  resultRow,
  resultCellIds,
  resultCell,
} from './queries';

// Synchronizer
export {
  SyncStatus,
  syncStatus,
  isConnected,
  createSyncController,
  type SyncInfo,
} from './synchronizer';
