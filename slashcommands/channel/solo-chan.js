const { Permissions } = require('discord.js');

const run = async (client, interaction) => {
    let user = interaction.options.getMember("user")
    let category = interaction.options.getChannel("category")
    let prefix = interaction.options.getString("prefix") || ''

    interaction.guild.channels.create(`${prefix} ${user.username}`, {
        permissionOverwrites: [
            {
                id: interaction.guild.roles.everyone.id,
                deny: [Permissions.FLAGS.VIEW_CHANNEL],
            },
            {
                id: user.id,
                allow: [Permissions.FLAGS.VIEW_CHANNEL],
            },
        ],
    }).then(channel => {
        channel.setParent(category)
        interaction.reply(`<#${channel.id}> created !`)
    })
}

module.exports = {
    name: "solo-chan",
    description: "Create a solo channel",
    permissions: "MANAGE_CHANNELS",
    options: [
        {
            name: "user",
            description: "The user you want to create the solo-chan for",
            type: "USER",
            required: true,
        },
        {
            name: "category",
            description: "The category where you want to create the solo-chan",
            type: "CHANNEL",
            required: false,
        },
        {
            name: "prefix",
            description: "The prefix of the solo-chan's name",
            type: "STRING",
            required: false,
        },
    ],
    run,
}