"use server";

import evaServiceCall from "@/utils/eva-service-call";

export default async function getTemporaryRedirectToken(authorization: string) {
  const res = await evaServiceCall({
    service: "/gettemporaryredirecttoken",
    body: {},
    extraHeaders: {
      Authorization: authorization,
    },
  });
  return res.Token;
}
