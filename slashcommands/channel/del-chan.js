const Discord = require("discord.js")

const run = async (client, interaction) => {
    let channel = interaction.options.getChannel("channel_or_category")

    let channelsToDelete = channel.type === "GUILD_CATEGORY" ? channel.children : new Discord.Collection().set(channel.id, channel)
    let deletedChannels = new Array()

    if(channelsToDelete.size === 0) interaction.reply("There is no channel to delete")

    const deletingChannel = new Promise((resolve, reject) => {
        channelsToDelete.forEach(c => {
            interaction.guild.channels.delete(c).then(() => {
                deletedChannels.push(c.name)
                if(deletedChannels.length === channelsToDelete.size) resolve()
            })
        })
    })

    deletingChannel.then(() => {
        let answer = deletedChannels.map(c => `${c} was deleted !`).join('\n')
        interaction.reply(answer)
    })
}

module.exports = {
    name: "del-chan",
    description: "Delete one channel or all a category's channels",
    permissions: ["MANAGE_CHANNELS"],
    options: [
        {
            name: "channel_or_category",
            description: "The channel or the category of the channels you want to delete",
            type: "CHANNEL",
            required: true,
        },
    ],
    run,
}