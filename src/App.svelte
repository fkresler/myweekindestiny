<script lang="ts">
  enum CharacterClass {
    HUNTER,
    WARLOCK,
    TITAN,
  }

  enum ActivityIdentifier {
    PRESAGE,
    HARBINGER,
    SHATTERED_THRONE,
    PIT_OF_HERESY,
    PROPHECY,
  }

  type ActivityDefinition = {
    id: ActivityIdentifier;
    order: number;
    name: string;
    hunterDef?: CharacterActivityDefinition;
    warlockDef?: CharacterActivityDefinition;
    titanDef?: CharacterActivityDefinition;
  };

  type CharacterActivityDefinition = {
    isActivated?: boolean;
    note?: string;
  };

  const ActivityState: ActivityDefinition[] = [
    {
      id: ActivityIdentifier.PRESAGE,
      order: 1,
      name: "Presage",
    },
    {
      id: ActivityIdentifier.HARBINGER,
      order: 2,
      name: "Harbinger",
    },
    {
      id: ActivityIdentifier.SHATTERED_THRONE,
      order: 3,
      name: "Shattered Throne",
    },
    {
      id: ActivityIdentifier.PIT_OF_HERESY,
      order: 4,
      name: "Pit of Heresy",
    },
    {
      id: ActivityIdentifier.PROPHECY,
      order: 5,
      name: "Prophecy",
    },
  ];

  const handleToggleActivity = (
    character: CharacterClass,
    activity: ActivityIdentifier
  ) => {
    const theActivity = ActivityState.find(
      (singleActivity) => singleActivity.id === activity
    );
    const activityClone = { ...theActivity };
    switch (character) {
      case CharacterClass.HUNTER:
        const previousHunterActivated = activityClone.hunterDef?.isActivated;
        const changedHunterActivity: ActivityDefinition = {
          ...activityClone,
          hunterDef: {
            ...activityClone.hunterDef,
            isActivated: !previousHunterActivated,
          },
        };
        ActivityState[activity] = changedHunterActivity;
        return;
      case CharacterClass.WARLOCK:
        const previousWarlockActivated = activityClone.warlockDef?.isActivated;
        const changedWarlockActivity: ActivityDefinition = {
          ...activityClone,
          warlockDef: {
            ...activityClone.warlockDef,
            isActivated: !previousWarlockActivated,
          },
        };
        ActivityState[activity] = changedWarlockActivity;
        return;
      case CharacterClass.TITAN:
        const previousTitanActivated = activityClone.titanDef?.isActivated;
        const changedTitanActivity: ActivityDefinition = {
          ...activityClone,
          titanDef: {
            ...activityClone.titanDef,
            isActivated: !previousTitanActivated,
          },
        };
        ActivityState[activity] = changedTitanActivity;
        return;
      default:
        return;
    }
  };
</script>

<header>My week in Destiny</header>

<main>
  <section class="section-header">
    <div>Hunter</div>
    <div>Warlock</div>
    <div>Titan</div>
  </section>
  <div>
    {#each ActivityState as activity}
      <section>
        <div>
          {#if activity?.hunterDef?.isActivated}
            LETS GO, ITS ACTIVE
          {/if}
          {activity.name}
          <button
            on:click={() =>
              handleToggleActivity(CharacterClass.HUNTER, activity.id)}
          >
            Activate Hunter!
          </button>
        </div>
        <div>
          {#if activity?.warlockDef?.isActivated}
            LETS GO, ITS ACTIVE
          {/if}
          {activity.name}
          <button
            on:click={() =>
              handleToggleActivity(CharacterClass.WARLOCK, activity.id)}
          >
            Activate Warlock!
          </button>
        </div>
        <div>
          {#if activity?.titanDef?.isActivated}
            LETS GO, ITS ACTIVE
          {/if}
          {activity.name}
          <button
            on:click={() =>
              handleToggleActivity(CharacterClass.TITAN, activity.id)}
          >
            Activate Titan!
          </button>
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
    width: 33%;
    text-align: center;
  }

  .section-header {
    font-weight: bold;
  }
</style>
