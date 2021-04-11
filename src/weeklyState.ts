import { writable } from "svelte/store";
import {
  ActivityType,
  ActivityDefinition,
  ActivityPlanningState,
  CharacterClass,
} from "./types";

const MY_WEEKLY_STORAGE_KEY = "myweekindestiny";

const defaultActivityState: ActivityDefinition[] = [
  {
    id: "PRESAGE",
    order: 1,
    name: "Presage",
    type: ActivityType.DUNGEON,
  },
  {
    id: "HARBINGER",
    order: 2,
    name: "Harbinger",
    type: ActivityType.DUNGEON,
  },
  {
    id: "SHATTEREDTHRONE",
    order: 3,
    name: "Shattered Throne",
    type: ActivityType.DUNGEON,
  },
  {
    id: "PITOFHERESY",
    order: 4,
    name: "Pit of Heresy",
    type: ActivityType.DUNGEON,
  },
  {
    id: "PROPHECY",
    order: 5,
    name: "Prophecy",
    type: ActivityType.DUNGEON,
  },
];

const storedWeeklyState = localStorage.getItem(MY_WEEKLY_STORAGE_KEY);
const parsedWeeklyState = storedWeeklyState
  ? (JSON.parse(storedWeeklyState) as ActivityDefinition[])
  : defaultActivityState;

const getNextPlanningState = (state: ActivityPlanningState) => {
  switch (state) {
    case ActivityPlanningState.UNDEFINED:
      return ActivityPlanningState.PLANNED;
    case ActivityPlanningState.PLANNED:
      return ActivityPlanningState.DONE;
    case ActivityPlanningState.DONE:
      return ActivityPlanningState.DONTCARE;
    case ActivityPlanningState.DONTCARE:
      return ActivityPlanningState.PLANNED;
    default:
      return ActivityPlanningState.UNDEFINED;
  }
};

const createWeeklyState = () => {
  const { subscribe, update } = writable(parsedWeeklyState);

  const toggleActivity = ({
    character,
    activity,
  }: {
    character: CharacterClass;
    activity: string;
  }) =>
    update((prevState) => {
      const newWeeklyState = prevState.map((singleActivity) => {
        if (singleActivity.name === activity) {
          const previousPlanningState =
            singleActivity[character]?.planningState ||
            ActivityPlanningState.UNDEFINED;
          return {
            ...singleActivity,
            [character]: {
              ...singleActivity[character],
              planningState: getNextPlanningState(previousPlanningState),
            },
          };
        } else {
          return { ...singleActivity };
        }
      });
      return newWeeklyState;
    });

  const addActivity = ({ name }: { name: string }) => {
    update((prevState) => {
      const newActivity: ActivityDefinition = {
        id: Date.now().toString(),
        order: prevState.length,
        name,
        type: ActivityType.CUSTOM,
      };
      return [...prevState, newActivity];
    });
  };

  const removeActivity = ({ id }: { id: string }) => {
    update((prevState) => {
      return prevState.filter((activity) => activity.id !== id);
    });
  };

  return {
    subscribe,
    toggleActivity,
    addActivity,
    removeActivity,
  };
};

export const weeklyState = createWeeklyState();

weeklyState.subscribe((value) => {
  const encodedWeeklyState = !!value
    ? JSON.stringify(value)
    : JSON.stringify(defaultActivityState);

  localStorage.setItem(MY_WEEKLY_STORAGE_KEY, encodedWeeklyState);
});
