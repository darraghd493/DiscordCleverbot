# Discord Cleverbot
Discord Cleverbot is an unofficial Discord interface for [Cleverbot](https://cleverbot.com) on [Discord](https://discord.gg) using [node.js](https://nodejs.org) and [discord.js](https://https://discord.js.org), allowing you and your friends to chat with Cleverbot on Discord - providing an enjoyable time.

![Home page image](https://raw.githubusercontent.com/darraghd493/DiscordCleverbot/main/docs/img/Home.png)

## Changelog
### 1.0.0
- Initial release

*I lost forgot happened between 1.0.0 and 2.0.0...*

## 2.0.0

## Installation
### Requirements
- [Node.js](https://nodejs.org) v16.14.2 **or newer**
- [Git](https://git-scm.com) (recommended - easier to use Git to clone the repository)

### Instructions for Windows, Linux and macOS
1. Clone the repository using `git clone`
2. Change directory to the cloned repository using `cd`
3. Install the dependencies using `npm install`
4. Configure the `.env` file, see [Configuration](#configuration)
5. Start the bot using `npm run start`

### Instructions for Heroku
[![Automatic deployment on Heroku "Deploy"](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/darraghd493/DiscordCleverbot)
* Please remember that you will need to configure the `.env` file, see [Configuration](#configuration)
* Do not create any issues regarding Heroku deployment, as I will not be able to help you unless you have done this yourself

#### Method 1
*This method is untested and may not work.*
1. Create a new app on [Heroku](https://heroku.com)
2. Make sure you have the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed
3. Clone the repository using `git clone`
4. Change directory to the cloned repository using `cd`
5. Login to Heroku using `heroku login`
6. Add the Heroku remote using `heroku git:remote -a <app name>`
7. Configure the `.env` file, see [Configuration](#configuration)
8. Commit the changes using `git commit -am "Initial commit"`
9. Push the changes to Heroku using `git push heroku master`
10. Scale the bot using `heroku ps:scale worker=1` (optional)
11. View the logs using `heroku logs --tail`

#### Method 2
*This method is untested and may not work.*
1. Create a new app on [Heroku](https://heroku.com)
2. Make a fork of this repository on GitHub
3. Connect your Github to Heroku and deploy the forked repository
4. Configure the `.env` file, see [Configuration](#configuration)
5. Scale the bot using `heroku ps:scale worker=1` (optional)
6. View the logs using `heroku logs --tail`

### Instructions for Repl.it
[![Automatic deployment on Repl.it "Run on Repl.it"](https://repl.it/badge/github/doge2018/DiscordCleverbot)](https://repl.it/github/doge2018/DiscordCleverbot)
1. Create a new repl on [Repl.it](https://repl.it)
2. Select "Import from GitHub" and paste the repository URL
3. Go into the secrets tab add the following secrets:
    - `token` - Your Discord bot token
    - `port` - The port you want the bot to run on (default: `3000`)

### Instructions for Glitch
[![Automatic deployment on Glitch "Remix on Glitch"](https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg)](https://glitch.com/edit/#!/import/github/darraghd493/DiscordCleverbot)
1. Go onto your [Glitch](https://glitch.com) dashboard
2. If it's your first time on Glitch: scroll down to "Import from GitHub" and paste the repository URL. Otherwise click "New Project" and select "Import from GitHub" and enter `https://github.com/darraghd493/DiscordCleverbot.git`. 
3. Go into the `.env` file and add the following:
    - `token` - Your Discord bot token
    <br><br>Now remove the following:
    - `port` - The port you want the bot to run on (default: `3000`)
4. Hide the `.env` file by clicking on "Hide" (recommended - this will hide your bot token from the public)
5. Go into `index.js` and remove the `app.listener`, otherwise you will get an error about the port being in use.6. Open the console and run `refresh`
7. Install the dependencies using `npm install`
8. Run `npm run start` in the console

## Configuration
### Environment variables
The following environment variables are required to run the bot:

| Variable | Description |
| -------- | ----------- |
| `TOKEN` | The Discord bot token. |
| `PORT` | The port to run the web server on. |

### Configuration file
The configuration file is located at `config.json` and contains the following options:

| Option | Description | Default |
| ------ | ----------- | ------- |
| `activity.switch.enabled` | Whether to switch the bot's activity. | `true` |
| `activity.switch.delay` | The interval to switch the bot's activity. | `30000` |
| `activity.activities` | The activities to switch between. | `[{"message":"Cleverbot for a response","type":"Watching"},{"message":"cb.help for help","type":"Playing"},{"message":"with Cleverbot","type":"Playing"},{"message":"with Discord","type":"Playing"}]` |
| `activity.activities[].message` | The message to display. | `null` |
| `activity.activities[].type` | The type of activity. | `null` |
| `cache.limit` | The maximum number of messages to cache. | `5000` |
| `prefix` | The prefix to use for commands. | `cb.` |

## Frequently Asked Questions
### How do I get a Discord bot token?
1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application"
3. Give the application a name
4. Click "Bot" on the left
5. Click "Add Bot"
6. Click "Copy" under "Token"

### How do I invite the bot to my server?
1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Click on your application
3. Click "OAuth2" on the left
4. Check the "bot" checkbox
5. Select the permissions you want the bot to have

### How do I get the bot to respond to messages?
The bot will automatically respond to messages once a conversation has been started. To start a conversation, you can either mention the bot or use the `start` command.

## License
This project is licensed under the [GNU General Public License v3.0](LICENSE).

## Credits
- [Cleverbot](https://cleverbot.com) - The provider of Cleverbot
- [Discord.js](https://discord.js.org) - The Discord API wrapper used for the bot
- [Express](https://expressjs.com) - The web server used for the bot

## Notes
* This bot does not use the API, and instead simulates the webpage with [cleverbot-free](https://npmjs.com/package/cleverbot-free), a package available on [npm](https://npmjs.com).
