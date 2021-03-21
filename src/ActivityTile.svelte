<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { CharacterActivityDefinition } from "./types";

  const dispatch = createEventDispatcher();

  export let characterData: CharacterActivityDefinition;

  $: ({ isActivated, note } = characterData || {
    isActivated: false,
    note: "",
  });

  const handleToggle = () => dispatch("toggleActivity");
</script>

<div on:click={handleToggle}>
  {#if isActivated}
    ITS ACTIVE
  {:else}
    INACTIVE
  {/if}
  {#if note}
    {note}
  {/if}
</div>
