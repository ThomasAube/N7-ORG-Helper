const Discord = require("discord.js")

const run = async (client, interaction) => {
    let category = interaction.options.getString("name")
    
    interaction.guild.channels.create(category, {
        type: "GUILD_CATEGORY",
    }).then(newCategory => {
        interaction.reply(`**${newCategory.name}** was created !`)
    })
}

module.exports = {
    name: "add-category",
    description: "Create a category",
    permissions: ["MANAGE_CHANNELS"],
    options: [
        {
            name: "name",
            description: "The name of your category",
            type: "STRING",
            required: true,
        },
    ],
    run,
}