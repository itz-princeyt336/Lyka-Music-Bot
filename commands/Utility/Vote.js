const Command = require("../../abstract/Command.js");
const { EmbedBuilder } = require('discord.js');

module.exports = class Vote extends Command {
  constructor(client) {
    super(client, {
      name: "vote",
      description: "Checks a user vote and also returns the vote link",
      category: 'Utility',
    });
  }

  async run(msg) {
    const embed = new EmbedBuilder()
      .setColor(this.client.util.color.primary)
      .setAuthor({name: (this.client.user.tag), iconURL: this.client.user.avatarURL({ size: 1024 })})
      .setDescription(
        `${this.client.dbl.hasVoted(msg.author.id) ? "You have already voted, you can vote me in every 12 hours" : "You have not voted me, vote me from the link below"}\n` +
        `Vote Link: [Click here](https://top.gg/bot/941681961859158017/vote)`
      )
      .setFooter({text: `Requested by: ${msg.author.tag}`,iconURL: msg.author.displayAvatarURL({ dynamic: true })});

    return msg.channel.send({embeds: [embed]});
  }
};