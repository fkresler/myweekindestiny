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

export type ActivityDefinition = {
  id: ActivityIdentifier;
  order: number;
  name: string;
  hunterDef?: CharacterActivityDefinition;
  warlockDef?: CharacterActivityDefinition;
  titanDef?: CharacterActivityDefinition;
};

export type CharacterActivityDefinition = {
  isActivated?: boolean;
  note?: string;
};
