const { Interaction } = require("discord.js");
const { Cleverbot, Key } = require("../../cleverbot");

module.exports = {
	name: "stop",
	aliases: ['exit', 'close', 'end', 'quit'],
	description: "Stops Cleverbot",
  slash: true,
  
	run: async (client, message, args) => {
    if (client.activeCleverbot.servers.has(message.guild.id)) {
      if (client.activeCleverbot.servers.get(message.guild.id) != message.channel.id)
        client.channels.cache.get(
          client.activeCleverbot.servers.get(message.guild.id)).send("Cleverbot has been closed by another user.").then((infoMessage) => {
            setTimeout(() => {
              infoMessage.delete();
            }, 15000);
          });
    }else
      return;
    
    client.activeCleverbot.cleverbots.get(Key(message.guild.id, message.channel.id)).selfDestruct();
    
    message.channel.send({
      content: "Stopped cleverbot!"}).then((infoMessage) => {
      setTimeout(() => {
        if (infoMessage.editable) // https://github.com/discordjs/discord.js/issues/7091
          infoMessage.delete();
      }, 15000);
    });
	},

  run: async (client, interaction) => {
    if (client.activeCleverbot.servers.has(interaction.guild.id)) {
      if (client.activeCleverbot.servers.get(interaction.guild.id) != interaction.channel.id)
        client.channels.cache.get(
          client.activeCleverbot.servers.get(interaction.guild.id)).send("Cleverbot has been closed by another user.").then((infoMessage) => {
            setTimeout(() => {
              infoMessage.delete();
            }, 15000);
          });
    } else {
      interaction.reply({
        content: "There is nothing to stop!",
        ephemeral: true
      });
      return;
    }

    const key = Key(interaction.guild.id, interaction.channel.id);
    client.activeCleverbot.cleverbots.get(key).selfDestruct();
    client.activeCleverbot.cleverbots.delete(key);
    
    interaction.reply({
      content: "Stopped cleverbot!",
			ephemeral: true
    });
  }
};