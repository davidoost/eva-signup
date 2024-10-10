import { SearchParams } from "@/types/search-params";
import { redirect } from "next/navigation";
import { defaultLanguage } from "@/i18n";

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const queryString = new URLSearchParams(searchParams).toString();
  const destination = queryString
    ? `/${defaultLanguage}?${queryString}`
    : `/en`;
  return redirect(destination);
}
