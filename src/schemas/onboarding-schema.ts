import { z } from "zod";
import { UserRequirements } from "@/types/user-requirements";
import countries from "i18n-iso-countries";
import { getAlpha2Codes } from "@cospired/i18n-iso-languages";

// Get all valid Alpha-2 country codes
const validCountryCodes = Object.keys(countries.getAlpha2Codes()) as [
  string,
  ...string[]
];

// Get all valid Alpha-2 language codes
const validLanguageCodes = Object.keys(getAlpha2Codes()) as [
  string,
  ...string[]
];

// Phone number regex pattern (international format)
const phoneNumberRegex = /^\+?[1-9]\d{1,14}$/;

// Function to generate the schema based on user requirements
export function generateOnboardingSchema(userRequirements: UserRequirements) {
  return z
    .object({
      EmailAddress: z.string().email(),
      FirstName:
        userRequirements.FirstName?.RequiredFor === 1 ||
        userRequirements.FirstName?.RequiredFor === 7
          ? z.string().min(1)
          : z.string().optional(),
      LastName:
        userRequirements.LastName?.RequiredFor === 1 ||
        userRequirements.LastName?.RequiredFor === 7
          ? z.string().min(1)
          : z.string().optional(),
      DateOfBirth:
        userRequirements.DateOfBirth?.RequiredFor === 1 ||
        userRequirements.DateOfBirth?.RequiredFor === 7
          ? z.string().min(1) // Assuming you're storing DateOfBirth as a string (YYYY-MM-DD)
          : z.string().optional(),
      Gender:
        userRequirements.Gender?.RequiredFor === 1 ||
        userRequirements.Gender?.RequiredFor === 7
          ? z.enum(["M", "F", "O"])
          : z.enum(["M", "F", "O"]).optional(),
      CountryID:
        userRequirements.CountryID?.RequiredFor === 1 ||
        userRequirements.CountryID?.RequiredFor === 7
          ? z.enum(validCountryCodes)
          : z.enum(validCountryCodes).optional(),
      LanguageID:
        userRequirements.LanguageID?.RequiredFor === 1 ||
        userRequirements.LanguageID?.RequiredFor === 7
          ? z.enum(validLanguageCodes)
          : z.enum(validLanguageCodes).optional(),
      PhoneNumber:
        userRequirements.PhoneNumber?.RequiredFor === 1 ||
        userRequirements.PhoneNumber?.RequiredFor === 7
          ? z.string().regex(phoneNumberRegex, "Invalid phone number format")
          : z
              .string()
              .regex(phoneNumberRegex, "Invalid phone number format")
              .optional(),
      Password:
        userRequirements.Password?.RequiredFor === 1 ||
        userRequirements.Password?.RequiredFor === 7
          ? z.string().min(8)
          : z.string().optional(),
      ConfirmPassword:
        userRequirements.ConfirmPassword?.RequiredFor === 1 ||
        userRequirements.ConfirmPassword?.RequiredFor === 7
          ? z.string().min(8)
          : z.string().optional(),
      OrderAppToken: z.string().optional(),
      OrderID: z.string().optional(),
      PreferredStoreID: z.string().optional(),
      RedirectURL: z.string().optional(),
      Subscriptions: z.array(z.string()).optional(),
    })
    .refine((data) => data.Password === data.ConfirmPassword, {
      path: ["ConfirmPassword"],
    });
}
