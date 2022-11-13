const { Client, Collection, GatewayIntentBits } = require("discord.js");
const prefix = require("./config.json").prefix;

// Check if this is running on repl.it
// if not load dotenv and config
const isRepl = process.env.REPL_SLUG ? true : false;
if (!isRepl) require('dotenv').config()

// Initialize server
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/web/index.html');
});

app.get('/data', (req, res) => {
  res.json(
    {
      ping: Date.now(),
      uptime: process.uptime(),
      bot: {
        ping: client.ws.ping,
        uptime: client.uptime,
        guilds: client.guilds.cache.size,
        users: client.users.cache.size,
        channels: client.channels.cache.size,
        commands: client.commands.size,
        intents: client.options.ws.intents
      },
      config: {
        prefix: prefix,
        owner: process.env.OWNER
      },
      cache: {
        guilds: client.guilds.cache.map(g => g.name),
        channels: client.channels.cache.map(c => c.name),
        users: client.users.cache.map(u => u.username)
      }
    }
  )
});

app.get('/invite', (req, res) => {
  res.redirect(client.invite());
});

app.get('/pfp', (req, res) => {
  res.redirect(client.user.displayAvatarURL());
});

app.get('/discord', (req, res) => {
  res.redirect(client.discord());
});

// Host the web folder
app.use(express.static('web'));

// Initialize client
const client = new Client({
	intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates
  ],
  presence: {
      status: "online",
  },
});

module.exports = client;

// Initialize commands
client.commands = new Collection();
client.slashCommands = new Collection();

client.activeCleverbot = {
  servers: new Collection(),
  cleverbots: new Collection()
};

// Permissions:
// > Send Messages
// > Manage Messages
// > Read Message History
// > Mention Everyone
// > Use External Emojis
// > Use Application Commands

client.permissions = 2147952640;

client.invite = () => {
  return `https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=${client.permissions}`;
}
client.discord = () => {
  // TODO: Generate invite link
  return "https://discord.gg/U3MkfjPTev";
}

client.config = require("./config.json");
require("./handler")(client);

// Start the client
client.login(process.env.token);

// Start the server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port} !`);
});

/*
 = "https://discord.gg/U3MkfjPTev";
*/