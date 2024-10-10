"use server";

import { Alpha2Languages } from "@/types/languages";
import { Subscriptions } from "@/types/subscriptions";
import evaServiceCall from "@/utils/eva-service-call";

export default async function getAvailableSubscriptions(
  language: Alpha2Languages
) {
  const res = await evaServiceCall({
    service: "/getavailablesubscriptions",
    body: {},
    extraHeaders: {
      "Accept-Language": language,
    },
  });
  const subscriptions: Subscriptions = await res.Subscriptions;

  // Filter out any subscriptions that require an inquiry
  const availableSubscriptions = subscriptions.filter(
    (subscription) => !("InquiryID" in subscription)
  );

  return availableSubscriptions;
}
