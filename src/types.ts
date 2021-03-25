export enum CharacterClass {
  HUNTER,
  WARLOCK,
  TITAN,
}

export enum ActivityIdentifier {
  PRESAGE,
  HARBINGER,
  SHATTERED_THRONE,
  PIT_OF_HERESY,
  PROPHECY,
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
  id: ActivityIdentifier;
  order: number;
  name: string;
};
