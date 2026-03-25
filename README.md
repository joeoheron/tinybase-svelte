# svelte-tinybase

Svelte bindings for [TinyBase](https://tinybase.org) — reactive local-first data management.

This library provides Svelte stores that mirror the React hooks from `tinybase/ui-react`, making it easy to build reactive Svelte applications with TinyBase.

## Installation

```bash
npm install svelte-tinybase tinybase
```

## Quick Start

```svelte
<script lang="ts">
  import { createStore } from 'tinybase';
  import { TinyBaseProvider, table, rowIds, cellWritable } from 'svelte-tinybase';
  
  const store = createStore();
  store.setTable('todos', {
    '1': { title: 'Learn TinyBase', done: false },
    '2': { title: 'Build something cool', done: false },
  });
  
  // Reactive stores
  const todos = table(store, 'todos');
  const ids = rowIds(store, 'todos');
</script>

<TinyBaseProvider {store}>
  <ul>
    {#each $ids as id}
      <li class:done={$todos[id].done}>
        {$todos[id].title}
      </li>
    {/each}
  </ul>
</TinyBaseProvider>
```

## API

### Store Bindings

| Function | Description | React Equivalent |
|----------|-------------|------------------|
| `tables(store)` | All tables data | `useTables` |
| `tableIds(store)` | Table IDs | `useTableIds` |
| `table(store, tableId)` | Single table | `useTable` |
| `rowIds(store, tableId)` | Row IDs in table | `useRowIds` |
| `sortedRowIds(store, tableId, cellId?, desc?, offset?, limit?)` | Sorted row IDs | `useSortedRowIds` |
| `rowCount(store, tableId)` | Row count | `useRowCount` |
| `row(store, tableId, rowId)` | Single row | `useRow` |
| `rowWritable(store, tableId, rowId)` | Writable row | - |
| `cellIds(store, tableId, rowId)` | Cell IDs in row | `useCellIds` |
| `cell(store, tableId, rowId, cellId)` | Single cell | `useCell` |
| `cellWritable(store, tableId, rowId, cellId)` | Writable cell | - |
| `values(store)` | All values | `useValues` |
| `valueIds(store)` | Value IDs | `useValueIds` |
| `value(store, valueId)` | Single value | `useValue` |
| `valueWritable(store, valueId)` | Writable value | - |

### Has Bindings (existence checks)

| Function | Description |
|----------|-------------|
| `hasTables(store)` | Any tables exist? |
| `hasTable(store, tableId)` | Table exists? |
| `hasRow(store, tableId, rowId)` | Row exists? |
| `hasCell(store, tableId, rowId, cellId)` | Cell exists? |
| `hasValues(store)` | Any values exist? |
| `hasValue(store, valueId)` | Value exists? |

### Metrics

```typescript
import { createMetrics } from 'tinybase/metrics';
import { metric, metricIds } from 'svelte-tinybase';

const metrics = createMetrics(store);
metrics.setMetricDefinition('totalTodos', 'todos', 'count');

const totalTodos = metric(metrics, 'totalTodos');
// $totalTodos is reactive!
```

### Indexes

```typescript
import { createIndexes } from 'tinybase/indexes';
import { sliceIds, sliceRowIds } from 'svelte-tinybase';

const indexes = createIndexes(store);
indexes.setIndexDefinition('byStatus', 'todos', 'status');

const statuses = sliceIds(indexes, 'byStatus');
const doneIds = sliceRowIds(indexes, 'byStatus', 'done');
```

### Relationships

```typescript
import { createRelationships } from 'tinybase/relationships';
import { remoteRowId, localRowIds, linkedRowIds } from 'svelte-tinybase';

const relationships = createRelationships(store);
// ... define relationships
```

### Queries (TinyQL)

```typescript
import { createQueries } from 'tinybase/queries';
import { resultTable, resultRowIds, resultCell } from 'svelte-tinybase';

const queries = createQueries(store);
queries.setQueryDefinition('activeTodos', 'todos', ({ select, where }) => {
  select('title');
  where('done', false);
});

const active = resultTable(queries, 'activeTodos');
```

### Checkpoints (Undo/Redo)

```typescript
import { createCheckpoints } from 'tinybase/checkpoints';
import { canUndo, canRedo, undoRedoInfo } from 'svelte-tinybase';

const checkpoints = createCheckpoints(store);

const undo = canUndo(checkpoints);
const redo = canRedo(checkpoints);
const info = undoRedoInfo(checkpoints);

// $info.canUndo, $info.undoLabel, etc.
```

### Synchronization

```typescript
import { createMergeableStore } from 'tinybase';
import { createWsSynchronizer } from 'tinybase/synchronizers/synchronizer-ws-client';
import { syncStatus, createSyncController } from 'svelte-tinybase';

const store = createMergeableStore();
const synchronizer = createWsSynchronizer(store, new WebSocket('wss://...'));

const controller = createSyncController(synchronizer);
// controller.status, controller.connected are reactive
// controller.startSync(), controller.stopSync(), etc.
```

### Context API

Use `TinyBaseProvider` to provide store context to child components:

```svelte
<script>
  import { TinyBaseProvider } from 'svelte-tinybase';
  import { createStore } from 'tinybase';
  
  const store = createStore();
</script>

<TinyBaseProvider {store}>
  <ChildComponent />
</TinyBaseProvider>
```

In child components:

```svelte
<script>
  import { getStoreContext, table } from 'svelte-tinybase';
  
  const store = getStoreContext();
  const todos = table(store, 'todos');
</script>
```

### Writable Stores

Unlike React hooks, Svelte stores can be writable. Use `*Writable` variants for two-way binding:

```svelte
<script>
  import { cellWritable } from 'svelte-tinybase';
  
  const title = cellWritable(store, 'todos', '1', 'title');
</script>

<input bind:value={$title} />
```

## TypeScript

Full TypeScript support included. Types are inferred from TinyBase.

## License

MIT
# tinybase-svelte
