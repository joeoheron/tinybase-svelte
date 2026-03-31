/**
 * Core Store reactive bindings for TinyBase using Svelte 5 runes.
 *
 * Call these functions at the top level of a component script (same rule as hooks).
 * For reactive parameters that change over time, wrap the call in $derived.
 *
 * @example
 * ```svelte
 * <script>
 *   import { useRowIds, useCell } from 'svelte-tinybase';
 *   const store = getStoreContext();
 *   const ids = useRowIds('todos', store);
 *   const title = useCell('todos', rowId, 'title', store);
 * </script>
 * {#each ids.current as id}{title.current}{/each}
 * ```
 */

import type {
  Store,
  MergeableStore,
  Tables,
  Table,
  Row,
  Cell,
  Values,
  Value,
  Id,
  Ids,
  CellOrUndefined,
  ValueOrUndefined,
} from 'tinybase';
import { getStoreContext } from './context.js';

type AnyStore = Store | MergeableStore;

// ── TABLES ───────────────────────────────────────────────────────────────────

export function useHasTables(store?: AnyStore) {
  const s = store ?? getStoreContext();
  let current = $state(s.hasTables());
  $effect(() => {
    current = s.hasTables();
    const id = s.addHasTablesListener((_s, has) => { current = has; });
    return () => s.delListener(id);
  });
  return { get current() { return current; } };
}

export function useTables(store?: AnyStore) {
  const s = store ?? getStoreContext();
  let current = $state<Tables>(s.getTables());
  $effect(() => {
    current = s.getTables();
    const id = s.addTablesListener(() => { current = s.getTables(); });
    return () => s.delListener(id);
  });
  return { get current() { return current; } };
}

export function useTableIds(store?: AnyStore) {
  const s = store ?? getStoreContext();
  let current = $state<Ids>(s.getTableIds());
  $effect(() => {
    current = s.getTableIds();
    const id = s.addTableIdsListener(() => { current = s.getTableIds(); });
    return () => s.delListener(id);
  });
  return { get current() { return current; } };
}

// ── TABLE ────────────────────────────────────────────────────────────────────

export function useHasTable(tableId: Id, store?: AnyStore) {
  const s = store ?? getStoreContext();
  let current = $state(s.hasTable(tableId));
  $effect(() => {
    current = s.hasTable(tableId);
    const id = s.addHasTableListener(tableId, (_s, _tId, has) => { current = has; });
    return () => s.delListener(id);
  });
  return { get current() { return current; } };
}

export function useTable(tableId: Id, store?: AnyStore) {
  const s = store ?? getStoreContext();
  let current = $state<Table>(s.getTable(tableId));
  $effect(() => {
    current = s.getTable(tableId);
    const id = s.addTableListener(tableId, () => { current = s.getTable(tableId); });
    return () => s.delListener(id);
  });
  return { get current() { return current; } };
}

export function useTableCellIds(tableId: Id, store?: AnyStore) {
  const s = store ?? getStoreContext();
  let current = $state<Ids>(s.getTableCellIds(tableId));
  $effect(() => {
    current = s.getTableCellIds(tableId);
    const id = s.addTableCellIdsListener(tableId, () => { current = s.getTableCellIds(tableId); });
    return () => s.delListener(id);
  });
  return { get current() { return current; } };
}

// ── ROWS ─────────────────────────────────────────────────────────────────────

export function useRowIds(tableId: Id, store?: AnyStore) {
  const s = store ?? getStoreContext();
  let current = $state<Ids>(s.getRowIds(tableId));
  $effect(() => {
    current = s.getRowIds(tableId);
    const id = s.addRowIdsListener(tableId, () => { current = s.getRowIds(tableId); });
    return () => s.delListener(id);
  });
  return { get current() { return current; } };
}

export function useSortedRowIds(
  tableId: Id,
  cellId?: Id,
  descending?: boolean,
  offset?: number,
  limit?: number,
  store?: AnyStore,
) {
  const s = store ?? getStoreContext();
  const get = () => s.getSortedRowIds(tableId, cellId, descending, offset, limit);
  let current = $state<Ids>(get());
  $effect(() => {
    current = get();
    const id = s.addSortedRowIdsListener(
      tableId, cellId, descending, offset, limit,
      () => { current = get(); },
    );
    return () => s.delListener(id);
  });
  return { get current() { return current; } };
}

export function useRowCount(tableId: Id, store?: AnyStore) {
  const s = store ?? getStoreContext();
  let current = $state(s.getRowCount(tableId));
  $effect(() => {
    current = s.getRowCount(tableId);
    const id = s.addRowCountListener(tableId, (_s, _tId, count) => { current = count; });
    return () => s.delListener(id);
  });
  return { get current() { return current; } };
}

export function useHasRow(tableId: Id, rowId: Id, store?: AnyStore) {
  const s = store ?? getStoreContext();
  let current = $state(s.hasRow(tableId, rowId));
  $effect(() => {
    current = s.hasRow(tableId, rowId);
    const id = s.addHasRowListener(tableId, rowId, (_s, _tId, _rId, has) => { current = has; });
    return () => s.delListener(id);
  });
  return { get current() { return current; } };
}

export function useRow(tableId: Id, rowId: Id, store?: AnyStore) {
  const s = store ?? getStoreContext();
  let current = $state<Row>(s.getRow(tableId, rowId));
  $effect(() => {
    current = s.getRow(tableId, rowId);
    const id = s.addRowListener(tableId, rowId, () => { current = s.getRow(tableId, rowId); });
    return () => s.delListener(id);
  });
  return {
    get current() { return current; },
    set current(v: Row) { s.setRow(tableId, rowId, v); },
  };
}

// ── CELLS ────────────────────────────────────────────────────────────────────

export function useCellIds(tableId: Id, rowId: Id, store?: AnyStore) {
  const s = store ?? getStoreContext();
  let current = $state<Ids>(s.getCellIds(tableId, rowId));
  $effect(() => {
    current = s.getCellIds(tableId, rowId);
    const id = s.addCellIdsListener(tableId, rowId, () => { current = s.getCellIds(tableId, rowId); });
    return () => s.delListener(id);
  });
  return { get current() { return current; } };
}

export function useHasCell(tableId: Id, rowId: Id, cellId: Id, store?: AnyStore) {
  const s = store ?? getStoreContext();
  let current = $state(s.hasCell(tableId, rowId, cellId));
  $effect(() => {
    current = s.hasCell(tableId, rowId, cellId);
    const id = s.addHasCellListener(tableId, rowId, cellId,
      (_s, _tId, _rId, _cId, has) => { current = has; },
    );
    return () => s.delListener(id);
  });
  return { get current() { return current; } };
}

export function useCell(tableId: Id, rowId: Id, cellId: Id, store?: AnyStore) {
  const s = store ?? getStoreContext();
  let current = $state<CellOrUndefined>(s.getCell(tableId, rowId, cellId));
  $effect(() => {
    current = s.getCell(tableId, rowId, cellId);
    const id = s.addCellListener(tableId, rowId, cellId,
      (_s, _tId, _rId, _cId, newCell) => { current = newCell; },
    );
    return () => s.delListener(id);
  });
  return {
    get current() { return current; },
    set current(v: CellOrUndefined) {
      if (v !== undefined) s.setCell(tableId, rowId, cellId, v as Cell);
      else s.delCell(tableId, rowId, cellId);
    },
  };
}

// ── VALUES ───────────────────────────────────────────────────────────────────

export function useHasValues(store?: AnyStore) {
  const s = store ?? getStoreContext();
  let current = $state(s.hasValues());
  $effect(() => {
    current = s.hasValues();
    const id = s.addHasValuesListener((_s, has) => { current = has; });
    return () => s.delListener(id);
  });
  return { get current() { return current; } };
}

export function useValues(store?: AnyStore) {
  const s = store ?? getStoreContext();
  let current = $state<Values>(s.getValues());
  $effect(() => {
    current = s.getValues();
    const id = s.addValuesListener(() => { current = s.getValues(); });
    return () => s.delListener(id);
  });
  return { get current() { return current; } };
}

export function useValueIds(store?: AnyStore) {
  const s = store ?? getStoreContext();
  let current = $state<Ids>(s.getValueIds());
  $effect(() => {
    current = s.getValueIds();
    const id = s.addValueIdsListener(() => { current = s.getValueIds(); });
    return () => s.delListener(id);
  });
  return { get current() { return current; } };
}

export function useHasValue(valueId: Id, store?: AnyStore) {
  const s = store ?? getStoreContext();
  let current = $state(s.hasValue(valueId));
  $effect(() => {
    current = s.hasValue(valueId);
    const id = s.addHasValueListener(valueId, (_s, _vId, has) => { current = has; });
    return () => s.delListener(id);
  });
  return { get current() { return current; } };
}

export function useValue(valueId: Id, store?: AnyStore) {
  const s = store ?? getStoreContext();
  let current = $state<ValueOrUndefined>(s.getValue(valueId));
  $effect(() => {
    current = s.getValue(valueId);
    const id = s.addValueListener(valueId, (_s, _vId, newValue) => { current = newValue; });
    return () => s.delListener(id);
  });
  return {
    get current() { return current; },
    set current(v: ValueOrUndefined) {
      if (v !== undefined) s.setValue(valueId, v as Value);
      else s.delValue(valueId);
    },
  };
}
