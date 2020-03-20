// Library
import * as dotenv from "dotenv";

// Dotenv
dotenv.config();

export const PORT = process.env.APP_PORT || 4000;
