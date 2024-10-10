import getTranslations from "@/functions/get-translations";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Card } from "@nextui-org/react";
import { Alpha2Code } from "i18n-iso-countries";
import { redirect } from "next/navigation";

export default async function SuccessPage({
  params,
  searchParams,
}: {
  params: { lang: Alpha2Code };
  searchParams: { orderId: string };
}) {
  const translations = await getTranslations(params.lang);

  if (!translations) {
    const search = new URLSearchParams(searchParams).toString();
    return redirect(`/en/success?${search}`);
  }
  return (
    <Card className="w-full max-w-md flex flex-col gap-4 items-center p-4 shadow-none bg-transparent sm:bg-content1 sm:shadow-md">
      <div className="w-full flex flex-col">
        <p className="w-full text-3xl text-left font-semibold">
          {translations.Labels.SuccessTitle}
        </p>
        <p className="w-full text-sm text-left text-default-500">
          {translations.Labels.SuccessDescription}
        </p>
      </div>
      {searchParams.orderId && (
        <div className="w-full flex items-center rounded-md border border-primary bg-primary/30 p-4 gap-2">
          <Icon
            width={32}
            icon="tabler:shopping-bag-check"
            className="text-primary"
          />
          <p className="text-sm text-primary">
            {translations.Labels.Order} #{searchParams.orderId}{" "}
            {translations.Labels.OrderAttached}
          </p>
        </div>
      )}
    </Card>
  );
}
