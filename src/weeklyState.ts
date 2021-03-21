import { writable } from "svelte/store";
import {
  ActivityDefinition,
  ActivityIdentifier,
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

const createWeeklyState = () => {
  const { subscribe, update } = writable(parsedWeeklyState);

  const toggleActivityByClass = ({
    character,
    activities,
  }: {
    character: CharacterClass;
    activities: ActivityIdentifier[];
  }) =>
    update((prevState) => {
      const newWeeklyState = prevState.map((singleActivity) => {
        if (activities.includes(singleActivity.id)) {
          return {
            ...singleActivity,
            [character]: {
              ...singleActivity[character],
              isActivated: !singleActivity[character]?.isActivated,
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
  };
};

export const weeklyState = createWeeklyState();

weeklyState.subscribe((value) => {
  const encodedWeeklyState = !!value
    ? JSON.stringify(value)
    : JSON.stringify(defaultActivityState);

  localStorage.setItem(MY_WEEKLY_STORAGE_KEY, encodedWeeklyState);
});
