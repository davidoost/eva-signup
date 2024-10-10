"use server";

export default async function validateEnvironmentVariables() {
  const requiredVariables = ["EVA_ENDPOINT", "ONBOARDING_OU_ID"];

  console.log("Validating environment variables...");

  // Check if all required variables are present
  for (const variable of requiredVariables) {
    if (!process.env[variable]) {
      throw new Error(`${variable} is missing in environment variables.`);
    }
  }

  const endpoint = process.env.EVA_ENDPOINT;
  const ouID = Number(process.env.ONBOARDING_OU_ID);

  try {
    const response = await fetch(endpoint + "/status", {
      method: "GET",
      headers: {
        "EVA-User-Agent": "nextui-onboarding-template/1.0",
        "Content-Type": "application/json",
      },
    });

    // Check if the response is successful (status in the range 200–299)
    if (!response.ok) {
      throw new Error(`${endpoint} is not a valid EVA endpoint.`);
    }

    // Parse the response body if necessary
    const responseData = await response.json();

    console.log("Endpoint is valid:", endpoint);
  } catch (error) {
    if (error instanceof Error) {
      // Handle the error if it's an instance of Error
      throw new Error(`Failed to validate the endpoint: ${error.message}`);
    } else {
      // Handle unknown errors or rethrow if needed
      throw new Error(
        "An unknown error occurred during the validation process."
      );
    }
  }

  try {
    const response = await fetch(endpoint + "/message/getwebshops", {
      method: "POST",
      headers: {
        "EVA-User-Agent": "nextui-onboarding-template/1.0",
        "Content-Type": "application/json",
      },
    });

    // Check if the response is successful (status in the range 200–299)
    if (!response.ok) {
      throw new Error(
        `${endpoint} responded with status ${response.status} while fetching available webshop OUs.`
      );
    }

    // Parse the response body if necessary
    const responseData = await response.json();

    const ouIsValid = responseData.Webshops.some(function (item) {
      return item.ID === ouID;
    });

    if (!ouIsValid) {
      throw new Error(
        `Organization Unit with ID ${ouID} is not a valid OU of type webshop.`
      );
    }

    console.log("OU is valid:", ouID);
  } catch (error) {
    if (error instanceof Error) {
      // Handle the error if it's an instance of Error
      throw new Error(`Failed to validate the endpoint: ${error.message}`);
    } else {
      // Handle unknown errors or rethrow if needed
      throw new Error(
        "An unknown error occurred during the validation process."
      );
    }
  }
}
