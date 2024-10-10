import { Alpha2Code } from "i18n-iso-countries";
import { Alpha2Languages } from "./languages";

export type OnboardingFormData = {
  EmailAddress: string;
  FirstName?: string;
  LastName?: string;
  DateOfBirth?: string;
  Gender?: "F" | "M" | "O";
  CountryID?: Alpha2Code;
  LanguageID?: Alpha2Languages;
  PhoneNumber?: string;
  OrderAppToken?: string;
  OrderID?: string;
  PreferredStoreID?: string;
  RedirectURL?: string;
  Subscriptions?: string[];
  Password?: string;
  ConfirmPassword?: string;
};
