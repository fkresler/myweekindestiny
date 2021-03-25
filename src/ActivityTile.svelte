<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { CharacterActivityDefinition } from "./types";
  import { ActivityPlanningState } from "./types";

  const dispatch = createEventDispatcher();

  export let id: string;
  export let characterData: CharacterActivityDefinition;

  $: ({ planningState, note } = characterData || {
    planningState: ActivityPlanningState.UNDEFINED,
    note: "",
  });

  const handleToggle = () => dispatch("toggleActivity");
</script>

<div on:click|preventDefault={handleToggle}>
  {#if planningState === ActivityPlanningState.PLANNED}
    <div class="tile planning-planned">Planned ...</div>
  {:else if planningState === ActivityPlanningState.DONE}
    <div class="tile planning-done">Done!</div>
  {:else if planningState === ActivityPlanningState.DONTCARE}
    <div class="tile planning-dontcare">Do not care</div>
  {:else}
    <div class="tile planning-undecided">Undecided ...</div>
  {/if}
</div>

<style>
  .tile {
    cursor: pointer;
    user-select: none;
    padding: 0.5rem;
    border-radius: 3px;
  }

  .planning-undecided {
    background-color: grey;
  }

  .planning-planned {
    background-color: goldenrod;
  }

  .planning-done {
    background-color: green;
  }

  .planning-dontcare {
    background-color: red;
  }
</style>
