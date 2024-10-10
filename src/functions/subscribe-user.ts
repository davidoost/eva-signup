"use server";

import evaServiceCall from "@/utils/eva-service-call";

export default async function subscribeUser(
  subscriptions: string[],
  authorization: string
) {
  const body = {
    Subscriptions: subscriptions.map((id) => ({
      SubscriptionID: id, // Convert string ID to a number
    })),
  };

  const result = await evaServiceCall({
    service: "/subscribeuser",
    body: body,
    extraHeaders: {
      Authorization: authorization,
    },
  });
  console.log(result);
}
