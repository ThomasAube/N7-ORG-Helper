module.exports = {
    name: "ready",
    run: async (bot) => {
        console.log(`Logged in as ${bot.client.user.tag}`)

        bot.client.guilds.cache.forEach(async (guild) => {
            await guild.commands.set([...bot.client.slashcommands.values()])
        })
    }
}