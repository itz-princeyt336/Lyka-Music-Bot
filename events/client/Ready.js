const AbstractEvent = require('../../abstract/Event');
const Topgg = require('@top-gg/sdk')

module.exports = class ReadyEvent extends AbstractEvent {
  constructor(client) {
    super(client, { name: 'ready', once: true });
  }
  async run() {
    this.client.logger.debug(`${this.client.user.username}`, `Ready with ${this.client.guilds.cache.size} servers!`);

    //if (this.client.spotifyHandler) await this.client.spotifyHandler.requestToken();

    const api = new Topgg.Api(this.client.config.dbl)
    this.client.dbl = api;

      setInterval(async () => {
      const guilds = await this.client.shard.fetchClientValues(`guilds.cache.size`);

      api.postStats({
        serverCount: guilds,
        shardCount: this.client.shard.shardCount,
        shardId: this.client.shard.id
      });
    }, 1800000);

    await this.client.util.delay(12000);
    this.client.liveDeployers();
    this.client.sweeper.setup();
    //to redeploy the players which has been disconnected either by discord or abnormal closure
    setInterval(() => this.client.liveDeployers(), 30000);
  }
}