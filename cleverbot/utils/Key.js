function makeKey(serverId, channelId) {
  return `${serverId}-${channelId}`;
}

module.exports = makeKey;