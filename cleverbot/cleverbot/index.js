const cleverbotApi = require("cleverbot-free");

function capitalize(string) {
  return string.replace(/([!?.]\s+)([a-z])/g, function(m, $1, $2) {
    return $1+$2.toUpperCase();
  });
}

function punctuate(string) {
  if (string.charAt(string.length-1) != ".")
    return string + ".";
  else
    return string;
}

function punctuateMessage(contents) {
  return punctuate(capitalize(contents));
}

class Cleverbot {
  constructor(client, limit, indefinate) {
    this.cache = [];
    this.client = client;
    this.limit = limit;
    this.indefinate = indefinate;
  }

  selfDestruct() {
    this.client.activeCleverbot.servers.delete(message.guild.id);
    this.client.activeCleverbot.cleverbots.delete(Key(message.guild.id, message.channel.id));
  }

  resetCache() {
    this.cache = [];
  }

  overflowCache() {
    if (this.cache.length-1 > limit) {
      let remove = this.cache.length-1 - limit;

      for (let i = 0; i < remove; i++) {
        this.cache.shift();
      }
    }
    this.cache = [];
  }

  sendMessage(contents, channel) {
    contents = punctuateMessage(contents);

    try {
      if (this.cache.length == 0)
        cleverbotApi(contents).then((response) => {
          if (
            response != null || 
              reponse != undefined
             ) {
            this.cache.push(contents);
            this.cache.push(response);
    
            channel.send({
              content: response});
          }
        });
      else
        cleverbotApi(contents, this.cache).then((response) => {
          if (
            response != null || 
              reponse != undefined
             ) {
            this.cache.push(contents);
            this.cache.push(response);
    
            channel.send({
              content: response});
          }
        });
  
      if (this.indefinate)
        this.overflowCache();
      else {
        if (this.cache.length-1 > this.limit) {
          this.resetCache();
          
          channel.send({
            content: "I have cleared the cache due to going over the cache limit."}).then((infoMessage) => {
            setTimeout(() => {
              if (infoMessage.editable) // https://github.com/discordjs/discord.js/issues/7091
                infoMessage.delete();
            }, 15000);
          });
        }
      }
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = Cleverbot;