/**
 * Context API for TinyBase in Svelte
 * Provides a way to share TinyBase stores across component trees
 */

import { getContext, setContext } from 'svelte';
import type { Store, MergeableStore, Persister, Synchronizer } from 'tinybase';
import type { Metrics } from 'tinybase/metrics';
import type { Indexes } from 'tinybase/indexes';
import type { Relationships } from 'tinybase/relationships';
import type { Checkpoints } from 'tinybase/checkpoints';
import type { Queries } from 'tinybase/queries';

// Context keys
const STORE_KEY = Symbol('tinybase-store');
const METRICS_KEY = Symbol('tinybase-metrics');
const INDEXES_KEY = Symbol('tinybase-indexes');
const RELATIONSHIPS_KEY = Symbol('tinybase-relationships');
const CHECKPOINTS_KEY = Symbol('tinybase-checkpoints');
const QUERIES_KEY = Symbol('tinybase-queries');
const PERSISTER_KEY = Symbol('tinybase-persister');
const SYNCHRONIZER_KEY = Symbol('tinybase-synchronizer');

type AnyStore = Store | MergeableStore;

// ============================================================================
// Store Context
// ============================================================================

/**
 * Provide a TinyBase store to child components
 */
export function setStoreContext(store: AnyStore): void {
  setContext(STORE_KEY, store);
}

/**
 * Get the TinyBase store from context
 */
export function getStoreContext(): AnyStore {
  const store = getContext<AnyStore>(STORE_KEY);
  if (!store) {
    throw new Error('No TinyBase store found in context. Wrap your component tree with <TinyBaseProvider>.');
  }
  return store;
}

/**
 * Get the TinyBase store from context, or undefined if not set
 */
export function getStoreContextOrUndefined(): AnyStore | undefined {
  return getContext<AnyStore>(STORE_KEY);
}

// ============================================================================
// Metrics Context
// ============================================================================

export function setMetricsContext(metrics: Metrics): void {
  setContext(METRICS_KEY, metrics);
}

export function getMetricsContext(): Metrics {
  const metrics = getContext<Metrics>(METRICS_KEY);
  if (!metrics) {
    throw new Error('No TinyBase Metrics found in context.');
  }
  return metrics;
}

export function getMetricsContextOrUndefined(): Metrics | undefined {
  return getContext<Metrics>(METRICS_KEY);
}

// ============================================================================
// Indexes Context
// ============================================================================

export function setIndexesContext(indexes: Indexes): void {
  setContext(INDEXES_KEY, indexes);
}

export function getIndexesContext(): Indexes {
  const indexes = getContext<Indexes>(INDEXES_KEY);
  if (!indexes) {
    throw new Error('No TinyBase Indexes found in context.');
  }
  return indexes;
}

export function getIndexesContextOrUndefined(): Indexes | undefined {
  return getContext<Indexes>(INDEXES_KEY);
}

// ============================================================================
// Relationships Context
// ============================================================================

export function setRelationshipsContext(relationships: Relationships): void {
  setContext(RELATIONSHIPS_KEY, relationships);
}

export function getRelationshipsContext(): Relationships {
  const relationships = getContext<Relationships>(RELATIONSHIPS_KEY);
  if (!relationships) {
    throw new Error('No TinyBase Relationships found in context.');
  }
  return relationships;
}

export function getRelationshipsContextOrUndefined(): Relationships | undefined {
  return getContext<Relationships>(RELATIONSHIPS_KEY);
}

// ============================================================================
// Checkpoints Context
// ============================================================================

export function setCheckpointsContext(checkpoints: Checkpoints): void {
  setContext(CHECKPOINTS_KEY, checkpoints);
}

export function getCheckpointsContext(): Checkpoints {
  const checkpoints = getContext<Checkpoints>(CHECKPOINTS_KEY);
  if (!checkpoints) {
    throw new Error('No TinyBase Checkpoints found in context.');
  }
  return checkpoints;
}

export function getCheckpointsContextOrUndefined(): Checkpoints | undefined {
  return getContext<Checkpoints>(CHECKPOINTS_KEY);
}

// ============================================================================
// Queries Context
// ============================================================================

export function setQueriesContext(queries: Queries): void {
  setContext(QUERIES_KEY, queries);
}

export function getQueriesContext(): Queries {
  const queries = getContext<Queries>(QUERIES_KEY);
  if (!queries) {
    throw new Error('No TinyBase Queries found in context.');
  }
  return queries;
}

export function getQueriesContextOrUndefined(): Queries | undefined {
  return getContext<Queries>(QUERIES_KEY);
}

// ============================================================================
// Persister Context
// ============================================================================

export function setPersisterContext(persister: Persister): void {
  setContext(PERSISTER_KEY, persister);
}

export function getPersisterContext(): Persister {
  const persister = getContext<Persister>(PERSISTER_KEY);
  if (!persister) {
    throw new Error('No TinyBase Persister found in context.');
  }
  return persister;
}

export function getPersisterContextOrUndefined(): Persister | undefined {
  return getContext<Persister>(PERSISTER_KEY);
}

// ============================================================================
// Synchronizer Context
// ============================================================================

export function setSynchronizerContext(synchronizer: Synchronizer): void {
  setContext(SYNCHRONIZER_KEY, synchronizer);
}

export function getSynchronizerContext(): Synchronizer {
  const synchronizer = getContext<Synchronizer>(SYNCHRONIZER_KEY);
  if (!synchronizer) {
    throw new Error('No TinyBase Synchronizer found in context.');
  }
  return synchronizer;
}

export function getSynchronizerContextOrUndefined(): Synchronizer | undefined {
  return getContext<Synchronizer>(SYNCHRONIZER_KEY);
}
