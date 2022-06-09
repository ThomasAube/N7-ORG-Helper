const Discord = require("discord.js")
const { Message } = require('discord.js');

const run = async (client, interaction) => {
    let member = interaction.options.getMember("member")
    let number = interaction.options.getInteger("number") || 1
    let all = interaction.options.getBoolean("all") || false

    const amount = all ? 500 : number
    let deleted = 0
    let next = true
    let lastId = null

    await interaction.reply('Wait...')
    await interaction.fetchReply().then(reply => lastId = reply.id)

    while(deleted < amount && next) {
        let messages = await interaction.channel.messages.fetch({before: lastId})
        if(messages instanceof Message) messages = new Discord.Collection().set(messages.id, messages)

        if(messages.size === 0) {
            next = false
        } else {
            lastId = messages.last().id
            if(member) messages = messages.filter(message => message.author.id === member.id)

            for(let i = 0; deleted < amount && i < messages.size; ++i) {
                messages.at(i).delete()
                deleted++
            }
        }
    }

    interaction.editReply(`${deleted} message${deleted > 1 ? "s" : ""} deleted !`).then(reply => {
        setTimeout(() => reply.delete(), 2000)
    })
}

module.exports = {
    name: "del-message",
    description: "Delete messages in a channel",
    permissions: ["MANAGE_MESSAGES"],
    options: [
        {
            name: "member",
            description: "The user you want to delete messages",
            type: "USER",
            required: false,
        },
        {
            name: "number",
            description: "The number of messages you want to delete. Default is 1",
            type: "INTEGER",
            required: false,
        },
        {
            name: "all",
            description: "Set true if you want to delete all the messages",
            type: "BOOLEAN",
            required: false,
        },
    ],
    run,
}