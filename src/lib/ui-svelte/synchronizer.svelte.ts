import type { Synchronizer } from 'tinybase/synchronizers';
import { getSynchronizerContext } from './context.js';

export function useSyncStatus(synchronizer?: Synchronizer) {
  const s = synchronizer ?? getSynchronizerContext();
  let current = $state(s.getStatus());
  $effect(() => {
    current = s.getStatus();
    const id = s.addStatusListener((_s, status) => { current = status; });
    return () => s.delListener(id);
  });
  return { get current() { return current; } };
}

export function useIsConnected(synchronizer?: Synchronizer) {
  const s = synchronizer ?? getSynchronizerContext();
  let current = $state(s.getStatus() > 0);
  $effect(() => {
    current = s.getStatus() > 0;
    const id = s.addStatusListener((_s, status) => { current = status > 0; });
    return () => s.delListener(id);
  });
  return { get current() { return current; } };
}
