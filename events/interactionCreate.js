const client = require("../index");
const { Key } = require("../cleverbot");

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand())
        return;
    
    const locatedCommand = client.commands.get(interaction.commandName) || client.commands.find(c => c.aliases?.includes(interaction.commandName));
    
    if (!locatedCommand)
        return;
    
    await locatedCommand.run(client, interaction);
});