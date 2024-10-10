import DismissableAlert from "@/components/dismissable-alert";
import OnboardingForm from "@/forms/onboarding-form";
import getAvailableSubscriptions from "@/functions/get-available-subscriptions";

import getTranslations from "@/functions/get-translations";
import getUserRequirements from "@/functions/get-user-requirements";
import listCountries from "@/functions/list-countries";
import listLanguages from "@/functions/list-languages";
import { SearchParams } from "@/types/search-params";
import { Card } from "@nextui-org/react";
import { Alpha2Code } from "i18n-iso-countries";
import { redirect } from "next/navigation";

export default async function OnboardingPage({
  params,
  searchParams,
}: {
  params: { lang: Alpha2Code };
  searchParams: SearchParams;
}) {
  const translations = await getTranslations(params.lang);
  const userRequirements = await getUserRequirements();
  const countries = await listCountries(params.lang);
  const languages = await listLanguages(params.lang);
  const availableSubscriptions = await getAvailableSubscriptions(params.lang);

  if (!translations) {
    const search = new URLSearchParams(searchParams).toString();
    return redirect(`/en?${search}`);
  }

  return (
    <Card className="w-full max-w-md flex flex-col gap-4 items-center p-4 shadow-none bg-transparent sm:bg-content1 sm:shadow-md">
      <p className="w-full text-3xl text-left font-semibold">
        {translations.Labels.SignUpTitle}
      </p>
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
