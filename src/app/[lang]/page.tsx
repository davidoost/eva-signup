import DismissableAlert from "@/components/dismissable-alert";
import OnboardingForm from "@/forms/onboarding-form";
import getAvailableSubscriptions from "@/functions/get-available-subscriptions";
import getUserRequirements from "@/functions/get-user-requirements";
import listCountries from "@/functions/list-countries";
import listLanguages from "@/functions/list-languages";
import { SearchParams } from "@/types/search-params";
import { Card } from "@nextui-org/react";
import { Alpha2Code } from "i18n-iso-countries";
import { redirect } from "next/navigation";
import {
  defaultLanguage,
  getTranslations,
  availableTranslations,
} from "@/i18n";
import { Translations } from "@/types/translations";
import LanguageSelector from "@/components/language-selector";

export default async function OnboardingPage({
  params,
  searchParams,
}: {
  params: { lang: Alpha2Code };
  searchParams: SearchParams;
}) {
  const userRequirements = await getUserRequirements();
  const countries = await listCountries(params.lang);
  const languages = await listLanguages(params.lang);
  const availableSubscriptions = await getAvailableSubscriptions(params.lang);
  const search = new URLSearchParams(searchParams).toString();

  // Redirect if the language is not available in translations
  if (!(params.lang in availableTranslations)) {
    return redirect(`/${defaultLanguage}?${search}`);
  }

  // Fetch the translations for the valid language
  const translations: Translations = getTranslations(
    params.lang as keyof typeof availableTranslations
  );

  // Filter the languages to only those available in translations
  const availableLanguages = Object.keys(languages)
    .filter((languageKey) => languageKey in availableTranslations)
    .reduce((acc, key) => {
      acc[key] = languages[key];
      return acc;
    }, {} as typeof languages);

  return (
    <Card className="w-full max-w-md flex flex-col gap-4 items-center p-4 shadow-none bg-transparent sm:bg-content1 sm:shadow-md">
      <div className="flex w-full justify-between">
        <p className="w-full text-3xl text-left font-semibold">
          {translations.Labels.SignUpTitle}
        </p>
        <LanguageSelector
          currentLanguage={params.lang}
          availableLanguages={availableLanguages}
        />
      </div>

      {searchParams.errorMessage && (
        <DismissableAlert message={searchParams.errorMessage} color="danger" />
      )}
      <OnboardingForm
        translations={translations}
        userRequirements={userRequirements}
        countries={countries}
        languages={languages}
        searchParams={searchParams}
        subscriptions={availableSubscriptions}
        currentLanguage={params.lang}
      />
    </Card>
  );
}
