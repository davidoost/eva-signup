const validateEnvironmentVariables = (
  await import("./src/functions/validate-env-vars.mjs")
).default;

async function runValidations() {
  try {
    await validateEnvironmentVariables(); // Validate environment variables
  } catch (error) {
    console.error("❌ Environment validation failed:", error.message);
    process.exit(1); // Stop the process if validation fails
  }
}

runValidations();

const nextConfig = {};

export default nextConfig;
