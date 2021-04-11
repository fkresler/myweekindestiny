export enum CharacterClass {
  HUNTER,
  WARLOCK,
  TITAN,
}

export enum ActivityType {
  DUNGEON,
  RAID,
  SEASONAL,
  PATROL,
  VENDOR,
  CUSTOM,
}

export enum ActivityPlanningState {
  UNDEFINED,
  DONTCARE,
  PLANNED,
  DONE,
}

export type CharacterActivityDefinition = {
  class: CharacterClass;
  planningState: ActivityPlanningState;
  note?: string;
};

export type CharacterActivityDefinitions = {
  [key in CharacterClass]?: CharacterActivityDefinition;
};

export type ActivityDefinition = CharacterActivityDefinitions & {
  id: string;
  order: number;
  name: string;
  type: ActivityType;
};
