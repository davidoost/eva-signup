export type UserRequirement = {
  ID: string;
  Display: boolean;
  RequiredFor: 0 | 1 | 2 | 4 | 7;
};

type UserRequirementKeys =
  | "EmailAddress"
  | "FirstName"
  | "LastName"
  | "Gender"
  | "CountryID"
  | "LanguageID"
  | "DateOfBirth"
  | "PhoneNumber"
  | "Password"
  | "ConfirmPassword";

export type UserRequirements = {
  EmailAddress: UserRequirement; // Mandatory field
} & {
  [key in UserRequirementKeys]?: UserRequirement; // Optional fields
};
