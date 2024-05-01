const Command = require("../../abstract/Command.js");
const { EmbedBuilder } = require('discord.js');

module.exports = class Queue extends Command {
  constructor(client) {
    super(client, {
      name: "queue",
      description: "Shows information about the queue, if none returns the information about current playing track",
      category: 'Music',
      aliases: ["q"],
      clientPerms: ["MANAGE_MESSAGES"]
    });
  }

  async run(msg) {

    let dispatcher = this.client.players.get(msg.guild.id);

    const { current } = dispatcher;
    const Duration = this.client.util.formatDuration(current.info.length);
    const queue = dispatcher.queue.length > 9 ? dispatcher.queue.slice(0, 9) : dispatcher.queue;

    const embed = new EmbedBuilder()
      .setColor(this.client.util.color.primary)
      .setTitle('Now Playing')
      .setThumbnail(`https://img.youtube.com/vi/${dispatcher.current.info.identifier}/default.jpg`)
      .setDescription(`[${dispatcher.current.info.title}](${dispatcher.current.info.uri}) [${Duration}]`)
      .setFooter({text: `• ${dispatcher.queue.length} total songs in queue`});
    if (queue.length) embed.addFields({ name: 'Up Next', value: (queue.map((track, index) => `**${index + 1}.)** \`${track.info.title}\``).join('\n')) });
    return msg.channel.send({embeds: [embed]});
  }
};