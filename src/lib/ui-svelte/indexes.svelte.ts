import type { Indexes } from 'tinybase/indexes';
import type { Id, Ids } from 'tinybase';
import { getIndexesContext } from './context.js';

export function useIndexIds(indexes?: Indexes) {
  const ix = indexes ?? getIndexesContext();
  let current = $state<Ids>(ix.getIndexIds());
  $effect(() => {
    current = ix.getIndexIds();
    const id = ix.addIndexIdsListener(() => { current = ix.getIndexIds(); });
    return () => ix.delListener(id);
  });
  return { get current() { return current; } };
}

export function useSliceIds(indexId: Id, indexes?: Indexes) {
  const ix = indexes ?? getIndexesContext();
  let current = $state<Ids>(ix.getSliceIds(indexId));
  $effect(() => {
    current = ix.getSliceIds(indexId);
    const id = ix.addSliceIdsListener(indexId, (_ix, _iId, sliceIds) => { current = sliceIds; });
    return () => ix.delListener(id);
  });
  return { get current() { return current; } };
}

export function useSliceRowIds(indexId: Id, sliceId: Id, indexes?: Indexes) {
  const ix = indexes ?? getIndexesContext();
  let current = $state<Ids>(ix.getSliceRowIds(indexId, sliceId));
  $effect(() => {
    current = ix.getSliceRowIds(indexId, sliceId);
    const id = ix.addSliceRowIdsListener(indexId, sliceId,
      (_ix, _iId, _sId, rowIds) => { current = rowIds; },
    );
    return () => ix.delListener(id);
  });
  return { get current() { return current; } };
}
