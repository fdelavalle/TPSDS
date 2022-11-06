import mongoose from "mongoose";
import { env } from "./env";

export default async function connectToDatabase() {
  await mongoose.connect(`mongodb://${env.DB_USER}:${env.DB_PASS}@${env.DB_HOST}:27017/${env.DB_NAME}`)
}