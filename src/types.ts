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

export type CharacterActivityDefinition = {
  class: CharacterClass;
  isActivated?: boolean;
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
