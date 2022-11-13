const client = require("../index");
const activity = require("../config").activity;
const prefix = require("../config").prefix;

const { REST, Routes, Events, SlashCommandBuilder } = require("discord.js");
const rest = new REST({ version: '10' }).setToken(process.env.token);

class ActivityManager {
  constructor(activities, delay) {
    this.activities = activities;
    this.delay = delay;
    this.index = 0;
  }
  
  update() {
    let activity = this.activities[this.index];
    
    client.user.setActivity(activity.message, {
		  type: activity.type.toUpperCase()
  	});
    
    this.index++;
    
    if (this.index > this.activities.length-1)
      this.index = 0;
  }

  start() {
    this.update();
    setInterval(() => {
      this.update();
    }, this.delay);
  }
}

client.on(Events.ClientReady, async () => {
  console.log(`Logged in as bot at ${client.user.username}`);
  
  if (activity.activities.length > 1) {
    if (activity.switch.enabled) {
      let activityManager = new ActivityManager(activity.activities, activity.switch.delay);
      activityManager.start();
    } else {
      client.user.setActivity(activity.activities[0].message, {
    		type: activity.activities[0].type
      });
    }
  }


  // Generate slash commands list
  const slashCommands = [];
  
  client.commands.forEach((command) => {
    if (command.slash) {
      const commandData = new SlashCommandBuilder().setName(command.name).setDescription(command.description);
      slashCommands.push(commandData);
    }
  });

  // Generate slash commands data
  const slashCommandsData = [];
  
  slashCommands.forEach((command) => {
    slashCommandsData.push(command.toJSON());
  });
  
  // Set commands (global)
  await rest.put(
  	Routes.applicationCommands(client.id),
  	{
      body: slashCommandsData
    },
  );
});
