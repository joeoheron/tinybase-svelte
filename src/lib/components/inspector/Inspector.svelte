<script lang="ts">
  import { getStoreContext } from '../../context/index.js';
  import { useTables, useValues } from '../../store.svelte.js';

  let {
    position = 'right',
    open = $bindable(false),
    hue = 270,
  }: {
    position?: 'right' | 'left' | 'bottom' | 'top';
    open?: boolean;
    hue?: number;
  } = $props();

  const store = getStoreContext();
  const tables = useTables(store);
  const values = useValues(store);

  function toggle() {
    open = !open;
  }

  const panelStyle = $derived(`--tb-hue: ${hue}`);
</script>

<div class="tb-inspector tb-inspector--{position}" style={panelStyle}>
  <button
    class="tb-inspector__nub"
    onclick={toggle}
    aria-label={open ? 'Close inspector' : 'Open inspector'}
    aria-expanded={open}
  >
    &#x1F50D;
  </button>

  {#if open}
    <div class="tb-inspector__panel">
      <header class="tb-inspector__header">
        <strong>TinyBase Inspector</strong>
        <button class="tb-inspector__close" onclick={toggle} aria-label="Close">&#x2715;</button>
      </header>

      <section class="tb-inspector__section">
        <h3>Tables</h3>
        {#each Object.entries(tables.current) as [tableId, table] (tableId)}
          <details>
            <summary><code>{tableId}</code> ({Object.keys(table).length} rows)</summary>
            <div class="tb-inspector__table-wrapper">
              <table>
                <tbody>
                  {#each Object.entries(table) as [rowId, row] (rowId)}
                    <tr>
                      <td class="tb-inspector__id">{rowId}</td>
                      <td>
                        {#each Object.entries(row) as [cellId, cell] (cellId)}
                          <span class="tb-inspector__cell">
                            <em>{cellId}</em>: {String(cell)}
                          </span>
                        {/each}
                      </td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
          </details>
        {/each}
        {#if Object.keys(tables.current).length === 0}
          <p class="tb-inspector__empty">No tables</p>
        {/if}
      </section>

      <section class="tb-inspector__section">
        <h3>Values</h3>
        {#if Object.keys(values.current).length > 0}
          <ul>
            {#each Object.entries(values.current) as [vId, v] (vId)}
              <li><em>{vId}</em>: {String(v)}</li>
            {/each}
          </ul>
        {:else}
          <p class="tb-inspector__empty">No values</p>
        {/if}
      </section>
    </div>
  {/if}
</div>

<style>
  .tb-inspector {
    position: fixed;
    z-index: 9999;
    font-family: monospace;
    font-size: 12px;
  }

  .tb-inspector--right {
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    display: flex;
    flex-direction: row-reverse;
    align-items: flex-start;
  }

  .tb-inspector--left {
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  }

  .tb-inspector--bottom {
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column-reverse;
    align-items: flex-start;
  }

  .tb-inspector--top {
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .tb-inspector__nub {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: hsl(var(--tb-hue, 270), 60%, 50%);
    color: white;
    border: none;
    cursor: pointer;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }

  .tb-inspector__nub:hover {
    background: hsl(var(--tb-hue, 270), 60%, 40%);
  }

  .tb-inspector__panel {
    background: hsl(var(--tb-hue, 270), 20%, 12%);
    color: hsl(var(--tb-hue, 270), 10%, 90%);
    border: 1px solid hsl(var(--tb-hue, 270), 30%, 30%);
    border-radius: 8px;
    width: 320px;
    max-height: 480px;
    overflow-y: auto;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.5);
    margin: 4px;
  }

  .tb-inspector__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    border-bottom: 1px solid hsl(var(--tb-hue, 270), 30%, 25%);
    position: sticky;
    top: 0;
    background: hsl(var(--tb-hue, 270), 20%, 12%);
  }

  .tb-inspector__close {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    font-size: 14px;
    padding: 2px 4px;
  }

  .tb-inspector__section {
    padding: 8px 12px;
    border-bottom: 1px solid hsl(var(--tb-hue, 270), 30%, 20%);
  }

  .tb-inspector__section h3 {
    margin: 0 0 6px;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: hsl(var(--tb-hue, 270), 60%, 70%);
  }

  .tb-inspector__section details {
    margin-bottom: 4px;
  }

  .tb-inspector__section summary {
    cursor: pointer;
    padding: 2px 0;
  }

  .tb-inspector__section summary:hover {
    color: hsl(var(--tb-hue, 270), 60%, 70%);
  }

  .tb-inspector__table-wrapper {
    overflow-x: auto;
    margin-top: 4px;
  }

  .tb-inspector__section table {
    border-collapse: collapse;
    width: 100%;
  }

  .tb-inspector__section td {
    padding: 2px 6px;
    border-bottom: 1px solid hsl(var(--tb-hue, 270), 20%, 20%);
    vertical-align: top;
  }

  .tb-inspector__id {
    color: hsl(var(--tb-hue, 270), 60%, 70%);
    white-space: nowrap;
  }

  .tb-inspector__cell {
    display: inline-block;
    margin-right: 8px;
  }

  .tb-inspector__section ul {
    margin: 0;
    padding: 0 0 0 16px;
  }

  .tb-inspector__section li {
    padding: 1px 0;
  }

  .tb-inspector__empty {
    margin: 0;
    color: hsl(var(--tb-hue, 270), 10%, 50%);
    font-style: italic;
  }

  code {
    color: hsl(var(--tb-hue, 270), 60%, 75%);
  }

  em {
    color: hsl(var(--tb-hue, 270), 50%, 65%);
    font-style: normal;
  }
</style>
