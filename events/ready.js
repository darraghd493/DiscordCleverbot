const client = require("../index");
const activity = require("../config").activity;
const prefix = require("../config").prefix;

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

client.on("ready", () => {
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
});