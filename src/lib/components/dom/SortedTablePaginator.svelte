<script lang="ts">
  import type { Store, MergeableStore } from 'tinybase';
  import type { Id } from 'tinybase';
  import { useRowCount } from '../../store.svelte.js';

  let {
    tableId,
    cellId,
    descending = false,
    offset = $bindable(0),
    limit,
    total,
    store,
  }: {
    tableId: Id;
    cellId?: Id;
    descending?: boolean;
    offset?: number;
    limit: number;
    total?: number;
    store?: Store | MergeableStore;
  } = $props();

  const rowCount = $derived(useRowCount(tableId, store));
  const totalRows = $derived(total ?? rowCount.current);
  const pageCount = $derived(Math.ceil(totalRows / limit));
  const currentPage = $derived(Math.floor(offset / limit) + 1);

  function prev() {
    offset = Math.max(0, offset - limit);
  }

  function next() {
    offset = Math.min((pageCount - 1) * limit, offset + limit);
  }
</script>

<div class="tb-paginator">
  <button onclick={prev} disabled={offset === 0}>&larr; Prev</button>
  <span>Page {currentPage} of {pageCount}</span>
  <button onclick={next} disabled={offset + limit >= totalRows}>Next &rarr;</button>
</div>
