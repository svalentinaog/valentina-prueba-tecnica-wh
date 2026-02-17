import "dotenv/config";

export const ENVS = {
  PORT: process.env.PORT || 3000,
  DISNEY_API_URL:
    process.env.DISNEY_API_URL || "https://api.disneyapi.dev/character",
};
