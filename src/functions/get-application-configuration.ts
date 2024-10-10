"use server";

import { AppConfig } from "@/types/app-config";
import evaServiceCall from "@/utils/eva-service-call";

export default async function getApplicationConfiguration() {
  const res = await evaServiceCall({
    service: "/getapplicationconfiguration",
    body: {},
  });
  const appConfig: AppConfig = res.Configuration;
  return appConfig;
}
