const Discord = require("discord.js")

const run = async (client, interaction) => {
    let role = interaction.options.getRole("role")
    let everyone = interaction.options.getBoolean("everyone") || false
    let membersToUpdate = new Discord.Collection()

    await interaction.reply("Wait...")
    if(everyone) {
        membersToUpdate = await interaction.guild.members.fetch()
    }
    else {
        for(let i = 1; i <= 10; ++i) {
            let member = interaction.options.getMember(`user-${i}`)
            if(member) membersToUpdate.set(member.id, member)
        }
    }
    
    let updatedMembers = new Array()
    if(membersToUpdate.size === 0) interaction.editReply("There is no member to add role")

    const addingRole = new Promise((resolve, reject) => {
        membersToUpdate.forEach(m => {
            m.roles.add(role).then(member => {
                updatedMembers.push(member)
                if(updatedMembers.length === membersToUpdate.size) resolve()
            })
        })
    })

    addingRole.then(() => {
        let answer = updatedMembers.map(m => `${m} have now the role ${role} !`).join('\n')
        interaction.editReply(answer)
    })
}

module.exports = {
    name: "give-role",
    description: "Add a role to a list of user",
    permissions: ["MANAGE_ROLES"],
    options: [
        {
            name: "role",
            description: "The role you want to give to the users",
            type: "ROLE",
            required: true,
        },
        {
            name: "everyone",
            description: "Do you want to add this role for everyone ?",
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