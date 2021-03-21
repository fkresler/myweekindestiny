<script lang="ts">
  import ActivityTile from "./ActivityTile.svelte";
  import type { ActivityDefinition, ActivityIdentifier } from "./types";
  import { CharacterClass } from "./types";
  import { weeklyState } from "./weeklyState";

  let weekly_value: ActivityDefinition[];

  const unsubscribe = weeklyState.subscribe((value) => {
    weekly_value = value;
  });

  const handleToggleActivity = (
    character: CharacterClass,
    activity: ActivityIdentifier
  ) => {
    const theActivity = weekly_value.find(
      (singleActivity) => singleActivity.id === activity
    );
    let newActivityDefinition: ActivityDefinition;
    switch (character) {
      case CharacterClass.HUNTER:
        const previousHunterActivated = theActivity.hunterDef?.isActivated;
        newActivityDefinition = {
          ...theActivity,
          hunterDef: {
            ...theActivity.hunterDef,
            isActivated: !previousHunterActivated,
          },
        };
        break;
      case CharacterClass.WARLOCK:
        const previousWarlockActivated = theActivity.warlockDef?.isActivated;
        newActivityDefinition = {
          ...theActivity,
          warlockDef: {
            ...theActivity.warlockDef,
            isActivated: !previousWarlockActivated,
          },
        };
        break;
      case CharacterClass.TITAN:
        const previousTitanActivated = theActivity.titanDef?.isActivated;
        newActivityDefinition = {
          ...theActivity,
          titanDef: {
            ...theActivity.titanDef,
            isActivated: !previousTitanActivated,
          },
        };
        break;
      default:
        newActivityDefinition = { ...theActivity };
    }
    const newWeeklyState = weekly_value.map((singleActivity) => {
      if (singleActivity.id === activity) {
        return newActivityDefinition;
      } else {
        return { ...singleActivity };
      }
    });
    weeklyState.set(newWeeklyState);
  };
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
            characterData={activity.hunterDef}
            on:toggleActivity={() =>
              handleToggleActivity(CharacterClass.HUNTER, activity.id)}
          />
        </div>
        <div>
          <ActivityTile
            characterData={activity.warlockDef}
            on:toggleActivity={() =>
              handleToggleActivity(CharacterClass.WARLOCK, activity.id)}
          />
        </div>
        <div>
          <ActivityTile
            characterData={activity.titanDef}
            on:toggleActivity={() => {
              handleToggleActivity(CharacterClass.TITAN, activity.id);
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
