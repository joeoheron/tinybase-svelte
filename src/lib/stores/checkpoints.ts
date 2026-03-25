/**
 * Checkpoints reactive bindings for TinyBase (undo/redo)
 * Mirrors tinybase/ui-react checkpoints hooks
 */

import { readable, derived, type Readable } from 'svelte/store';
import type { Checkpoints, CheckpointIds, CheckpointId } from 'tinybase/checkpoints';
import type { Id } from 'tinybase';

/**
 * Returns a reactive store for all CheckpointIds [backwardIds, currentId, forwardIds]
 * Equivalent to React's useCheckpointIds
 */
export function checkpointIds(checkpoints: Checkpoints): Readable<CheckpointIds> {
  return readable(checkpoints.getCheckpointIds(), (set) => {
    const listenerId = checkpoints.addCheckpointIdsListener((_checkpoints, checkpointIds) => {
      set(checkpointIds);
    });
    return () => checkpoints.delListener(listenerId);
  });
}

/**
 * Returns a reactive store for the current CheckpointId
 */
export function currentCheckpointId(checkpoints: Checkpoints): Readable<CheckpointId | undefined> {
  return derived(checkpointIds(checkpoints), ($ids) => $ids[1]);
}

/**
 * Returns a reactive store for backward (undo) CheckpointIds
 */
export function backwardCheckpointIds(checkpoints: Checkpoints): Readable<CheckpointId[]> {
  return derived(checkpointIds(checkpoints), ($ids) => $ids[0]);
}

/**
 * Returns a reactive store for forward (redo) CheckpointIds
 */
export function forwardCheckpointIds(checkpoints: Checkpoints): Readable<CheckpointId[]> {
  return derived(checkpointIds(checkpoints), ($ids) => $ids[2]);
}

/**
 * Returns a reactive store for a Checkpoint's label
 * Equivalent to React's useCheckpoint
 */
export function checkpoint(checkpoints: Checkpoints, checkpointId: Id): Readable<string | undefined> {
  return readable(checkpoints.getCheckpoint(checkpointId), (set) => {
    const listenerId = checkpoints.addCheckpointListener(checkpointId, (_checkpoints, _checkpointId, label) => {
      set(label);
    });
    return () => checkpoints.delListener(listenerId);
  });
}

/**
 * Returns a reactive store indicating if undo is available
 */
export function canUndo(checkpoints: Checkpoints): Readable<boolean> {
  return derived(backwardCheckpointIds(checkpoints), ($ids) => $ids.length > 0);
}

/**
 * Returns a reactive store indicating if redo is available
 */
export function canRedo(checkpoints: Checkpoints): Readable<boolean> {
  return derived(forwardCheckpointIds(checkpoints), ($ids) => $ids.length > 0);
}

/**
 * Undo/Redo information type
 */
export interface UndoRedoInfo {
  canUndo: boolean;
  canRedo: boolean;
  undoLabel: string | undefined;
  redoLabel: string | undefined;
  currentLabel: string | undefined;
}

/**
 * Returns a reactive store with full undo/redo information
 */
export function undoRedoInfo(checkpoints: Checkpoints): Readable<UndoRedoInfo> {
  return derived(checkpointIds(checkpoints), ($ids) => {
    const [backward, current, forward] = $ids;
    return {
      canUndo: backward.length > 0,
      canRedo: forward.length > 0,
      undoLabel: backward.length > 0 ? checkpoints.getCheckpoint(backward[backward.length - 1]) : undefined,
      redoLabel: forward.length > 0 ? checkpoints.getCheckpoint(forward[0]) : undefined,
      currentLabel: current !== undefined ? checkpoints.getCheckpoint(current) : undefined,
    };
  });
}
