/**
 * Synchronizer reactive bindings for TinyBase
 * Provides status and control for sync operations
 */

import { readable, writable, type Readable, type Writable } from 'svelte/store';
import type { Synchronizer, StatusListener } from 'tinybase/synchronizers';

/**
 * Synchronizer status values
 */
export enum SyncStatus {
  Idle = 0,
  Loading = 1,
  Saving = 2,
  Syncing = 3,
  Error = 4,
}

/**
 * Synchronizer info type
 */
export interface SyncInfo {
  status: SyncStatus;
  isConnected: boolean;
  error?: Error;
}

/**
 * Returns a reactive store for synchronizer status
 */
export function syncStatus(synchronizer: Synchronizer): Readable<SyncStatus> {
  return readable(synchronizer.getStatus(), (set) => {
    const listener: StatusListener<any> = (_synchronizer, status) => {
      set(status);
    };
    synchronizer.addStatusListener(listener);
    return () => {
      // Note: Synchronizers may not have removeStatusListener, handle gracefully
    };
  });
}

/**
 * Returns a reactive store indicating if the synchronizer is connected/syncing
 */
export function isConnected(synchronizer: Synchronizer): Readable<boolean> {
  return readable(synchronizer.getStatus() > 0, (set) => {
    const listener: StatusListener<any> = (_synchronizer, status) => {
      set(status > 0);
    };
    synchronizer.addStatusListener(listener);
    return () => {};
  });
}

/**
 * Creates a synchronizer controller with reactive state and actions
 */
export function createSyncController(synchronizer: Synchronizer) {
  const status = syncStatus(synchronizer);
  const connected = isConnected(synchronizer);
  
  return {
    status,
    connected,
    
    /**
     * Start synchronization
     */
    async startSync(): Promise<void> {
      await synchronizer.startSync();
    },
    
    /**
     * Stop synchronization
     */
    stopSync(): void {
      synchronizer.stopSync();
    },
    
    /**
     * Load data from remote
     */
    async load(): Promise<void> {
      await synchronizer.load();
    },
    
    /**
     * Save data to remote
     */
    async save(): Promise<void> {
      await synchronizer.save();
    },
    
    /**
     * Destroy the synchronizer
     */
    destroy(): void {
      synchronizer.destroy();
    }
  };
}
