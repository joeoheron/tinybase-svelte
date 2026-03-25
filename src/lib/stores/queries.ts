/**
 * Queries reactive bindings for TinyBase (TinyQL)
 * Mirrors tinybase/ui-react queries hooks
 */

import { readable, type Readable } from 'svelte/store';
import type { Queries, QueryIds, ResultTable, ResultRow, ResultCell, ResultCellIds } from 'tinybase/queries';
import type { Id, Ids, CellOrUndefined } from 'tinybase';

/**
 * Returns a reactive store for all QueryIds
 */
export function queryIds(queries: Queries): Readable<QueryIds> {
  return readable(queries.getQueryIds(), (set) => {
    const listenerId = queries.addQueryIdsListener(() => {
      set(queries.getQueryIds());
    });
    return () => queries.delListener(listenerId);
  });
}

/**
 * Returns a reactive store for a ResultTable
 * Equivalent to React's useResultTable
 */
export function resultTable(queries: Queries, queryId: Id): Readable<ResultTable> {
  return readable(queries.getResultTable(queryId), (set) => {
    const listenerId = queries.addResultTableListener(queryId, (_queries, _queryId, table) => {
      set(table);
    });
    return () => queries.delListener(listenerId);
  });
}

/**
 * Returns a reactive store for ResultRowIds
 * Equivalent to React's useResultRowIds
 */
export function resultRowIds(queries: Queries, queryId: Id): Readable<Ids> {
  return readable(queries.getResultRowIds(queryId), (set) => {
    const listenerId = queries.addResultRowIdsListener(queryId, (_queries, _queryId, rowIds) => {
      set(rowIds);
    });
    return () => queries.delListener(listenerId);
  });
}

/**
 * Returns a reactive store for sorted ResultRowIds
 * Equivalent to React's useResultSortedRowIds
 */
export function resultSortedRowIds(
  queries: Queries,
  queryId: Id,
  cellId?: Id,
  descending?: boolean,
  offset?: number,
  limit?: number
): Readable<Ids> {
  const getSorted = () => queries.getResultSortedRowIds(queryId, cellId, descending, offset, limit);
  
  return readable(getSorted(), (set) => {
    const listenerId = queries.addResultSortedRowIdsListener(
      queryId,
      cellId,
      descending,
      offset,
      limit,
      () => set(getSorted())
    );
    return () => queries.delListener(listenerId);
  });
}

/**
 * Returns a reactive store for the result row count
 */
export function resultRowCount(queries: Queries, queryId: Id): Readable<number> {
  return readable(queries.getResultRowCount(queryId), (set) => {
    const listenerId = queries.addResultRowCountListener(queryId, (_queries, _queryId, count) => {
      set(count);
    });
    return () => queries.delListener(listenerId);
  });
}

/**
 * Returns a reactive store for a ResultRow
 * Equivalent to React's useResultRow
 */
export function resultRow(queries: Queries, queryId: Id, rowId: Id): Readable<ResultRow> {
  return readable(queries.getResultRow(queryId, rowId), (set) => {
    const listenerId = queries.addResultRowListener(queryId, rowId, (_queries, _queryId, _rowId, row) => {
      set(row);
    });
    return () => queries.delListener(listenerId);
  });
}

/**
 * Returns a reactive store for ResultCellIds
 * Equivalent to React's useResultCellIds
 */
export function resultCellIds(queries: Queries, queryId: Id, rowId: Id): Readable<ResultCellIds> {
  return readable(queries.getResultCellIds(queryId, rowId), (set) => {
    const listenerId = queries.addResultCellIdsListener(queryId, rowId, (_queries, _queryId, _rowId, cellIds) => {
      set(cellIds);
    });
    return () => queries.delListener(listenerId);
  });
}

/**
 * Returns a reactive store for a ResultCell
 * Equivalent to React's useResultCell
 */
export function resultCell(queries: Queries, queryId: Id, rowId: Id, cellId: Id): Readable<ResultCell> {
  return readable(queries.getResultCell(queryId, rowId, cellId), (set) => {
    const listenerId = queries.addResultCellListener(queryId, rowId, cellId, (_queries, _queryId, _rowId, _cellId, cell) => {
      set(cell);
    });
    return () => queries.delListener(listenerId);
  });
}
