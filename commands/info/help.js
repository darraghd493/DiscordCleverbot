module.exports = {
	name: "help",
	aliases: ['h'],
	description: "Find out how to start a conversation",
  
	run: async (client, message, args) => {
		message.channel.send({
      content: `<@${message.author.id}>, just use \`cb.start\` to start a new conversation in this channel and if you want it gone then boom! Use \`cb.stop\`.`}).then((helpMessage) => {
      setTimeout(() => {
        if (helpMessage.editable) // https://github.com/discordjs/discord.js/issues/7091
          helpMessage.delete();
      }, 15000);
    });
	}
};