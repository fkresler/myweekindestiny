<script lang="ts">
  import ActivityTile from "./ActivityTile.svelte";
  import type { ActivityDefinition } from "./types";
  import { CharacterClass } from "./types";
  import { weeklyState } from "./weeklyState";

  let weekly_value: ActivityDefinition[];

  const { subscribe, toggleActivityByClass } = weeklyState;

  const unsubscribe = subscribe((value) => {
    weekly_value = value;
  });
</script>

<header>My week in Destiny</header>

<main>
  <section class="section-header">
    <div>Activity</div>
    <div>Hunter</div>
    <div>Warlock</div>
    <div>Titan</div>
  </section>
  <div>
    {#each weekly_value as activity}
      <section>
        <div>{activity.name}</div>
        <div>
          <ActivityTile
            id={`tile-hunter-${activity.id}`}
            characterData={activity[CharacterClass.HUNTER]}
            on:toggleActivity={() =>
              toggleActivityByClass({
                character: CharacterClass.HUNTER,
                activity: activity.id,
              })}
          />
        </div>
        <div>
          <ActivityTile
            id={`tile-warlock-${activity.id}`}
            characterData={activity[CharacterClass.WARLOCK]}
            on:toggleActivity={() =>
              toggleActivityByClass({
                character: CharacterClass.WARLOCK,
                activity: activity.id,
              })}
          />
        </div>
        <div>
          <ActivityTile
            id={`tile-titan-${activity.id}`}
            characterData={activity[CharacterClass.TITAN]}
            on:toggleActivity={() => {
              toggleActivityByClass({
                character: CharacterClass.TITAN,
                activity: activity.id,
              });
            }}
          />
        </div>
      </section>
    {/each}
  </div>
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

  section {
    display: flex;
    flex-direction: row;
  }

  section > * {
    display: block;
    padding: 0.75rem;
    width: 25%;
    text-align: center;
  }

  .section-header {
    font-weight: bold;
  }
</style>
