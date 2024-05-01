const Command = require("../../abstract/Command.js");
const { EmbedBuilder } = require('discord.js');

module.exports = class Cluster extends Command {
  constructor(client) {
    super(client, {
      name: "cluster",
      description: "Show's the bot's cluster information.",
      category: 'Utility',
      aliases: ["clusterinfo", "clusters"],
    });
  }

  async run(msg) {
    const promises = await this.client.shard.broadcastEval(c => [
      c.guilds.cache.size,
      c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0),
      c.guilds.cache.reduce((acc, guild) => acc += guild.members.me.voice.channel ? 1 : 0, 0),
      c.ws.ping,
      c.uptime,
      (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2),
      c.shard.id,
      c.shard.shards.length
    ])
    let shardlists = [];
    for (let i = 0; i < promises.length; i += 6) {
      let xshards = promises.slice(i, i + 6);
      shardlists.push(xshards.map(x => x))
    }

    let limit = promises.length / 6
    for (let i = 0; i < limit; i++) {
      let fields = shardlists[i]
      const embed = new EmbedBuilder()
        .setColor(this.client.util.color.primary)
        .setAuthor({ name: (this.client.user.tag), iconURL: this.client.user.displayAvatarURL() })
        .setTitle(`**Clusters Stats:**`)
      fields.forEach(value => {
        let finale = (`Shards: ${value[7]}\nServers: ${value[0]}\nUsers: ${value[1]}\nStreams: ${value[2]}\nPing: ${Math.round(value[3])}ms\nUptime: ${this.client.util.formatSeconds(value[4])}\nMemory Usage: ${value[5]}mb`)
        embed.addFields({ name: `${value[8] ? this.client.util.emoji.offline : this.client.util.emoji.online} Cluster ${value[6] + 1}`, value: `\`\`\`${finale}\`\`\``, inline: true })
      })
      return msg.channel.send({embeds: [embed]});
    }
  };
};
