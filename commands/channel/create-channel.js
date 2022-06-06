const { Permissions } = require('discord.js');

module.exports = {
    name: "create-channel",
    category: "channel", 
    permissions: ['MANAGE_CHANNELS'],
    devOnly: false,
    run: async({client, message, args}) => {
        user = message.mentions.users.first()
        message.guild.channels.create(`${args[0]}-${user.username}`, {
            permissionOverwrites: [
                {
                    id: message.guild.roles.everyone.id,
                    deny: [Permissions.FLAGS.VIEW_CHANNEL],
                },
                {
                    id: user.id,
                    allow: [Permissions.FLAGS.VIEW_CHANNEL],
                },
            ],
        }).then(channel => {
            message.reply(`<#${channel.id}>`)
        })
    }
}