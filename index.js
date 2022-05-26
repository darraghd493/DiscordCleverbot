const { Client, Collection } = require("discord.js");
const prefix = require("./config.json").prefix;

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
	  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"],
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

// Start the clienta
client.login(process.env.token);