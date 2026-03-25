/**
 * Metrics reactive bindings for TinyBase
 * Mirrors tinybase/ui-react metrics hooks
 */

import { readable, type Readable } from 'svelte/store';
import type { Metrics, MetricIds } from 'tinybase/metrics';
import type { Id } from 'tinybase';

/**
 * Returns a reactive store for all MetricIds
 */
export function metricIds(metrics: Metrics): Readable<MetricIds> {
  return readable(metrics.getMetricIds(), (set) => {
    // Metrics don't have an IDs listener, so we listen to all metrics
    const listenerId = metrics.addMetricIdsListener(() => {
      set(metrics.getMetricIds());
    });
    return () => metrics.delListener(listenerId);
  });
}

/**
 * Returns a reactive store for a single Metric value
 * Equivalent to React's useMetric
 */
export function metric(metrics: Metrics, metricId: Id): Readable<number | undefined> {
  return readable(metrics.getMetric(metricId), (set) => {
    const listenerId = metrics.addMetricListener(metricId, (_metrics, _metricId, newMetric) => {
      set(newMetric);
    });
    return () => metrics.delListener(listenerId);
  });
}
