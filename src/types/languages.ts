import { getAlpha2Codes } from "@cospired/i18n-iso-languages";

export type Alpha2Languages = Extract<
  keyof ReturnType<typeof getAlpha2Codes>,
  string
>;

export type Languages = Record<Alpha2Languages, string>;
