import type { Queries, ResultTable, ResultRow, ResultCell } from 'tinybase/queries';
import type { Id, Ids, CellOrUndefined } from 'tinybase';
import { getQueriesContext } from './context.js';

export function useQueryIds(queries?: Queries) {
  const q = queries ?? getQueriesContext();
  let current = $state<Ids>(q.getQueryIds());
  $effect(() => {
    current = q.getQueryIds();
    const id = q.addQueryIdsListener(() => { current = q.getQueryIds(); });
    return () => q.delListener(id);
  });
  return { get current() { return current; } };
}

export function useResultTable(queryId: Id, queries?: Queries) {
  const q = queries ?? getQueriesContext();
  let current = $state<ResultTable>(q.getResultTable(queryId));
  $effect(() => {
    current = q.getResultTable(queryId);
    const id = q.addResultTableListener(queryId, (_q, _qId, table) => { current = table; });
    return () => q.delListener(id);
  });
  return { get current() { return current; } };
}

export function useResultTableCellIds(queryId: Id, queries?: Queries) {
  const q = queries ?? getQueriesContext();
  let current = $state<Ids>(q.getResultTableCellIds(queryId));
  $effect(() => {
    current = q.getResultTableCellIds(queryId);
    const id = q.addResultTableCellIdsListener(queryId,
      () => { current = q.getResultTableCellIds(queryId); },
    );
    return () => q.delListener(id);
  });
  return { get current() { return current; } };
}

export function useResultRowIds(queryId: Id, queries?: Queries) {
  const q = queries ?? getQueriesContext();
  let current = $state<Ids>(q.getResultRowIds(queryId));
  $effect(() => {
    current = q.getResultRowIds(queryId);
    const id = q.addResultRowIdsListener(queryId,
      (_q, _qId, rowIds) => { current = rowIds; },
    );
    return () => q.delListener(id);
  });
  return { get current() { return current; } };
}

export function useResultSortedRowIds(
  queryId: Id,
  cellId?: Id,
  descending?: boolean,
  offset?: number,
  limit?: number,
  queries?: Queries,
) {
  const q = queries ?? getQueriesContext();
  const get = () => q.getResultSortedRowIds(queryId, cellId, descending, offset, limit);
  let current = $state<Ids>(get());
  $effect(() => {
    current = get();
    const id = q.addResultSortedRowIdsListener(
      queryId, cellId, descending, offset, limit,
      () => { current = get(); },
    );
    return () => q.delListener(id);
  });
  return { get current() { return current; } };
}

export function useResultRowCount(queryId: Id, queries?: Queries) {
  const q = queries ?? getQueriesContext();
  let current = $state(q.getResultRowCount(queryId));
  $effect(() => {
    current = q.getResultRowCount(queryId);
    const id = q.addResultRowCountListener(queryId,
      (_q, _qId, count) => { current = count; },
    );
    return () => q.delListener(id);
  });
  return { get current() { return current; } };
}

export function useResultRow(queryId: Id, rowId: Id, queries?: Queries) {
  const q = queries ?? getQueriesContext();
  let current = $state<ResultRow>(q.getResultRow(queryId, rowId));
  $effect(() => {
    current = q.getResultRow(queryId, rowId);
    const id = q.addResultRowListener(queryId, rowId,
      (_q, _qId, _rId, row) => { current = row; },
    );
    return () => q.delListener(id);
  });
  return { get current() { return current; } };
}

export function useResultCellIds(queryId: Id, rowId: Id, queries?: Queries) {
  const q = queries ?? getQueriesContext();
  let current = $state<Ids>(q.getResultCellIds(queryId, rowId));
  $effect(() => {
    current = q.getResultCellIds(queryId, rowId);
    const id = q.addResultCellIdsListener(queryId, rowId,
      (_q, _qId, _rId, cellIds) => { current = cellIds; },
    );
    return () => q.delListener(id);
  });
  return { get current() { return current; } };
}

export function useResultCell(queryId: Id, rowId: Id, cellId: Id, queries?: Queries) {
  const q = queries ?? getQueriesContext();
  let current = $state<ResultCell | undefined>(q.getResultCell(queryId, rowId, cellId));
  $effect(() => {
    current = q.getResultCell(queryId, rowId, cellId);
    const id = q.addResultCellListener(queryId, rowId, cellId,
      (_q, _qId, _rId, _cId, cell) => { current = cell; },
    );
    return () => q.delListener(id);
  });
  return { get current() { return current; } };
}
