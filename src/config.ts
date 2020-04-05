import dotenv from "dotenv";
dotenv.config();

const SITES_DATA = process.env.SITES_DATA || "./sites-data/"; // string (data folder)
const SITES: string[] = process.env.SITES
  ? JSON.parse(process.env.SITES)
  : undefined; // Array<string> (array of sites to fetch)
const BOT_TOKEN = process.env.BOT_TOKEN;
const CRON_CHAT_IDS_FILE = process.env.CRON_CHAT_IDS_FILE || "chat-ids";

if (!BOT_TOKEN || !SITES) {
  throw new Error(
    `All environment variables aren't set. Refer to src/index.ts`
  );
}

export const config = {
  SITES_DATA,
  SITES,
  BOT_TOKEN,
  CRON_CHAT_IDS_FILE,
};
