import { SearchParams } from "@/types/search-params";
import { redirect } from "next/navigation";

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const queryString = new URLSearchParams(searchParams).toString();
  const destination = queryString ? `/en?${queryString}` : `/en`;
  return redirect(destination);
}
