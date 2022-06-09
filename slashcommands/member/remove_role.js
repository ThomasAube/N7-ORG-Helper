const Discord = require("discord.js")

const run = async (client, interaction) => {
    let role = interaction.options.getRole("role")
    let everyone = interaction.options.getBoolean("everyone") || false
    let membersToUpdate = new Discord.Collection()

    if(everyone) {
        members = await interaction.guild.members.fetch()
        membersToUpdate = members.filter(m => m.roles.cache.has(role.id))
    }
    else {
        for(let i = 1; i <= 10; ++i) {
            let member = interaction.options.getMember(`user-${i}`)
            if(member) membersToUpdate.set(member.id, member)
        }
    }
    
    let updatedMembers = new Array()
    if(membersToUpdate.size === 0) interaction.reply("There is no member to update")

    const removingRole = new Promise((resolve, reject) => {
        membersToUpdate.forEach(m => {
            m.roles.remove(role).then(member => {
                updatedMembers.push(member)
                if(updatedMembers.length === membersToUpdate.size) resolve()
            })
        })
    })

    removingRole.then(() => {
        let answer = updatedMembers.map(m => `Role ${role} was retired from ${m} !`).join('\n')
        interaction.reply(answer)
    })
}

module.exports = {
    name: "remove-role",
    description: "Remove a role to a list of user",
    permissions: ["MANAGE_ROLES"],
    options: [
        {
            name: "role",
            description: "The role you want to remove from the users",
            type: "ROLE",
            required: true,
        },
        {
            name: "everyone",
            description: "Do you want to retire this role for everyone ?",
            type: "BOOLEAN",
            required: false,
        },
        {
            name: "user-1",
            description: "A user you want to give the role to",
            type: "USER",
            required: false,
        },
        {
            name: "user-2",
            description: "A user you want to give the role to",
            type: "USER",
            required: false,
        },
        {
            name: "user-3",
            description: "A user you want to give the role to",
            type: "USER",
            required: false,
        },
        {
            name: "user-4",
            description: "A user you want to give the role to",
            type: "USER",
            required: false,
        },
        {
            name: "user-5",
            description: "A user you want to give the role to",
            type: "USER",
            required: false,
        },
        {
            name: "user-6",
            description: "A user you want to give the role to",
            type: "USER",
            required: false,
        },
        {
            name: "user-7",
            description: "A user you want to give the role to",
            type: "USER",
            required: false,
        },
        {
            name: "user-8",
            description: "A user you want to give the role to",
            type: "USER",
            required: false,
        },
        {
            name: "user-9",
            description: "A user you want to give the role to",
            type: "USER",
            required: false,
        },
        {
            name: "user-10",
            description: "A user you want to give the role to",
            type: "USER",
            required: false,
        },
    ],
    run,
}