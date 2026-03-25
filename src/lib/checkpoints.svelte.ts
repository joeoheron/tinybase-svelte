import type { Checkpoints, CheckpointIds } from 'tinybase/checkpoints';
import type { Id } from 'tinybase';
import { getCheckpointsContext } from './context/index.js';

export function useCheckpointIds(checkpoints?: Checkpoints) {
  const c = checkpoints ?? getCheckpointsContext();
  let current = $state<CheckpointIds>(c.getCheckpointIds());
  $effect(() => {
    current = c.getCheckpointIds();
    const id = c.addCheckpointIdsListener((_c, ids) => { current = ids; });
    return () => c.delListener(id);
  });
  return { get current() { return current; } };
}

export function useCheckpoint(checkpointId: Id, checkpoints?: Checkpoints) {
  const c = checkpoints ?? getCheckpointsContext();
  let current = $state<string | undefined>(c.getCheckpoint(checkpointId));
  $effect(() => {
    current = c.getCheckpoint(checkpointId);
    const id = c.addCheckpointListener(checkpointId, (_c, _cId, label) => { current = label; });
    return () => c.delListener(id);
  });
  return { get current() { return current; } };
}

/**
 * Derived convenience binding: [backwardIds, currentId, forwardIds] broken out.
 * Also exposes canUndo/canRedo and label helpers.
 */
export function useCheckpointState(checkpoints?: Checkpoints) {
  const ids = useCheckpointIds(checkpoints);
  return {
    get backward() { return ids.current[0]; },
    get current() { return ids.current[1]; },
    get forward() { return ids.current[2]; },
    get canUndo() { return ids.current[0].length > 0; },
    get canRedo() { return ids.current[2].length > 0; },
  };
}
