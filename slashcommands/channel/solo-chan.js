const Discord = require("discord.js")
const { Permissions } = require('discord.js');
const { Role } = require('discord.js');

const run = async (client, interaction) => {
    let mentionable = interaction.options.getMentionable("user")
    let category = interaction.options.getChannel("category")
    let prefix = interaction.options.getString("prefix") || ''
    
    let soloUsers = new Discord.Collection()
    let addedChannels = new Array()

    if(mentionable instanceof Role) {
        let guildMembers = await interaction.guild.members.fetch()
        soloUsers = guildMembers.filter(m => m.roles.cache.has(mentionable.id))
    } else soloUsers.set(mentionable.id, mentionable)

    const addingChannel = new Promise((resolve, reject) => {
        soloUsers.forEach(u => {
            interaction.guild.channels.create(`${prefix} ${u.user.username}`, {
                permissionOverwrites: [
                    {
                        id: interaction.guild.roles.everyone.id,
                        deny: [Permissions.FLAGS.VIEW_CHANNEL],
                    },
                    {
                        id: u.id,
                        allow: [Permissions.FLAGS.VIEW_CHANNEL],
                    },
                ],
            }).then(newSolo => {
                if(category && category.type === "GUILD_CATEGORY") newSolo.setParent(category)
                addedChannels.push(newSolo.id)
                if(addedChannels.length === soloUsers.size) resolve()
            })
        })
    })

    addingChannel.then(() => {
        let answer = addedChannels.map(c => `<#${c}> was created !`).join('\n')
        interaction.reply(answer)
    })
}

module.exports = {
    name: "solo-chan",
    description: "Create a solo channel",
    permissions: ["MANAGE_CHANNELS"],
    options: [
        {
            name: "user",
            description: "The user you want to create the solo-chan for",
            type: "MENTIONABLE",
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