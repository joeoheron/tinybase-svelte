import type { Metrics } from 'tinybase/metrics';
import type { Id, Ids } from 'tinybase';
import { getMetricsContext } from './context/index.js';

export function useMetricIds(metrics?: Metrics) {
  const m = metrics ?? getMetricsContext();
  let current = $state<Ids>(m.getMetricIds());
  $effect(() => {
    current = m.getMetricIds();
    const id = m.addMetricIdsListener(() => { current = m.getMetricIds(); });
    return () => m.delListener(id);
  });
  return { get current() { return current; } };
}

export function useMetric(metricId: Id, metrics?: Metrics) {
  const m = metrics ?? getMetricsContext();
  let current = $state<number | undefined>(m.getMetric(metricId));
  $effect(() => {
    current = m.getMetric(metricId);
    const id = m.addMetricListener(metricId, (_m, _mId, newMetric) => { current = newMetric; });
    return () => m.delListener(id);
  });
  return { get current() { return current; } };
}
