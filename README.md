![logo](https://i.imgur.com/7pGoxhe.png)
# Away Moderation Bot
> No longer fear leaving your server alone. The Away Moderation Bot has you covered while you're *away*.
---
##### **Away Support Discord / Try It Out:** https://discord.gg/hG5tqCG <br>
##### **Invite The Bot:** https://discordapp.com/api/oauth2/authorize?client_id=593282838976135169&permissions=8&scope=bot <br>
##### **Check Out Our Websie (soon): ** https://awaybot.me/
---
### What is this?
> The Away Moderation Bot was created for Discord Hack Week under the moderation category. It's a highly customizable open source bot for both developers looking to fork the project and server owners. The bot utilizes a trained AI to parse messages and determine if they are found to fall under one of the following categories: Identity Attack, Insult, Obscene, Servere Toxicity, Sexually Explicit, Threat, or Toxic. Also, an enhanced audit log feature for server owners is included.
### How does this "AI" stuff work?
> A library developed by TensorFlow (by Google) is layered in Away Bot under a per-server-basis cache (for speed) and was trained using the civil comments datasets: https://figshare.com/articles/data_json/7376747 - this set alone contains well over 2,000,000 comments labeled for each of the previous categories.
### What do I get as a server owner?
> You get a reliable moderation bot that can do what your moderators never could. After a message is found in violation of your own server's configuration (per-server-config) the message will be deleted and a flag will be added to the message's author. After a person reaches a certain amount of flags? Well, you decide what happens! For a list of features take a look below.
---
### Per-Server Features
- Smart Filter (AI detection)
- Threshold Configuration (for the AI)
- Configurable Flag Limits (before Mutes, Kicks, Tempbans, and Bans)
- Configurable Mute / Tempban Lengths
- Configurable Blacklist / Whitelist (for words of your own)
- The Ability to Enable/Disable Filters (at will)
- Improved Audit Logs
### Developer Features
- The ability to hook up your own Firestore (by Google, Firebase Database) to keep your data independent.
- Huge configuration for command information and personal preferences (commands, reasons, names, thumbnails, colors, etc.)
- 16+ Command / Job / Utility examples to make it easy to add your own commands and features.
---
### Commands
#### Default Prefix
> The Away Moderation Bot uses ^ as it's default prefix, but you can configure it to whatever you like in your own server. Take a look at the prefix command below.
#### User Commands
- help
  - Descripion: Relay information about the Away Moderation Bot.
  - Usage: help | help <command>
- flags
  - Description: DMs the user the total amount of flags they currently have.
  - Usage: flags
#### Admin Commands
- prefix
  - Description: Change the phrase used as the prefix. Default is ^.
  - Usage: prefix <phrase>
- smartfilter
  - Description: Manage the smart filter feature status and threshold.
  - Usage: smartfilter | smartfilter <enable/disable/(1-99)>
- filterpunish
  - Description: Manage the punishments given after a certain threshold of flags.
  - Usage: filterpunish | filterpunish <mute/kick/tempban/ban> <threshold>
- filterconfig
  - Description: Enable/Disable filter statuses at will.
  - Usage: filterconfig | filterconfig <filter-name> <enable/disable>
  - Filters: IDENTITY_ATTACK, INSULT, OBSCENE, SEVERE_TOXICITY, SEXUAL_EXPLICIT, THREAT, TOXICITY
- filterlength
  - Description: Modify the length of a mute/tempban that results from filter flagging.
  - Usage: filterlength | filterlength <mute/tempban> <length in seconds>
- blacklist
  - Description: Blacklist a certain word for flagging by the smart filter.
  - Usage: blacklist | blacklist <add/remove> <word>
- whitelist
  - Description: Whitelist a certain word to not be flagged by the smart filter.
  - Usage: whitelist | whitelist <add/remove> <word>
- aflags
  - Description: List the flags for a certain user, or clear their flags.
  - Usage: aflags <tag> <clear>
- bypass
  - Description: Enable/Disable immunity from the smart filter for yourself or a certain user.
  - Usage: bypass | bypass <tag>
- purge
  - Description: Purge a defined amount of messages in a channel.
  - Usage: purge <1-100>
#### Debug Commands (Admin Commands)
__The commands here are meant for developers or server owners experiencing malfunctions.__
- dump
  - Description: Dump all data tied to Away in your server.
  - Usage: dump
- reset
  - Description: Wipe and reset your server data for Away. **WARNING: THIS INCLUDES USER DATA.**
  - Usage: reset
---
### How do I install this beast of a bot?
Poor Tempoary Explanation (A VIDEO WILL BE OUT IN A FEW HOURS WITH A FULL TUTORIAL):
- Install NodeJS
- Download the Bot
- Run `npm i` in the root folder (where index.js is)
- Put your Discord Bot token in the "token" field in configuration.js located in `away_interact/configuration.json`
- Make a Firebase Account https://firebase.google.com/
- Create A New Project
- Create A Firestore Database
- Create "guilds" collection in Firestore
- Create a Service Key under Settings & Download it (---.json)
- Rename Service Key to ServiceAccountKey.json
- Place Service Key in `away_modules/`
- Run bot by doing `node .` in the root folder (where index.js is)
- Add the bot to your Discord server. (This is important, have the bot running to properly create log channels).
