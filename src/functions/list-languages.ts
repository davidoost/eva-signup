"use server";

import { Languages } from "@/types/languages";
import languages from "@cospired/i18n-iso-languages";

export default async function listLanguages(language: string) {
  const languagesList: Languages = languages.getNames(language);
  return languagesList;
}
