# masa-diff

Telegram bot, which informs the specified channels if some of the content in specified URL's changed. The main usecase is to notify if there are new job listings on any of the specified pages. The format of the pages will change, but we will always get the information what did change. The pages' content is converted into markdown before doing any diffing.

## Running masa-diff

### Environment variables

| Key                | Default value   | Description                                              |
| ------------------ | --------------- | -------------------------------------------------------- |
| BOT_TOKEN          | 🚫 Required! 🚫 | `string` of Telegram bot token                           |
| SITES              | `[]`            | `JSON string[]` of sites which contents we need to fetch |
| SITES_DATA         | `./sites_data/` | `string` of folder which is used as a database for sites |
| CRON_CHAT_IDS_FILE | `chat-ids`      | `string` of filename where chat-ids are saved            |

### Run

bash

```
npm install
npm start
```

telegram

```
/start
```

This runs the periodical job, and also starts the cronjob running every hour for the channel.
