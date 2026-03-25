/**
 * Indexes reactive bindings for TinyBase
 * Mirrors tinybase/ui-react indexes hooks
 */

import { readable, type Readable } from 'svelte/store';
import type { Indexes, IndexIds, SliceIds } from 'tinybase/indexes';
import type { Id, Ids } from 'tinybase';

/**
 * Returns a reactive store for all IndexIds
 */
export function indexIds(indexes: Indexes): Readable<IndexIds> {
  return readable(indexes.getIndexIds(), (set) => {
    const listenerId = indexes.addIndexIdsListener(() => {
      set(indexes.getIndexIds());
    });
    return () => indexes.delListener(listenerId);
  });
}

/**
 * Returns a reactive store for SliceIds in an Index
 * Equivalent to React's useSliceIds
 */
export function sliceIds(indexes: Indexes, indexId: Id): Readable<SliceIds> {
  return readable(indexes.getSliceIds(indexId), (set) => {
    const listenerId = indexes.addSliceIdsListener(indexId, (_indexes, _indexId, sliceIds) => {
      set(sliceIds);
    });
    return () => indexes.delListener(listenerId);
  });
}

/**
 * Returns a reactive store for RowIds in a Slice
 * Equivalent to React's useSliceRowIds
 */
export function sliceRowIds(indexes: Indexes, indexId: Id, sliceId: Id): Readable<Ids> {
  return readable(indexes.getSliceRowIds(indexId, sliceId), (set) => {
    const listenerId = indexes.addSliceRowIdsListener(indexId, sliceId, (_indexes, _indexId, _sliceId, rowIds) => {
      set(rowIds);
    });
    return () => indexes.delListener(listenerId);
  });
}
