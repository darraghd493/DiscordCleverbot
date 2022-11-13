let descriptiveWords = {
  positive: ["whopping", "brilliant", "crazy", "excellent", "fantastic", "fabulous", "extreme", "great"],
  neutral: ["good", "okay", "meh"],
  negative: ["terrible", "trash", "rubbish", "bad", "horrible", "dull"]
}

let basicVowels = ['a', 'e', 'i', 'o', 'u'];


function getRandomDescriptiveWord(type) {
  try {
    let list = descriptiveWords[type.toLowerCase()];
    return list[Math.floor(Math.random() * list.length)];
  } catch (err) {
    console.log(err);
    console.log(type);
    return null;
  }
}

function generateBasicIndefinate(string = "") {
  if (basicVowels.includes(string.charAt(0).toLowerCase()))
    return "an " + string;
  else
    return "a " + string;
}

function generateLatencyDescriptiveString(latency) {
  if (latency < 50)
    return `${generateBasicIndefinate(getRandomDescriptiveWord("positive"))} ${latency}ms`;
  else if (latency < 150)
    return `${generateBasicIndefinate(getRandomDescriptiveWord("negative"))} ${latency}ms`;
  else
    return `${generateBasicIndefinate(getRandomDescriptiveWord("neutral"))} ${latency}ms`;

}

const { Interaction } = require("discord.js");

module.exports = {
	name: "ping",
	aliases: [],
	description: "Get the ping of the bot",
  slash: true,
  
	run: async (client, message, args) => {
    let latency = client.ws.ping;

		message.channel.send({
      content: `My latency is ${generateLatencyDescriptiveString(latency)}!`});
	},

  run: async (client, interaction) => {
    let latency = client.ws.ping;

    interaction.reply({
      content: `My latency is ${generateLatencyDescriptiveString(latency)}!`});
  }
};