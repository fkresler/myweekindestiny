import { writable } from "svelte/store";
import {
  ActivityDefinition,
  ActivityIdentifier,
  ActivityPlanningState,
  CharacterClass,
} from "./types";

const MY_WEEKLY_STORAGE_KEY = "myweekindestiny";

const defaultActivityState: ActivityDefinition[] = [
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

  const toggleActivityByClass = ({
    character,
    activity,
  }: {
    character: CharacterClass;
    activity: ActivityIdentifier;
  }) =>
    update((prevState) => {
      const newWeeklyState = prevState.map((singleActivity) => {
        if (singleActivity.id === activity) {
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

  const setPlanningStateByClassActivities = ({
    character,
    activities,
    state = ActivityPlanningState.UNDEFINED,
  }: {
    character: CharacterClass;
    activities: ActivityIdentifier[];
    state: ActivityPlanningState;
  }) =>
    update((prevState) => {
      const newWeeklyState = prevState.map((singleActivity) => {
        if (activities.includes(singleActivity.id)) {
          return {
            ...singleActivity,
            [character]: {
              ...singleActivity[character],
              planningState: state,
            },
          };
        } else {
          return { ...singleActivity };
        }
      });
      return newWeeklyState;
    });

  return {
    subscribe,
    toggleActivityByClass,
    setPlanningStateByClassActivities,
  };
};

export const weeklyState = createWeeklyState();

weeklyState.subscribe((value) => {
  const encodedWeeklyState = !!value
    ? JSON.stringify(value)
    : JSON.stringify(defaultActivityState);

  localStorage.setItem(MY_WEEKLY_STORAGE_KEY, encodedWeeklyState);
});
