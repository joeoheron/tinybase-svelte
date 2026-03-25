/**
 * Relationships reactive bindings for TinyBase
 * Mirrors tinybase/ui-react relationships hooks
 */

import { readable, type Readable } from 'svelte/store';
import type { Relationships, RelationshipIds } from 'tinybase/relationships';
import type { Id, Ids, Row } from 'tinybase';

/**
 * Returns a reactive store for all RelationshipIds
 */
export function relationshipIds(relationships: Relationships): Readable<RelationshipIds> {
  return readable(relationships.getRelationshipIds(), (set) => {
    const listenerId = relationships.addRelationshipIdsListener(() => {
      set(relationships.getRelationshipIds());
    });
    return () => relationships.delListener(listenerId);
  });
}

/**
 * Returns a reactive store for the remote RowId for a given local Row
 * Equivalent to React's useRemoteRowId
 */
export function remoteRowId(
  relationships: Relationships,
  relationshipId: Id,
  localRowId: Id
): Readable<Id | undefined> {
  return readable(relationships.getRemoteRowId(relationshipId, localRowId), (set) => {
    const listenerId = relationships.addRemoteRowIdListener(
      relationshipId,
      localRowId,
      (_relationships, _relationshipId, _localRowId, remoteRowId) => {
        set(remoteRowId);
      }
    );
    return () => relationships.delListener(listenerId);
  });
}

/**
 * Returns a reactive store for local RowIds linked to a remote Row
 * Equivalent to React's useLocalRowIds
 */
export function localRowIds(
  relationships: Relationships,
  relationshipId: Id,
  remoteRowId: Id
): Readable<Ids> {
  return readable(relationships.getLocalRowIds(relationshipId, remoteRowId), (set) => {
    const listenerId = relationships.addLocalRowIdsListener(
      relationshipId,
      remoteRowId,
      (_relationships, _relationshipId, _remoteRowId, localRowIds) => {
        set(localRowIds);
      }
    );
    return () => relationships.delListener(listenerId);
  });
}

/**
 * Returns a reactive store for linked RowIds
 * Equivalent to React's useLinkedRowIds
 */
export function linkedRowIds(
  relationships: Relationships,
  relationshipId: Id,
  firstRowId: Id
): Readable<Ids> {
  return readable(relationships.getLinkedRowIds(relationshipId, firstRowId), (set) => {
    const listenerId = relationships.addLinkedRowIdsListener(
      relationshipId,
      firstRowId,
      (_relationships, _relationshipId, _firstRowId, linkedRowIds) => {
        set(linkedRowIds);
      }
    );
    return () => relationships.delListener(listenerId);
  });
}
