import TelegramBot from "node-telegram-bot-api";
import { config } from "./config";
import * as api from "./api";
import * as services from "./services";
import md5 from "md5";

let bot: TelegramBot;

export async function start() {
  bot = new TelegramBot(config.BOT_TOKEN, { polling: true });

  bot.onText(/\/start/, async (msg) => {
    await api.addChatId(msg.chat.id);

    bot.sendMessage(
      msg.chat.id,
      `Getting the difference between last fetch... (this might take a while)`
    );

    await sendAdditions([msg.chat.id]);

    bot.sendMessage(msg.chat.id, `...done`);
  });
}

async function sendAdditionsForSite(chatIds: number[], site: string) {
  console.info(`Getting additions for`, { chatIds, site });

  const siteContent = await api.fetchSite(site);
  const markdownContent = services.htmlToMarkdown(siteContent);

  try {
    const fileContent = await api.readSiteContentFromFile(site);
    const addition = services.getAddition(fileContent, markdownContent);

    if (addition) {
      for (const chatId of chatIds) {
        const message = {
          chatId,
          message: `***Difference in [${services.getDomainName(
            site
          )}](${site}):***
          \`\`\`${addition}\`\`\``,
        };

        console.info(message);

        bot.sendMessage(chatId, message.message, {
          parse_mode: "MarkdownV2",
          disable_web_page_preview: true,
        });
      }
    }
  } catch (e) {
    console.warn(`No file for ${site} (${md5(site)}) yet.`);
  }

  await api.writeSiteContentToFile(site, markdownContent);
}

export async function sendAdditions(chatIds: number[]) {
  console.info(`Sending additions for`, { chatIds, SITES: config.SITES });
  for (const site of config.SITES) {
    await sendAdditionsForSite(chatIds, site);
  }
}
