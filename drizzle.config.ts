import { type Config } from "drizzle-kit";

import { env } from "@/env";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "singlestore",
  tablesFilter: ["cloud-storage_*"],
} satisfies Config;
