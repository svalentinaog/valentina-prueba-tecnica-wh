import { Sequelize } from "sequelize-typescript";
import { Character } from "../models/characterModel";
import "dotenv/config";

export const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST!,
  username: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
  port: Number(process.env.DB_PORT!),
  models: [Character],
});
