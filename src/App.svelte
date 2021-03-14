<script lang="ts">
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

  enum ActivityIdentifier {
    PRESAGE,
    HARBINGER,
    SHATTERED_THRONE,
    PIT_OF_HERESY,
    PROPHECY,
  }

  const activities: ActivityDefinition[] = [
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
</script>

<header>My week in Destiny</header>

<main>
  <section>
    <div class="section-header">Hunter</div>
    {#each activities as activity}
      <div>{activity.name}</div>
    {/each}
  </section>
  <section>
    <div class="section-header">Titan</div>
    {#each activities as activity}
      <div>{activity.name}</div>
    {/each}
  </section>
  <section>
    <div class="section-header">Warlock</div>
    {#each activities as activity}
      <div>{activity.name}</div>
    {/each}
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
    display: flex;
    flex-direction: row;
    padding: 1rem;
    margin: 0 auto;
  }

  section {
    display: inline-block;
    width: 33%;
    text-align: center;
  }

  section > * {
    display: block;
    padding: 0.75rem;
  }

  .section-header {
    font-weight: bold;
  }
</style>
