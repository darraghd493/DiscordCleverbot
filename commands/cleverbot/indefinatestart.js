const { Cleverbot, Key } = require("../../cleverbot");

module.exports = {
	name: "indefinatestart",
	aliases: ['indefinatebegin', 'indefinatelaunch', 'indefinateload', 'indefinatecleverbot', 'ibegin', 'ilaunch', 'iload', 'icleverbot'],
	description: "Starts Cleverbot with an indefinate conversation",
  
	run: async (client, message, args) => {
    if (client.activeCleverbot.servers.has(message.guild.id))
      client.channels.cache.get(
        client.activeCleverbot.servers.get(message.guild.id)).send("Cleverbot has been closed by another user.").then((infoMessage) => {
          setTimeout(() => {
            infoMessage.delete();
          }, 15000);
        });
    
    client.activeCleverbot.servers.set(message.guild.id, message.channel.id);
    client.activeCleverbot.cleverbots.set(Key(message.guild.id, message.channel.id), new Cleverbot(client.activeCleverbot, client.config.cache.limit, true));
    
    message.channel.send({
      content: "Set up cleverbot!"}).then((infoMessage) => {
      setTimeout(() => {
        if (infoMessage.editable) // https://github.com/discordjs/discord.js/issues/7091
          infoMessage.delete();
      }, 15000);
    });
	}
};