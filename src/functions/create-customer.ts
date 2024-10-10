"use server";

import { CreateCustomerResponse } from "@/types/create-customer-response";
import { OnboardingFormData } from "@/types/onboarding-form-data";
import evaServiceCall from "@/utils/eva-service-call";

export default async function createCustomer(formData: OnboardingFormData) {
  const user = {
    EmailAddress: formData.EmailAddress,
    FirstName: formData.FirstName,
    LastName: formData.LastName,
    DateOfBirth: formData.DateOfBirth,
    Gender: formData.Gender,
    CountryID: formData.CountryID,
    LanguageID: formData.LanguageID,
    PhoneNumber: formData.PhoneNumber,
    PreferredStoreID: formData.PreferredStoreID,
    Password: formData.Password,
  };

  const body = {
    User: user,
    AutoLogin: true,
    AccountType: formData.Password ? 0 : 1,
    OrderID: formData.OrderID,
    AttachToOrder: formData.OrderID !== undefined,
  };

  const extraHeaders: Record<string, string> = {};

  if (formData.OrderAppToken) {
    extraHeaders["EVA-App-Token"] = formData.OrderAppToken;
  }

  const res: CreateCustomerResponse = await evaServiceCall({
    service: "/createcustomer",
    body: body,
    extraHeaders: extraHeaders,
  });

  return res;
}
