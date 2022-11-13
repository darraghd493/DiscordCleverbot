const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");

const globPromise = promisify(glob);

module.exports = async (client) => {
  // Load commands
  const globHome = process.cwd().replace(/\\/g, "/");
  const commandFiles = await globPromise(`${globHome}/commands/**/*.js`);
  const eventFiles = await globPromise(`${globHome}/events/*.js`);

  commandFiles.map((value) => {
    const file = require(value);
    const splitted = value.split("/");
    const directory = splitted[splitted.length - 2];
    
    if (file.name) {
      const properties = { directory, ...file };
      client.commands.set(file.name, properties);

      // Register aliases
      if (file.aliases.length !== 0) {
        file.aliases.forEach((alias) => {
          client.commands.set(alias, file.name);
        });
      }
    }
  });

  // Load event files
  eventFiles.map((value) => require(value));
}