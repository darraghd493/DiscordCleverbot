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
    this.destroyed = false;
  }

  selfDestruct() {
    this.client = null;
    this.cache = null;
    this.destroyed = true;
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
    if (this.client == null || this.cache == null || this.destroyed)
      return;
    contents = punctuateMessage(contents);

    try {
      if (this.cache.length == 0)
        cleverbotApi(contents).then((cleverbotMessage) => {
          if (
            cleverbotMessage != null || 
            cleverbotMessage != undefined
            ) {
            this.cache.push(contents);
            this.cache.push(cleverbotMessage);
    
            channel.send({
              content: cleverbotMessage});
          }
        });
      else
        cleverbotApi(contents, this.cache).then((cleverbotMessage) => {
          if (
            cleverbotMessage != null || 
            cleverbotMessage != undefined
            ) {
            this.cache.push(contents);
            this.cache.push(cleverbotMessage);
    
            channel.send({
              content: cleverbotMessage});
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