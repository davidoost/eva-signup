"use server";

import { Countries } from "@/types/countries";
import countries, { Alpha2Code } from "i18n-iso-countries";

export default async function listCountries(language: Alpha2Code) {
  const list = countries.getNames(language);
  const countriesList = list as Countries;
  return countriesList;
}
