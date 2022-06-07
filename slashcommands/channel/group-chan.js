const Discord = require("discord.js")
const { Permissions } = require('discord.js');

const run = async (client, interaction) => {
    let category = interaction.options.getChannel("category")
    let membersToAdd = new Discord.Collection()
    for(let i = 1; i <= 10; ++i) {
        let member = interaction.options.getMember(`user-${i}`)
        if(member) membersToAdd.set(member.id, member)
    }
    let name = interaction.options.getString("name")
    let prefix = interaction.options.getString("prefix") || ''

    if(membersToAdd.size === 0) interaction.reply("There is no channel to create")

    groupName = name ? name : `${prefix} ${membersToAdd.map(member => member.user.username).sort().join("-")}`

    interaction.guild.channels.create(groupName).then(newGroup => {
        newGroup.permissionOverwrites.create(interaction.guild.roles.everyone, {
            VIEW_CHANNEL: false
        }).then(newGroup => {
            membersToAdd.forEach(m => {
                newGroup.permissionOverwrites.create(m, {
                    VIEW_CHANNEL: true
                })
            })
        })

        if(category && category.type === "GUILD_CATEGORY") newGroup.setParent(category, {lockPermissions: false})
        interaction.reply(`${newGroup} was created !`)
    })
}

module.exports = {
    name: "group-chan",
    description: "Create a group channel",
    permissions: ["MANAGE_CHANNELS"],
    options: [
        {
            name: "category",
            description: "The category where you want to create the group-chan",
            type: "CHANNEL",
            required: true,
        },
        {
            name: "user-1",
            description: "A user you want to include in the group-chan",
            type: "USER",
            required: true,
        },
        {
            name: "user-2",
            description: "A user you want to include in the group-chan",
            type: "USER",
            required: false,
        },
        {
            name: "user-3",
            description: "A user you want to include in the group-chan",
            type: "USER",
            required: false,
        },
        {
            name: "user-4",
            description: "A user you want to include in the group-chan",
            type: "USER",
            required: false,
        },
        {
            name: "user-5",
            description: "A user you want to include in the group-chan",
            type: "USER",
            required: false,
        },
        {
            name: "user-6",
            description: "A user you want to include in the group-chan",
            type: "USER",
            required: false,
        },
        {
            name: "user-7",
            description: "A user you want to include in the group-chan",
            type: "USER",
            required: false,
        },
        {
            name: "user-8",
            description: "A user you want to include in the group-chan",
            type: "USER",
            required: false,
        },
        {
            name: "user-9",
            description: "A user you want to include in the group-chan",
            type: "USER",
            required: false,
        },
        {
            name: "user-10",
            description: "A user you want to include in the group-chan",
            type: "USER",
            required: false,
        },
        {
            name: "name",
            description: "The name you want to give to the group-chan",
            type: "STRING",
            required: false,
        },
        {
            name: "prefix",
            description: "The prefix of the group-chan's name",
            type: "STRING",
            required: false,
        },
    ],
    run,
}