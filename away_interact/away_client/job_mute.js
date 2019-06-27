module.exports = {
    message: (guildInformation, parsedContent, msg) => {
        if(msg.member.roles.find(role => role.name == 'Muted') != null) {
            msg.delete();
            try {
                msg.author.send(
                    new module.exports.Discord.RichEmbed()
                    .setColor(module.exports.Configuration.color)
                    .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                    .setThumbnail(module.exports.Configuration.thumbnail)
                    .addField('**Server:**', msg.guild.name)
                    .addField('**Attention:**', module.exports.Configuration.reasons.deletionMessageMuted)
                    .addField('**Message:**', msg.content)
                );
                msg.guild.channels.find(channel => channel.name == 'other').send(
                    new module.exports.Discord.RichEmbed()
                    .setColor(module.exports.Configuration.color)
                    .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                    .setThumbnail(module.exports.Configuration.thumbnail)
                    .addField('**Message Author ID:**', msg.author.id)
                    .addField('**Message Author Tag:**', '@' + msg.author.tag)
                    .addField('**Message:**', msg.content)
                    .addField('**Direct Action:**', module.exports.Configuration.reasons.deletionMessageMuted)
                    .setTimestamp()
                );
            } catch(e) {
                // Same garbage. People deleting channels or person's DM disabled.
            }
        }
    },
    muteUser: async(guild, member, muteLength) => {
        let exists = await guild.roles.find(role => role.name == 'Muted') != null;
        if(!exists) {
            await guild.createRole({
                name: 'Muted',
                color: 'DARKER_GREY'
            }, module.exports.Configuration.reasons.roleCreation);
        }
        member.addRole(guild.roles.find(role => role.name == 'Muted'), module.exports.Configuration.reasons.rolePushShift).then(_ => {
            setTimeout(_ => {
                try {
                    member.removeRole(guild.roles.find(role => role.name == 'Muted'), module.exports.Configuration.reasons.rolePushShift);
                } catch(e) {
                    // Role is probably already gone or an admin deleted the role. Shame.
                }
            }, muteLength * 1000);
        });
    }
}