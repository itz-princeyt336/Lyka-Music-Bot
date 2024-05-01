const Command = require("../../abstract/Command.js");
const { EmbedBuilder } = require('discord.js');

module.exports = class Help extends Command {
  constructor(client) {
    super(client, {
      name: "help",
      description: "Shows all the commands available",
      usage: ["[command]"],
      category: 'Utility',
      aliases: ["help", "h"],
    });
  }

  async run(msg, args) {
    if (args.length) {
      let cmd = this.client.fetchCommand(args[0]);

      if (!cmd) return this.client.send(msg.channel.id, {
        embeds: [{
          color: this.client.util.color.error,
          description: `No command found with name or alias \`${args[0]}\``,
          footer: { text: msg.author.tag, icon_url: msg.author.displayAvatarURL({ dynamic: true, size: 4096 }) }
        }]
      });

      let embed = new EmbedBuilder()
        .setColor(this.client.util.color.primary)
        .setAuthor({ name: (msg.guild.name), iconURL: msg.guild.iconURL({ dynamic: true, size: 4096 }) })
        .setFooter({text: msg.author.tag, iconURL: msg.author.displayAvatarURL({ dynamic: true, size: 4096 })})
        .setDescription(`> Name: ${this.client.util.toProperCase(cmd.name)}\n> Description: ${cmd.description}\n> Category: ${cmd.category}`);
      if (cmd.aliases.length > 0) embed.addFields({ name: `Alias`, value: (cmd.aliases.map(a => `\`${msg.guild.prefix}${a}\``).join(', ')) });
      if (cmd.usage.length > 0) embed.addFields({ name: 'Usage(s)', value: (cmd.usage.map(u => `\`${msg.guild.prefix}${cmd.name} ${u}\``).join('\n')) });
      if (cmd.example.length > 0) embed.addFields({ name: 'Example(s)', value: (cmd.example.map(e => `\`${msg.guild.prefix}${cmd.name} ${e}\``).join('\n')) });

      return this.client.send(msg.channel.id, { embeds: [embed] });
    }

    let categories = this.client.commands.map(c => c.category).filter((item, pos, self) => {
      return self.indexOf(item) == pos;
    });

    let embed = new EmbedBuilder()
      .setAuthor({ name: `${this.client.user.username} - Commands List`, iconURL: this.client.util.assets.clientPicture })
      .setThumbnail(this.client.user.displayAvatarURL({ size: 4096 }))
      .setDescription(`You Can Use ${msg.guild.prefix}help <command-name> For More Informations.`)
      .setColor(this.client.util.color.primary);

    for (const category of categories) embed.addFields({ name: `• ${category} [${this.client.commands.filter(c => c.category === category).size}]`, value: (this.client.commands.filter(c => c.category === category).map(c => `\`${c.name}\``).join(', ')), inline: false });
    embed.addFields({ name: `• Links [3]`, value: `[Invite Me](${this.client.config.inviteURL(this.client.user.id)}) | [Support Server](${this.client.config.supportServer})`, inline: false });
    return this.client.send(msg.channel.id, { embeds: [embed.toJSON()] });
  }
};