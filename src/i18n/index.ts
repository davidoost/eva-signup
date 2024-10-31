// i18n/index.ts

import en from "./en";
import nl from "./nl";
import de from "./de";
import es from "./es";
import it from "./it";
import fr from "./fr";

// Default language
export const defaultLanguage = "en";

// Export translations
export const availableTranslations = {
  en,
  nl,
  de,
  es,
  it,
  fr,
};

// Utility function to fetch translations
export const getTranslations = (
  language: keyof typeof availableTranslations
) => {
  return (
    availableTranslations[language] || availableTranslations[defaultLanguage]
  );
};
