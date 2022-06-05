module.exports = {
    name: "create-channel",
    category: "channel", 
    permissions: ['MANAGE_CHANNELS'],
    devOnly: false,
    run: async({client, message, args}) => {
        channelName = (args.length > 0) ? args[0] : "channel-test"
        message.guild.channels.create(channelName, {
            topic: "Mon nouveau channel",
        }).then(channel => {
            message.reply(`<#${channel.id}>`)
        })
    }
}