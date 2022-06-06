const Discord = require("discord.js")

const run = async (client, interaction) => {
    let channel = interaction.options.getChannel("channel_or_category")
    let category = interaction.options.getChannel("destination")

    let channelsToMove = channel.type === "GUILD_CATEGORY" ? channel.children : new Discord.Collection().set(channel.id, channel)
    let movedChannels = new Array()

    if(channelsToMove.size === 0) interaction.reply("There is no channel to move")

    const movingChannel = new Promise((resolve, reject) => {
        channelsToMove.forEach(c => {
            c.setParent(category, {lockPermissions: false})
            movedChannels.push(c)
            if(movedChannels.length === channelsToMove.size) resolve()
        })
    })

    movingChannel.then(() => {
        let answer = movedChannels.map(c => `${c} was moved to **${category.name}** !`).join('\n')
        interaction.reply(answer)
    })
}

module.exports = {
    name: "move-chan",
    description: "Move one channel or all a category's channels to an other category",
    permissions: ["MANAGE_CHANNELS"],
    options: [
        {
            name: "channel_or_category",
            description: "The channel or the category of the channels you want to move",
            type: "CHANNEL",
            required: true,
        },
        {
            name: "destination",
            description: "The category where you want to move your channel(s)",
            type: "CHANNEL",
            required: true,
        },
    ],
    run,
}