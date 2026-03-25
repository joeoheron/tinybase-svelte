/**
 * Store-level reactive bindings for TinyBase
 * Mirrors tinybase/ui-react store hooks
 */

import { readable, writable, derived, type Readable, type Writable } from 'svelte/store';
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
  MapCell
} from 'tinybase';

type AnyStore = Store | MergeableStore;

// ============================================================================
// TABLES
// ============================================================================

/**
 * Returns a reactive store containing all Tables data
 * Equivalent to React's useTables
 */
export function tables(store: AnyStore): Readable<Tables> {
  return readable(store.getTables(), (set) => {
    const listenerId = store.addTablesListener(() => {
      set(store.getTables());
    });
    return () => store.delListener(listenerId);
  });
}

/**
 * Returns a reactive store for TableIds
 * Equivalent to React's useTableIds
 */
export function tableIds(store: AnyStore): Readable<Ids> {
  return readable(store.getTableIds(), (set) => {
    const listenerId = store.addTableIdsListener(() => {
      set(store.getTableIds());
    });
    return () => store.delListener(listenerId);
  });
}

/**
 * Returns a reactive store indicating if any Tables exist
 * Equivalent to React's useHasTables
 */
export function hasTables(store: AnyStore): Readable<boolean> {
  return readable(store.hasTables(), (set) => {
    const listenerId = store.addHasTablesListener((_store, hasTables) => {
      set(hasTables);
    });
    return () => store.delListener(listenerId);
  });
}

// ============================================================================
// TABLE
// ============================================================================

/**
 * Returns a reactive store for a single Table
 * Equivalent to React's useTable
 */
export function table(store: AnyStore, tableId: Id): Readable<Table> {
  return readable(store.getTable(tableId), (set) => {
    const listenerId = store.addTableListener(tableId, () => {
      set(store.getTable(tableId));
    });
    return () => store.delListener(listenerId);
  });
}

/**
 * Returns a reactive store indicating if a Table exists
 * Equivalent to React's useHasTable
 */
export function hasTable(store: AnyStore, tableId: Id): Readable<boolean> {
  return readable(store.hasTable(tableId), (set) => {
    const listenerId = store.addHasTableListener(tableId, (_store, _tableId, hasTable) => {
      set(hasTable);
    });
    return () => store.delListener(listenerId);
  });
}

/**
 * Returns a reactive store for CellIds used in a Table
 * Equivalent to React's useTableCellIds
 */
export function tableCellIds(store: AnyStore, tableId: Id): Readable<Ids> {
  return readable(store.getTableCellIds(tableId), (set) => {
    const listenerId = store.addTableCellIdsListener(tableId, () => {
      set(store.getTableCellIds(tableId));
    });
    return () => store.delListener(listenerId);
  });
}

// ============================================================================
// ROW
// ============================================================================

/**
 * Returns a reactive store for RowIds in a Table
 * Equivalent to React's useRowIds
 */
export function rowIds(store: AnyStore, tableId: Id): Readable<Ids> {
  return readable(store.getRowIds(tableId), (set) => {
    const listenerId = store.addRowIdsListener(tableId, () => {
      set(store.getRowIds(tableId));
    });
    return () => store.delListener(listenerId);
  });
}

/**
 * Returns a reactive store for sorted RowIds
 * Equivalent to React's useSortedRowIds
 */
export function sortedRowIds(
  store: AnyStore,
  tableId: Id,
  cellId?: Id,
  descending?: boolean,
  offset?: number,
  limit?: number
): Readable<Ids> {
  const getSorted = () => store.getSortedRowIds(tableId, cellId, descending, offset, limit);
  
  return readable(getSorted(), (set) => {
    const listenerId = store.addSortedRowIdsListener(
      tableId,
      cellId,
      descending,
      offset,
      limit,
      () => set(getSorted())
    );
    return () => store.delListener(listenerId);
  });
}

/**
 * Returns a reactive store for the row count
 * Equivalent to React's useRowCount
 */
export function rowCount(store: AnyStore, tableId: Id): Readable<number> {
  return readable(store.getRowCount(tableId), (set) => {
    const listenerId = store.addRowCountListener(tableId, (_store, _tableId, count) => {
      set(count);
    });
    return () => store.delListener(listenerId);
  });
}

/**
 * Returns a reactive store for a single Row
 * Equivalent to React's useRow
 */
export function row(store: AnyStore, tableId: Id, rowId: Id): Readable<Row> {
  return readable(store.getRow(tableId, rowId), (set) => {
    const listenerId = store.addRowListener(tableId, rowId, () => {
      set(store.getRow(tableId, rowId));
    });
    return () => store.delListener(listenerId);
  });
}

/**
 * Returns a writable reactive store for a single Row
 */
export function rowWritable(store: AnyStore, tableId: Id, rowId: Id): Writable<Row> {
  const { subscribe } = row(store, tableId, rowId);
  
  return {
    subscribe,
    set: (value: Row) => store.setRow(tableId, rowId, value),
    update: (fn: (value: Row) => Row) => {
      store.setRow(tableId, rowId, fn(store.getRow(tableId, rowId)));
    }
  };
}

/**
 * Returns a reactive store indicating if a Row exists
 * Equivalent to React's useHasRow
 */
export function hasRow(store: AnyStore, tableId: Id, rowId: Id): Readable<boolean> {
  return readable(store.hasRow(tableId, rowId), (set) => {
    const listenerId = store.addHasRowListener(tableId, rowId, (_store, _tableId, _rowId, hasRow) => {
      set(hasRow);
    });
    return () => store.delListener(listenerId);
  });
}

// ============================================================================
// CELL
// ============================================================================

/**
 * Returns a reactive store for CellIds in a Row
 * Equivalent to React's useCellIds
 */
export function cellIds(store: AnyStore, tableId: Id, rowId: Id): Readable<Ids> {
  return readable(store.getCellIds(tableId, rowId), (set) => {
    const listenerId = store.addCellIdsListener(tableId, rowId, () => {
      set(store.getCellIds(tableId, rowId));
    });
    return () => store.delListener(listenerId);
  });
}

/**
 * Returns a reactive store for a single Cell
 * Equivalent to React's useCell
 */
export function cell(store: AnyStore, tableId: Id, rowId: Id, cellId: Id): Readable<CellOrUndefined> {
  return readable(store.getCell(tableId, rowId, cellId), (set) => {
    const listenerId = store.addCellListener(tableId, rowId, cellId, (_store, _tableId, _rowId, _cellId, newCell) => {
      set(newCell);
    });
    return () => store.delListener(listenerId);
  });
}

/**
 * Returns a writable reactive store for a single Cell
 */
export function cellWritable(store: AnyStore, tableId: Id, rowId: Id, cellId: Id): Writable<CellOrUndefined> {
  const { subscribe } = cell(store, tableId, rowId, cellId);
  
  return {
    subscribe,
    set: (value: CellOrUndefined) => {
      if (value !== undefined) {
        store.setCell(tableId, rowId, cellId, value as Cell);
      } else {
        store.delCell(tableId, rowId, cellId);
      }
    },
    update: (fn: (value: CellOrUndefined) => CellOrUndefined) => {
      const current = store.getCell(tableId, rowId, cellId);
      const newValue = fn(current);
      if (newValue !== undefined) {
        store.setCell(tableId, rowId, cellId, newValue as Cell);
      } else {
        store.delCell(tableId, rowId, cellId);
      }
    }
  };
}

/**
 * Returns a reactive store indicating if a Cell exists
 * Equivalent to React's useHasCell
 */
export function hasCell(store: AnyStore, tableId: Id, rowId: Id, cellId: Id): Readable<boolean> {
  return readable(store.hasCell(tableId, rowId, cellId), (set) => {
    const listenerId = store.addHasCellListener(tableId, rowId, cellId, (_store, _tableId, _rowId, _cellId, hasCell) => {
      set(hasCell);
    });
    return () => store.delListener(listenerId);
  });
}

// ============================================================================
// VALUES
// ============================================================================

/**
 * Returns a reactive store for all Values
 * Equivalent to React's useValues
 */
export function values(store: AnyStore): Readable<Values> {
  return readable(store.getValues(), (set) => {
    const listenerId = store.addValuesListener(() => {
      set(store.getValues());
    });
    return () => store.delListener(listenerId);
  });
}

/**
 * Returns a reactive store for ValueIds
 * Equivalent to React's useValueIds
 */
export function valueIds(store: AnyStore): Readable<Ids> {
  return readable(store.getValueIds(), (set) => {
    const listenerId = store.addValueIdsListener(() => {
      set(store.getValueIds());
    });
    return () => store.delListener(listenerId);
  });
}

/**
 * Returns a reactive store indicating if any Values exist
 * Equivalent to React's useHasValues
 */
export function hasValues(store: AnyStore): Readable<boolean> {
  return readable(store.hasValues(), (set) => {
    const listenerId = store.addHasValuesListener((_store, hasValues) => {
      set(hasValues);
    });
    return () => store.delListener(listenerId);
  });
}

/**
 * Returns a reactive store for a single Value
 * Equivalent to React's useValue
 */
export function value(store: AnyStore, valueId: Id): Readable<Value | undefined> {
  return readable(store.getValue(valueId), (set) => {
    const listenerId = store.addValueListener(valueId, (_store, _valueId, newValue) => {
      set(newValue);
    });
    return () => store.delListener(listenerId);
  });
}

/**
 * Returns a writable reactive store for a single Value
 */
export function valueWritable(store: AnyStore, valueId: Id): Writable<Value | undefined> {
  const { subscribe } = value(store, valueId);
  
  return {
    subscribe,
    set: (val: Value | undefined) => {
      if (val !== undefined) {
        store.setValue(valueId, val);
      } else {
        store.delValue(valueId);
      }
    },
    update: (fn: (value: Value | undefined) => Value | undefined) => {
      const current = store.getValue(valueId);
      const newValue = fn(current);
      if (newValue !== undefined) {
        store.setValue(valueId, newValue);
      } else {
        store.delValue(valueId);
      }
    }
  };
}

/**
 * Returns a reactive store indicating if a Value exists
 * Equivalent to React's useHasValue
 */
export function hasValue(store: AnyStore, valueId: Id): Readable<boolean> {
  return readable(store.hasValue(valueId), (set) => {
    const listenerId = store.addHasValueListener(valueId, (_store, _valueId, hasValue) => {
      set(hasValue);
    });
    return () => store.delListener(listenerId);
  });
}
