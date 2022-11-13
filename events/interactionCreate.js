const client = require("../index");
const { Key } = require("../cleverbot");

const { Events } = require("discord.js");

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isCommand())
        return;
    
    const locatedCommand = client.commands.get(interaction.commandName) || client.commands.find(c => c.aliases?.includes(interaction.commandName));
    
    if (!locatedCommand)
        return;

  // Run command on 5 second timeout
  await locatedCommand.run(client, interaction);
});