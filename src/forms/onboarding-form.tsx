"use client";

import React, { Key, useState } from "react";
import { generateOnboardingSchema } from "@/schemas/onboarding-schema";
import { validateFormData } from "@/utils/validate-form-data";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Checkbox,
  CheckboxGroup,
  DatePicker,
  DateValue,
  Input,
  Radio,
  RadioGroup,
} from "@nextui-org/react";
import { Translations } from "@/types/translations";
import { OnboardingFormData } from "@/types/onboarding-form-data";
import { UserRequirements } from "@/types/user-requirements";
import { Countries } from "@/types/countries";
import { SearchParams } from "@/types/search-params";
import { Alpha2Languages, Languages } from "@/types/languages";
import { parseDate } from "@internationalized/date";
import DismissableAlert from "@/components/dismissable-alert";
import { Subscriptions } from "@/types/subscriptions";
import handleOnboarding from "@/functions/handle-onboarding";
import ReactMarkdown from "react-markdown";
import { Icon } from "@iconify/react/dist/iconify.js";
import checkEmailAddressAvailability from "@/functions/check-email-availability";

export default function OnboardingForm({
  translations,
  userRequirements,
  countries,
  languages,
  searchParams,
  subscriptions,
  currentLanguage,
}: {
  translations: Translations;
  userRequirements: UserRequirements;
  countries: Countries;
  languages: Languages;
  searchParams: SearchParams;
  subscriptions: Subscriptions;
  currentLanguage: Alpha2Languages;
}) {
  // State to store form data
  const [formData, setFormData] = useState<OnboardingFormData>({
    EmailAddress: "",
    OrderID: searchParams.orderId,
    OrderAppToken: searchParams.orderAppToken,
    PreferredStoreID: searchParams.storeId,
    RedirectURL: searchParams.redirectUrl,
    DateOfBirth: undefined,
  });

  // State to store validation error messages
  const [errors, setErrors] = useState<Partial<OnboardingFormData>>({});

  const [submitError, setSubmitError] = useState("");

  // State to store loading status
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // State for selected subscriptions (array of subscription ID's)
  const [selectedSubscriptions, setSelectedSubscriptions] = useState<string[]>(
    []
  );

  const [isEmailAddressAvailable, setIsEmailAddressAvailable] = useState(true);

  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  // Handle changes in input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, // Update the relevant field based on the input name
    });
  };

  const handleEmailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;

    // Update the form state immediately
    handleChange(e);

    // Basic email structure check: trigger availability check only if email contains '@' and '.'
    if (email.includes("@") && email.includes(".")) {
      const isAvailable = await checkEmailAddressAvailability(email);
      setIsEmailAddressAvailable(isAvailable);
      console.log("Is available?: ", isAvailable);
    }
  };

  const handleSelectionChange =
    (field: keyof OnboardingFormData) => (key: Key | null) => {
      if (key !== null) {
        setFormData((prevData) => ({
          ...prevData,
          [field]: String(key), // Convert key to string if it's a number
        }));
      }
    };

  // Inside your component, add this function for date change
  const handleDateChange = (date: DateValue | null) => {
    if (date) {
      // Assuming `value.toDate()` exists to convert to a native JavaScript Date object

      const formattedDate = date.toString().split("T")[0]; // Format as YYYY-MM-DD
      setFormData((prevData) => ({
        ...prevData,
        DateOfBirth: formattedDate,
      }));
    }
  };

  const handleSubscriptionsChange = (selected: string[]) => {
    setSelectedSubscriptions(selected);
    setFormData((prevData) => ({
      ...prevData,
      Subscriptions: selected, // Use 'selected' directly to ensure the latest state
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("submitting form data: ", JSON.stringify(formData, null, 2));
    e.preventDefault(); // Prevent default form submission

    setIsLoading(true); // Set loading state to true when submission starts

    // Dynamically create the schema based on user requirements
    const schema = generateOnboardingSchema(userRequirements);

    // Validate form data using the validation function and schema
    const { errors, data } = validateFormData(schema, formData);

    if (errors) {
      // If there are validation errors, update the errors state and stop loading
      setErrors(errors);
      setIsLoading(false);
    } else {
      // If validation is successful, clear errors and proceed
      setErrors({});
      try {
        const errorMessage = await handleOnboarding(data, currentLanguage);

        if (errorMessage) {
          setSubmitError(errorMessage);
        }
        // Handle successful login (e.g., redirect or show success message)
      } catch (error) {
        // Handle login error (e.g., show error message)
        console.error("Registration failed:", error);
      } finally {
        setIsLoading(false); // Reset loading state after submission is done
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
      <Input
        name="EmailAddress"
        variant="bordered"
        type="text"
        labelPlacement="outside"
        isRequired
        onChange={userRequirements.Password ? handleEmailChange : handleChange}
        label={translations.Inputs.EmailAddress}
        placeholder={translations.Inputs.EmailAddressPlaceholder}
        value={formData.EmailAddress}
        isInvalid={!!errors.EmailAddress || !isEmailAddressAvailable}
        errorMessage={
          errors.EmailAddress // Show validation error if present
            ? translations.Inputs.EmailAddressErrorMessage
            : !isEmailAddressAvailable // If the email is not available, show the availability error message
            ? translations.Inputs.EmailAddressUnavailableErrorMessage
            : undefined
        }
      />

      {userRequirements.Password && (
        <Input
          name="Password"
          variant="bordered"
          type={isVisible ? "text" : "password"}
          labelPlacement="outside"
          isRequired={
            userRequirements.Password.RequiredFor == 1 ||
            userRequirements.Password.RequiredFor == 7
          }
          onChange={handleChange}
          label={translations.Inputs.Password}
          placeholder={translations.Inputs.PasswordPlaceholder}
          value={formData.Password}
          isInvalid={!!errors.Password}
          errorMessage={
            errors.Password
              ? translations.Inputs.PasswordErrorMessage
              : undefined
          }
          classNames={{ inputWrapper: " pr-1" }}
          endContent={
            <Button
              isIconOnly
              radius="full"
              size="sm"
              variant="light"
              onClick={toggleVisibility}
              className="hover:bg-color-default-100"
            >
              <Icon
                className="text-default-400"
                width={20}
                icon={isVisible ? "tabler:eye-off" : "tabler:eye"}
              />
            </Button>
          }
        />
      )}

      {userRequirements.ConfirmPassword && (
        <Input
          name="ConfirmPassword"
          variant="bordered"
          type={isVisible ? "text" : "password"}
          labelPlacement="outside"
          isRequired={
            userRequirements.ConfirmPassword.RequiredFor == 1 ||
            userRequirements.ConfirmPassword.RequiredFor == 7
          }
          onChange={handleChange}
          label={translations.Inputs.ConfirmPassword}
          placeholder={translations.Inputs.ConfirmPasswordPlaceholder}
          value={formData.ConfirmPassword}
          isInvalid={!!errors.ConfirmPassword}
          errorMessage={
            errors.ConfirmPassword
              ? translations.Inputs.ConfirmPasswordErrorMessage
              : undefined
          }
          classNames={{ inputWrapper: " pr-1" }}
          endContent={
            <Button
              isIconOnly
              radius="full"
              size="sm"
              variant="light"
              onClick={toggleVisibility}
              className="hover:bg-color-default-100"
            >
              <Icon
                className="text-default-400"
                width={20}
                icon={isVisible ? "tabler:eye-off" : "tabler:eye"}
              />
            </Button>
          }
        />
      )}

      {userRequirements.FirstName && (
        <Input
          name="FirstName"
          variant="bordered"
          type="text"
          labelPlacement="outside"
          isRequired={
            userRequirements.FirstName.RequiredFor == 1 ||
            userRequirements.FirstName.RequiredFor == 7
          }
          onChange={handleChange}
          label={translations.Inputs.FirstName}
          placeholder={translations.Inputs.FirstNamePlaceholder}
          value={formData.FirstName}
          isInvalid={!!errors.FirstName}
          errorMessage={
            errors.FirstName
              ? translations.Inputs.FirstNameErrorMessage
              : undefined
          }
        />
      )}

      {userRequirements.LastName && (
        <Input
          name="LastName"
          variant="bordered"
          type="text"
          labelPlacement="outside"
          isRequired={
            userRequirements.LastName.RequiredFor == 1 ||
            userRequirements.LastName.RequiredFor == 7
          }
          onChange={handleChange}
          label={translations.Inputs.LastName}
          placeholder={translations.Inputs.LastNamePlaceholder}
          value={formData.LastName}
          isInvalid={!!errors.LastName}
          errorMessage={
            errors.LastName
              ? translations.Inputs.LastNameErrorMessage
              : undefined
          }
        />
      )}

      <DatePicker
        showMonthAndYearPickers
        name="DateOfBirth"
        variant="bordered"
        labelPlacement="outside"
        isRequired={
          userRequirements.DateOfBirth?.RequiredFor == 1 ||
          userRequirements.DateOfBirth?.RequiredFor == 7
        }
        onChange={handleDateChange}
        value={formData.DateOfBirth ? parseDate(formData.DateOfBirth) : null}
        label={translations.Inputs.DateOfBirth}
        isInvalid={!!errors.DateOfBirth}
        errorMessage={
          errors.DateOfBirth
            ? translations.Inputs.DateOfBirthErrorMessage
            : undefined
        }
        selectorIcon={<Icon icon="tabler:calendar" />}
      />

      {userRequirements.Gender && (
        <RadioGroup
          name="Gender"
          isRequired={
            userRequirements.Gender.RequiredFor == 1 ||
            userRequirements.Gender.RequiredFor == 7
          }
          onChange={handleChange}
          label={translations.Inputs.Gender}
          size="sm"
          value={formData.Gender}
          isInvalid={!!errors.Gender}
          errorMessage={
            errors.Gender ? translations.Inputs.GenderErrorMessage : undefined
          }
          classNames={{
            label: `text-small ${
              errors.Gender ? "text-danger" : "text-foreground"
            }`,
          }}
        >
          <Radio value="F">{translations.Inputs.GenderFemale}</Radio>
          <Radio value="M">{translations.Inputs.GenderMale}</Radio>
          <Radio value="O">{translations.Inputs.GenderOther}</Radio>
        </RadioGroup>
      )}

      {userRequirements.CountryID && (
        <Autocomplete
          name="CountryID"
          variant="bordered"
          labelPlacement="outside"
          isRequired={
            userRequirements.CountryID.RequiredFor == 1 ||
            userRequirements.CountryID.RequiredFor == 7
          }
          onSelectionChange={handleSelectionChange("CountryID")}
          label={translations.Inputs.CountryID}
          placeholder={translations.Inputs.CountryIDPlaceholder}
          selectedKey={formData.CountryID}
          isInvalid={!!errors.CountryID}
          errorMessage={
            errors.CountryID
              ? translations.Inputs.CountryIDErrorMessage
              : undefined
          }
          selectorIcon={
            <Icon className="text-default-400" icon="tabler:chevron-down" />
          }
          clearIcon={<Icon className="text-default-400" icon="tabler:x" />}
        >
          {Object.entries(countries).map(([countryCode, countryName]) => (
            <AutocompleteItem key={countryCode} value={countryCode}>
              {countryName}
            </AutocompleteItem>
          ))}
        </Autocomplete>
      )}

      {userRequirements.LanguageID && (
        <Autocomplete
          name="LanguageID"
          variant="bordered"
          labelPlacement="outside"
          isRequired={
            userRequirements.LanguageID.RequiredFor == 1 ||
            userRequirements.LanguageID.RequiredFor == 7
          }
          onSelectionChange={handleSelectionChange("LanguageID")}
          label={translations.Inputs.LanguageID}
          placeholder={translations.Inputs.LanguageIDPlaceholder}
          selectedKey={formData.LanguageID}
          isInvalid={!!errors.LanguageID}
          errorMessage={
            errors.LanguageID
              ? translations.Inputs.LanguageIDErrorMessage
              : undefined
          }
          selectorIcon={
            <Icon className="text-default-400" icon="tabler:chevron-down" />
          }
          clearIcon={<Icon className="text-default-400" icon="tabler:x" />}
        >
          {Object.entries(languages).map(([languageCode, languageName]) => (
            <AutocompleteItem key={languageCode} value={languageCode}>
              {languageName}
            </AutocompleteItem>
          ))}
        </Autocomplete>
      )}

      {userRequirements.PhoneNumber && (
        <Input
          name="PhoneNumber"
          variant="bordered"
          labelPlacement="outside"
          isRequired={
            userRequirements.PhoneNumber.RequiredFor == 1 ||
            userRequirements.PhoneNumber.RequiredFor == 7
          }
          label={translations.Inputs.PhoneNumber}
          placeholder={translations.Inputs.PhoneNumberPlaceholder}
          isInvalid={!!errors.PhoneNumber}
          errorMessage={
            errors.PhoneNumber
              ? translations.Inputs.PhoneNumberErrorMessage
              : undefined
          }
        />
      )}

      {subscriptions.length > 0 && (
        <CheckboxGroup
          name="Subscriptions"
          value={selectedSubscriptions}
          onValueChange={handleSubscriptionsChange}
          size="sm"
        >
          {subscriptions.map((subscription) => (
            <Checkbox key={subscription.ID} value={subscription.ID.toString()}>
              <ReactMarkdown
                components={{
                  a: ({ ...props }) => (
                    <a className="text-primary" {...props} />
                  ),
                }}
              >
                {subscription.Description}
              </ReactMarkdown>
            </Checkbox>
          ))}
        </CheckboxGroup>
      )}

      {submitError && <DismissableAlert message={submitError} color="danger" />}

      <Button
        type="submit"
        color="primary"
        isLoading={isLoading}
        isDisabled={isLoading}
      >
        {translations.Actions.SignUp}
      </Button>
    </form>
  );
}
