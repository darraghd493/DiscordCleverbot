const { Client, Collection, GatewayIntentBits } = require("discord.js");
const prefix = require("./config.json").prefix;

// Check if this is running on repl.it
// if not load dotenv and config
const isRepl = process.env.REPL_SLUG ? true : false;
if (!isRepl) require('dotenv').config()

// Initialize server
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/page.html');
});

app.listen(port, () => {
  console.log(`The server is available at localhost:${port}.`);
});

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

client.config = require("./config.json");

require("./handler")(client);

// Start the client
client.login(process.env.token);