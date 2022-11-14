const { Cleverbot, Key } = require("../../cleverbot");

module.exports = {
	name: "restart",
	aliases: ['reload', 'newconversation', 'nc'],
	description: "Restarts the Cleverbot conversation",
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
    
    client.activeCleverbot.cleverbots.get(Key(message.guild.id, message.channel.id)).resetCache();
    
    message.channel.send({
      content: "Restarted the Cleverbot conversation!"}).then((infoMessage) => {
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
        content: "There is nothing to restart!",
        ephemeral: true
      });
      return;
    }
    
    client.activeCleverbot.cleverbots.get(Key(interaction.guild.id, interaction.channel.id)).resetCache();
    
    interaction.reply({
      content: "Restarted the Cleverbot conversation!",
			ephemeral: true
    });
  }
};