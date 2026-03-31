<script lang="ts">
  import { useCell } from '$lib';

  let { rowId, onDelete }: { rowId: string; onDelete: () => void } = $props();

  // $derived re-runs useCell when rowId changes (required for reactive props)
  const text = $derived(useCell('todos', rowId, 'text'));
  const done = $derived(useCell('todos', rowId, 'done'));
</script>

<li class:done={done.current}>
  <input
    type="checkbox"
    checked={done.current as boolean}
    onchange={(e) => { done.current = e.currentTarget.checked; }}
  />
  <span>{text.current}</span>
  <button onclick={onDelete}>✕</button>
</li>

<style>
  li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.25rem 0;
  }
  li.done span {
    text-decoration: line-through;
    opacity: 0.5;
  }
  button {
    margin-left: auto;
    background: none;
    border: none;
    cursor: pointer;
    opacity: 0.4;
  }
  button:hover { opacity: 1; }
</style>
