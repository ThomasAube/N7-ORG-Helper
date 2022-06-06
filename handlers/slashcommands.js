const { getFiles } = require("../util/functions")
const fs = require("fs")

module.exports = (bot, reload) => {
    const {client} = bot

    fs.readdirSync("./slashcommands/").forEach((category) => {
        let slashcommands = getFiles(`./slashcommands/${category}`, ".js")
        slashcommands.forEach(f => {
            if(reload) delete require.cache(require.resolve(`../slashcommands/${category}/${f}`))
            const slashcommand = require(`../slashcommands/${category}/${f}`)
            client.slashcommands.set(slashcommand.name, slashcommand)
        })
    })
    console.log(`Loaded ${client.slashcommands.size} slashcommands`)
}