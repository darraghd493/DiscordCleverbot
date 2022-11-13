module.exports = {
	name: "help",
	aliases: ['h'],
	description: "Find out how to start a conversation",
	slash: true,

	run: async (client, message, args) => {
		message.channel.send({
			content: `<@${message.author.id}>, just use \`cb.start\` to start a new conversation in this channel and if you want it gone then boom! Use \`cb.stop\`. There is also slash commands using the same names!`
		});
	},

	run: async (client, interaction) => {
		interaction.reply({
			content: `<@${message.author.id}>, just use \`cb.start\` to start a new conversation in this channel and if you want it gone then boom! Use \`cb.stop\`. There is also slash commands using the same names!`,
			ephemeral: true
		});
	}
};