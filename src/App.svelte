<script lang="ts">
  import ActivityTile from "./ActivityTile.svelte";
  import AddActivity from "./AddActivity.svelte";
  import type { ActivityDefinition } from "./types";
  import { CharacterClass } from "./types";
  import { weeklyState } from "./weeklyState";

  let weekly_value: ActivityDefinition[];

  const { subscribe, toggleActivity, removeActivity } = weeklyState;

  const unsubscribe = subscribe((value) => {
    weekly_value = value;
  });
</script>

<header>My week in Destiny</header>

<main>
  <section class="section-header table-row">
    <div>Activity</div>
    <div>Hunter</div>
    <div>Warlock</div>
    <div>Titan</div>
  </section>
  <section>
    {#each weekly_value as activity}
      <div class="table-row">
        <div>
          <span>{activity.name}</span>
          <button on:click={() => removeActivity({ id: activity.id })}
            >Remove</button
          >
        </div>
        <div>
          <ActivityTile
            id={`tile-hunter-${activity.id}`}
            characterData={activity[CharacterClass.HUNTER]}
            on:toggleActivity={() =>
              toggleActivity({
                character: CharacterClass.HUNTER,
                activity: activity.name,
              })}
          />
        </div>
        <div>
          <ActivityTile
            id={`tile-warlock-${activity.id}`}
            characterData={activity[CharacterClass.WARLOCK]}
            on:toggleActivity={() =>
              toggleActivity({
                character: CharacterClass.WARLOCK,
                activity: activity.name,
              })}
          />
        </div>
        <div>
          <ActivityTile
            id={`tile-titan-${activity.id}`}
            characterData={activity[CharacterClass.TITAN]}
            on:toggleActivity={() => {
              toggleActivity({
                character: CharacterClass.TITAN,
                activity: activity.name,
              });
            }}
          />
        </div>
      </div>
    {/each}
  </section>
  <section>
    <AddActivity />
  </section>
</main>

<style>
  header {
    font-weight: bold;
    font-size: 150%;
    padding: 1rem;
    border-bottom: 2px solid lightgrey;
  }

  main {
    padding: 1rem;
    margin: 0 auto;
  }

  .table-row {
    display: flex;
    flex-direction: row;
  }

  .table-row > * {
    display: block;
    padding: 0.75rem;
    width: 25%;
    text-align: center;
  }

  .section-header {
    font-weight: bold;
  }
</style>
