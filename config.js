const fs = require("fs-extra");
if (fs.existsSync(".env"))
  require("dotenv").config({ path: __dirname + "/.env" });
global.audio = "";
global.video = "";
global.port = process.env.PORT;
global.appUrl = process.env.APP_URL || "";
global.email = "astromedia0010@gmail.com";
global.location = "Lahore,Pakistan.";
global.mongodb = process.env.MONGODB_URI || "mongodb+srv://wefomb12:NRlxcR1baj3hJAcG@cluster0.gabit01.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
global.allowJids = process.env.ALLOW_JID || "null";
global.blockJids = process.env.BLOCK_JID || "null";
global.DATABASE_URL = process.env.DATABASE_URL || "";
global.timezone = process.env.TZ || process.env.TIME_ZONE || "Africa/Lagos";
global.github = process.env.GITHUB || "https://github.com/Astropeda/Asta-Md";
global.gurl = process.env.GURL || "https://whatsapp.com/channel/0029VaPGt3QEwEjpBXT4Rv0z";
global.website = process.env.GURL || "https://whatsapp.com/channel/0029VaPGt3QEwEjpBXT4Rv0z";
global.THUMB_IMAGE = process.env.THUMB_IMAGE || process.env.IMAGE || "https://i.imgur.com/P37NWrz.jpeg";
global.devs = "2348039607375";
global.sudo = process.env.SUDO || "2348078112891";
global.owner = process.env.OWNER_NUMBER || "2348078112891";
global.style = process.env.STYLE || "3";
global.gdbye = process.env.GOODBYE || "false";
global.wlcm = process.env.WELCOME || "false";
global.warncount = process.env.WARN_COUNT || 3;
global.disablepm = process.env.DISABLE_PM || "false";
global.disablegroup = process.env.DISABLE_GROUPS || "false",
global.MsgsInLog = process.env.MSGS_IN_LOG || "true";
global.userImages = process.env.USER_IMAGES || "";
global.waPresence = process.env.WAPRESENCE || "online";
global.readcmds = process.env.READ_COMMAND || "false";
global.readmessage = process.env.READ_MESSAGE || "false";
global.readmessagefrom = process.env.READ_MESSAGE_FROM || "";
global.read_status = process.env.AUTO_READ_STATUS || "false";
global.save_status = process.env.AUTO_SAVE_STATUS || "false";
global.save_status_from = process.env.SAVE_STATUS_FROM || "";
global.read_status_from = process.env.READ_STATUS_FROM || "";

global.api_smd = "https://api-smd-1.vercel.app";
global.scan = "https://secret-garden-43998-4daad95d4561.herokuapp.com/";

global.SESSION_ID =
  process.env.SESSION_ID ||
  "Astro;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEx1YjJTL2Y0LzRpZ0FkN2dKQkI3TFc3U1BNQmlncE5QZDlDZ3pwNWlXaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0Myb25wSzE3emNtWk1oSkFWL0p1eUhYZjBVZUgreEVrUkp3b05seUR3ST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyUDFFbGFkUG5aUTlEWko0U0NOa1dsY1ZheEZsU1lFT3lINmNxYVl6WFgwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ2Q2JtakYveXRFaTV5cnZkclgwaE5KQXhUQVl3TzBrT0JzcFlEN2RhRW5zPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitFMnh3K1NXY2Vva1hrcUc3bXlLLzdqNWFrNXU5NEhMVjhaZUhyQkw2RU09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik93a3V5OHJHTS9TcDhQbnREdDF4bVNRQXZod3VhQ1RUSVVwdUFkZHk0VUk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ01ZcnNVVVp4dVU1cmxTUFpHTnVTTHY5eHJxSWx5U0lZK0FqTlFqRi8zaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaXo3eHVOSFRCaTFrejFiTDEyVUppUmtoQzk4T2lRNEw5dEtBcGZ5RW1Sbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9MdGMxUisybGJJaVNxZDY4aFpZMytpMVRGWklTVmZIMkwzQ21JTjZvcGQ1WkkyZ3VRc3BQQ0wraUE1Q2xiR2IzMzdSVzNyU0VZamJlYmZMYmtiSWlnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTU4LCJhZHZTZWNyZXRLZXkiOiJwSC9WS1hNT01xMG81OGs4a2NYcGI1bkllRDFSUHJDUkJ6Um5PTlF2TVk4PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDgwNzgxMTI4OTFAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiM0FBOUM4MDIzQzUxN0FCQzFENkMifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcxOTgyMjE3OX0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0ODA3ODExMjg5MUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzQUE0NEY3OUFFODZBNkNFRjBCQiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzE5ODIyMTgxfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJzVVFyNTRJX1FCbXVkdS04QVZrVWJ3IiwicGhvbmVJZCI6IjgzZGVlY2EwLTFhNjYtNDFhNy04MDBjLTkyMjM1YWIxMmY4YiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJheXo5ZFZzcldEb2tnR0ljUW5ad2cwQ2hjS3c9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid2MybkhKNVUvd0dKZ2x4YTJvcTFIYUNYb09BPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ikc0VjdQRjY5IiwibWUiOnsiaWQiOiIyMzQ4MDc4MTEyODkxOjQ1QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IkNhZXNhciJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDUGV2Z1BjTkVOUE9pYlFHR0FjZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoibUx4azI4aWRYdXJMSzVlQmdFNDZJL09lcVNSN2Y5V1FnWGcyNG50YTBEUT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiN2Q4Si9aTlJQeTFrUFdjZVJCNVZTVlFLbmhCWEtUNnJNc1FTcEN5SzQyejA0T1FRb0YrMzdkenhDWFZBc05wRzM0ejF5Y2s5My91c3Urck5ncks4QlE9PSIsImRldmljZVNpZ25hdHVyZSI6Ik9ibjgzNWZMcUM2NkV6SUE4Ujg3MzZuWEJhQ1FGY3ZDNWZIMEVFRzRsd1NvYzM1dUN3OVlWYWJob1ZUTTNCMW1NQlV5cEdSVVhycm9WekRKV3lsbGl3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0ODA3ODExMjg5MTo0NUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJaaThaTnZJblY3cXl5dVhnWUJPT2lQem5xa2tlMy9Wa0lGNE51SjdXdEEwIn19XSwicGxhdGZvcm0iOiJzbWJpIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzE5ODIyMTc2LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUxNNiJ9"
module.exports = {
  menu: process.env.MENU || "",
  HANDLERS: process.env.PREFIX || "/",
  BRANCH: process.env.BRANCH || "main",
  VERSION: process.env.VERSION || "1.0.0",
  caption: process.env.CAPTION || "©ᴀsᴛᴀ ᴍᴅ",
  author: process.env.PACK_AUTHER || "ᴀsᴛᴀ ᴍᴅ",
  packname: process.env.PACK_NAME || "♥️",
  botname: process.env.BOT_NAME || "ᴀsᴛᴀ ᴍᴅ",
  ownername: process.env.OWNER_NAME || "Caesar",
  errorChat: process.env.ERROR_CHAT || "",
  KOYEB_API: process.env.KOYEB_API || "false",
  REMOVE_BG_KEY: process.env.REMOVE_BG_KEY || "",
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
  HEROKU_API_KEY: process.env.HEROKU_API_KEY || "",
  HEROKU_APP_NAME: process.env.HEROKU_APP_NAME || "",
  antilink_values: process.env.ANTILINK_VALUES || "all",
  HEROKU: process.env.HEROKU_APP_NAME && process.env.HEROKU_API_KEY,
  aitts_Voice_Id: process.env.AITTS_ID || "37",
  ELEVENLAB_API_KEY: process.env.ELEVENLAB_API_KEY || "",
  WORKTYPE: process.env.WORKTYPE || process.env.MODE || "private",
  LANG: (process.env.THEME || "ASTA").toUpperCase(),
};
global.rank = "updated";
global.isMongodb = false;
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(`Update'${__filename}'`);
  delete require.cache[file];
  require(file);
});
