const client = require("../index");
const { Key } = require("../cleverbot");

const { Events } = require("discord.js");

client.on("messageCreate", async (message) => {
	if (
		message.author.bot ||
		!message.guild
	)
    return;

  if (message.content.toLowerCase().startsWith(client.config.prefix)) {
   	const [command, ...args] = message.content
		.slice(client.config.prefix.length)
		.trim()
		.split(" ");
    
    const locatedCommand = client.commands.get(command.toLowerCase()) || client.commands.find(c => c.aliases?.includes(command.toLowerCase()));
  
  	if (!locatedCommand)
      return;
    
  	await locatedCommand.run(client, message, args);
  } else {
    if (client.activeCleverbot.servers.has(message.guild.id) && 
        client.activeCleverbot.servers.get(message.guild.id) == message.channel.id
       ) {
      client.activeCleverbot.cleverbots.get(Key(message.guild.id, message.channel.id)).sendMessage(message.content, message.channel);
    }
  }
});