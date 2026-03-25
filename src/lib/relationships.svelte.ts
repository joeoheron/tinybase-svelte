import type { Relationships } from 'tinybase/relationships';
import type { Id, Ids } from 'tinybase';
import { getRelationshipsContext } from './context/index.js';

export function useRelationshipIds(relationships?: Relationships) {
  const r = relationships ?? getRelationshipsContext();
  let current = $state<Ids>(r.getRelationshipIds());
  $effect(() => {
    current = r.getRelationshipIds();
    const id = r.addRelationshipIdsListener(() => { current = r.getRelationshipIds(); });
    return () => r.delListener(id);
  });
  return { get current() { return current; } };
}

export function useRemoteRowId(relationshipId: Id, localRowId: Id, relationships?: Relationships) {
  const r = relationships ?? getRelationshipsContext();
  let current = $state<Id | undefined>(r.getRemoteRowId(relationshipId, localRowId));
  $effect(() => {
    current = r.getRemoteRowId(relationshipId, localRowId);
    const id = r.addRemoteRowIdListener(relationshipId, localRowId,
      (_r, _rId, _lId, remoteRowId) => { current = remoteRowId; },
    );
    return () => r.delListener(id);
  });
  return { get current() { return current; } };
}

export function useLocalRowIds(relationshipId: Id, remoteRowId: Id, relationships?: Relationships) {
  const r = relationships ?? getRelationshipsContext();
  let current = $state<Ids>(r.getLocalRowIds(relationshipId, remoteRowId));
  $effect(() => {
    current = r.getLocalRowIds(relationshipId, remoteRowId);
    const id = r.addLocalRowIdsListener(relationshipId, remoteRowId,
      (_r, _rId, _rmId, localRowIds) => { current = localRowIds; },
    );
    return () => r.delListener(id);
  });
  return { get current() { return current; } };
}

export function useLinkedRowIds(relationshipId: Id, firstRowId: Id, relationships?: Relationships) {
  const r = relationships ?? getRelationshipsContext();
  let current = $state<Ids>(r.getLinkedRowIds(relationshipId, firstRowId));
  $effect(() => {
    current = r.getLinkedRowIds(relationshipId, firstRowId);
    const id = r.addLinkedRowIdsListener(relationshipId, firstRowId,
      (_r, _rId, _fId, linkedRowIds) => { current = linkedRowIds; },
    );
    return () => r.delListener(id);
  });
  return { get current() { return current; } };
}
