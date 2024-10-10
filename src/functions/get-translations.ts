"use server";

import { Translations } from "@/types/translations";
import { Alpha2Code } from "i18n-iso-countries";

export default async function getTranslations(lang: Alpha2Code) {
  try {
    const { translations }: { translations: Translations } = await import(
      `@/i18n/${lang}`
    );
    return translations;
  } catch (error) {
    console.error(
      `No translations found for requested language "${lang}".`,
      error
    );
    return null; // Return null or some other fallback value if translations are not found
  }
}
