<script lang="ts">
  import type { ActivityDefinition } from "./types";
  import { weeklyState } from "./weeklyState";

  let weekly_value: ActivityDefinition[];

  const { subscribe, addActivity } = weeklyState;

  const unsubscribe = subscribe((value) => {
    weekly_value = value;
  });

  let newActivityName;

  const handleAddActivity = () => {
    addActivity({ name: newActivityName });
    newActivityName = "";
  };
</script>

<div>
  <input type="text" bind:value={newActivityName} />
  <button on:click={() => addActivity({ name: newActivityName })}>
    Add another activity
  </button>
</div>
