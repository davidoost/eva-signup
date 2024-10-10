"use server";

import evaServiceCall from "@/utils/eva-service-call";

export default async function checkEmailAddressAvailability(
  emailAddress: string
) {
  const res = await evaServiceCall({
    service: "/checkemailaddressavailability",
    body: {
      EmailAddress: emailAddress,
    },
  });
  const isAvailable: boolean = res.IsAvailable;
  return isAvailable;
}
