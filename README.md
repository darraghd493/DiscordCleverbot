# Discord Cleverbot
'Discord Cleverbot' is a port of Cleverbot to Discord using [node.js](https://nodejs.org) and [discord.js](https://https://discord.js.org).

## How to Fix.
#### repl.it
On [repl.it](https://repl.it), an outdated version of [node.js](https://nodejs.org) is used. To fix this, you will want to open up the shell window and enter the following command;

```
npm init -y && npm i --save-dev node@16 && npm config set prefix=$(pwd)/node_modules/node && export PATH=$(pwd)/node_modules/node/bin:$PATH
```

this automatically generates the package (if there is none) and then updates and fixes [node.js](https://nodejs.org) to v16.

## Notes
* This bot does not support slash commands, I do not determine them as nessecary but I may add them in the future.
* This bot does not use the API, and instead simulates the webpage with [cleverbot-free](https://npmjs.com/package/cleverbot-free).
