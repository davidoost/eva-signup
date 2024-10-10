import { UserRequirements, UserRequirement } from "@/types/user-requirements";
import getApplicationConfiguration from "./get-application-configuration";

export default async function getUserRequirements() {
  const appConfig = await getApplicationConfiguration();
  const userRequirements = appConfig.UserRequirements;
  const customerAccountType = appConfig["App:Customer:AccountType"];

  // Ensure only the known keys from UserRequirements are included
  const filteredUserRequirements = Object.keys(userRequirements).reduce(
    (acc, key) => {
      const userRequirement = userRequirements[key as keyof UserRequirements];
      // Check if the requirement exists and its Display is not false
      if (userRequirement && userRequirement.Display !== false) {
        acc[key as keyof UserRequirements] = userRequirement;
      }
      return acc;
    },
    {} as UserRequirements
  );

  // Add Password and ConfirmPassword requirements if customerAccountType is 0
  if (customerAccountType === 0) {
    const passwordRequirement: UserRequirement = {
      ID: "Password",
      Display: true,
      RequiredFor: 1, // Adjust RequiredFor based on your logic
    };

    const confirmPasswordRequirement: UserRequirement = {
      ID: "ConfirmPassword",
      Display: true,
      RequiredFor: 1, // Adjust RequiredFor based on your logic
    };

    filteredUserRequirements["Password"] = passwordRequirement;
    filteredUserRequirements["ConfirmPassword"] = confirmPasswordRequirement;
  }

  return filteredUserRequirements;
}
