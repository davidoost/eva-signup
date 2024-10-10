"use server";

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export default async function evaServiceCall({
  service,
  body,
  language = "en", // Set default language to "en"
  extraHeaders = {}, // Add extraHeaders as an optional parameter
}: {
  service: string;
  body: Record<string, any>;
  language?: string; // Mark as optional
  extraHeaders?: Record<string, string>; // Optional extra headers
}) {
  const evaEndpoint = process.env.EVA_ENDPOINT;

  // Default headers
  const headers = {
    "EVA-User-Agent": "nextui-onboarding-template/1.0",
    "Content-Type": "application/json",
    "EVA-Requested-OrganizationUnitID": process.env.ONBOARDING_OU_ID!,
    "Accept-Language": language,
    ...extraHeaders, // Merge extra headers with default headers
  };

  const res = await fetch(evaEndpoint + "/message" + service, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
    cache: "no-cache",
  });

  const response = await res.json();
  return response;
}
