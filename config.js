module.exports = {
  token: "MTIxMzM5NjU3NDY1MTI5MzcyNw.GJIeZA.Sz5Z2uR7SMx9GvdUvtr6eKX6LTkB6Xv8jXDCPU",
  prefix: ".",
  mongoURI: "mongodb+srv://SpaceMusic:shivamop@cluster0.kgvij.mongodb.net/Ok?retryWrites=true&w=majority",
  dbl: "-",
  BFD: "-",
  owners: [
    {
      name: "Friday",
      id: "1203605618745933880"
    },
    {
      name: "Amrita",
      id: "763607905530150914"
    }
  ],
  supportServer: `https://discord.gg/686QvUygSb`,
  inviteURL: (id) => `https://discord.com/api/oauth2/authorize?client_id=${id}&permissions=8&scope=bot`,
  credentials: {
    spotify: {
      clientID: "4b2a3f3c14a041378cae75799597d349",
      clientSecret: "9222247bb10e4736b1ef6db7222639d1"
    }
  },
  timers: {
    playerDeployer: 10000,
    checkQueueDelay: 20000,
    memorySweeper: 60000 * 15,
  },
  regex: {
    spotify: /^(?:https:\/\/open\.spotify\.com\/(?:user\/[A-Za-z0-9]+\/)?|spotify:)(album|playlist|track)(?:[/:])([A-Za-z0-9]+).*$/,
    youtube: /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/,
    channel: /<#(\d{17,19})>/
  }
}
