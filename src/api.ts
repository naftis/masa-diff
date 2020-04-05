import { chromium } from "playwright-chromium";
import md5 from "md5";
import fs from "fs";
import { config } from "./config";

export async function fetchSite(url: string) {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(url);
  const body = await page.evaluate(() => {
    document.body
      .querySelectorAll("script, style")
      .forEach((script) => script.remove());

    return document.body.innerHTML;
  });
  await browser.close();
  return body;
}

export async function readSiteContentFromFile(site: string) {
  const siteHash = md5(site);
  const fileBuffer = await fs.promises.readFile(config.SITES_DATA + siteHash);
  return fileBuffer.toString();
}

export async function writeSiteContentToFile(site: string, content: string) {
  const siteHash = md5(site);
  return fs.promises.writeFile(config.SITES_DATA + siteHash, content);
}

export async function getChatIds() {
  try {
    const fileBuffer = await fs.promises.readFile(
      config.SITES_DATA + config.CRON_CHAT_IDS_FILE
    );
    const chatIds = JSON.parse(fileBuffer.toString());
    return chatIds as number[];
  } catch (e) {
    await fs.promises.writeFile(
      config.SITES_DATA + config.CRON_CHAT_IDS_FILE,
      "[]"
    );

    return [];
  }
}

export async function addChatId(chatId: number) {
  const currentChatIds = await getChatIds();
  const newChatIds = Array.from(new Set([...currentChatIds, chatId]));

  await fs.promises.writeFile(
    config.SITES_DATA + config.CRON_CHAT_IDS_FILE,
    JSON.stringify(newChatIds)
  );
}
