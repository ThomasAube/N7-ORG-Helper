const Discord = require("discord.js")

module.exports = {
    name: "interactionCreate",
    run: async function runAll(bot, interaction) {
        const {client} = bot

        if(!interaction.isCommand()) return
        if(!interaction.inGuild()) return interaction.reply("This command can only be used in the server")
    
        const slashcommand = client.slashcommands.get(interaction.commandName)
        if(!slashcommand) return interaction.reply("Invalid slashcommand")
        if(slashcommand.permissions && !interaction.member.permissions.has(slashcommand.perm)) return interaction.reply("You do not have permissions to use this slashcommand")
    
        try {
            await slashcommand.run(client, interaction)
        } catch(err) {
            console.error(err)
        }
    }
}