"use server";

import { OnboardingFormData } from "@/types/onboarding-form-data";
import { redirect } from "next/navigation";
import getTemporaryRedirectToken from "./get-temporary-redirect-token";
import createCustomer from "./create-customer";
import subscribeUser from "./subscribe-user";
import { Alpha2Languages } from "@/types/languages";

export default async function handleOnboarding(
  formData: OnboardingFormData,
  language: Alpha2Languages
) {
  const responseData = await createCustomer(formData);
  const result = responseData.Result;
  const user = responseData.User;

  if (result !== 0) {
    const errorMessage = encodeURIComponent(
      `CreateCustomer failed with result code ${result}`
    );
    return errorMessage;
  }

  if (formData.Subscriptions && formData.Subscriptions.length > 0) {
    console.log("subscriptions found, subscribing...");
    await subscribeUser(formData.Subscriptions, user.AuthenticationToken);
  }

  if (formData.RedirectURL) {
    const temporaryRedirectToken = await getTemporaryRedirectToken(
      user.AuthenticationToken
    );
    const redirectUrl = decodeURIComponent(formData.RedirectURL);
    return redirect(`${redirectUrl}?redirectToken=${temporaryRedirectToken}`);
  }

  if (formData.OrderID && formData.OrderAppToken) {
    return redirect(`${language}/success?orderId=${formData.OrderID}`);
  }

  return redirect(`${language}/success`);
}
