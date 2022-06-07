const Discord = require("discord.js")

const run = async (client, interaction) => {
    let category = interaction.options.getChannel("category")
    let recursive = interaction.options.getBoolean("recursive")
    const categoryName = category.name

    if(category.type !== "GUILD_CATEGORY") interaction.reply("Please specify a category.")
    
    if(recursive && category.children.size !== 0) {
        await category.children.forEach(c => {
            interaction.guild.channels.delete(c)
        })
    }

    interaction.guild.channels.delete(category)
    .then(interaction.reply(`**${categoryName}** was deleted ${recursive ? "with its sub channels" : ""} !`))
}

module.exports = {
    name: "del-category",
    description: "Delete a category",
    permissions: ["MANAGE_CHANNELS"],
    options: [
        {
            name: "category",
            description: "The category you want to delete",
            type: "CHANNEL",
            required: true,
        },
        {
            name: "recursive",
            description: "True if you want to delete the category's sub-channels",
            type: "BOOLEAN",
            required: true,
        },
    ],
    run,
}