const Discord = require("discord.js")
const { MessageAttachment } = require("discord.js");
const { MessageMentions: { CHANNELS_PATTERN, USERS_PATTERN, ROLES_PATTERN } } = require("discord.js");
const fs = require("fs");


const run = async (client, interaction) => {
    let next = true
    let lastId = null
    let allMessages = new Discord.Collection()

    await interaction.reply("Wait...")
    await interaction.fetchReply().then(reply => lastId = reply.id)

    while(next) {
        let messages = await interaction.channel.messages.fetch({before: lastId})

        if(messages.size === 0) {
            next = false
        } else {
            lastId = messages.last().id
            allMessages = allMessages.concat(messages)
        }
    }

    allMessages.sort((m1, m2) => m1.createdAt < m2.createdAt).reverse()
    let guildMembers = await interaction.guild.members.fetch()
    let guildRoles = await interaction.guild.roles.fetch()
    let guildChannels = await interaction.guild.channels.fetch()

    allMessages.forEach(m => {
        content = m.content
        author = guildMembers.get(m.author.id)
        authorName = author ? author.nickname ? author.nickname : author.user.username : m.author.username

        users = [...content.matchAll(USERS_PATTERN)]
        users.forEach(word => {
            member = guildMembers.get(word[1])
            if(member) {
                nick = (member.nickname ? member.nickname : member.user.username)
                content = content.replace(word[0], `@${nick}`)
            }
        })

        roles = [...content.matchAll(ROLES_PATTERN)]
        roles.forEach(word => {
            role = guildRoles.get(word[1])
            if(role) {
                content = content.replace(word[0], `@${role.name}`)
            }
        })

        channels = [...content.matchAll(CHANNELS_PATTERN)]
        channels.forEach(word => {
            channel = guildChannels.get(word[1])
            if(channel) {
                content = content.replace(word[0], `#${channel.name}`)
            }
        })

        fs.appendFile("export.txt", `${authorName} [${m.createdAt.toLocaleString("fr-FR")}] : \n${content}\n\n`, () => {})
    })

    interaction.editReply({
        content: "Here's an archive !",
        files: [
            new MessageAttachment("export.txt")
        ]
    }).then(() => {
        fs.unlink("export.txt", () => {})
    })
}

module.exports = {
    name: "dl-message",
    description: "DL messages in a channel",
    permissions: ["MANAGE_MESSAGES"],
    run,
}