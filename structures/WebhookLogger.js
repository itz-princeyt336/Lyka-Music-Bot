const { WebhookClient } = require('discord.js');

const errorLogs = new WebhookClient({ url: 'https://discord.com/api/webhooks/922456267144962098/00DJbXuc8Gv2GRWC8o1bhXScuG3rRonSe8oiBbqZf3KERBPpicJLbQKluVSGz3kwSuIv' });

const guildLogs = new WebhookClient({ url: 'https://discord.com/api/webhooks/922456267144962098/00DJbXuc8Gv2GRWC8o1bhXScuG3rRonSe8oiBbqZf3KERBPpicJLbQKluVSGz3kwSuIv' });

class WebhookLogger {
    constructor(client) {
        this.client = client;
    }

    guild(data) {
        guildLogs.send({content: typeof data === 'string' ? data : '\u200B', embeds: [typeof data === 'object' ? [data] : []]});
      return true;
    };

    error(data) {
        errorLogs.send({content: typeof data === 'string' ? data : '\u200B', embeds: [typeof data === 'object' ? [data] : []]});
      return true
    };

};

module.exports = WebhookLogger;