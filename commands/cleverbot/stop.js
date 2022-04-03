const { Cleverbot, Key } = require("../../cleverbot");

module.exports = {
	name: "stop",
	aliases: ['exit', 'close', 'end', 'quit'],
	description: "Stops Cleverbot",
  
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
	}
};