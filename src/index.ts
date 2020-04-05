import fs from "fs";
import * as bot from "./bot";
import * as cron from "./cron";
import { config } from "./config";

if (!fs.existsSync(config.SITES_DATA)) {
  console.info(`No '${config.SITES_DATA}' folder, creating it..`);
  fs.mkdirSync(config.SITES_DATA);
}

bot.start();
cron.start();
