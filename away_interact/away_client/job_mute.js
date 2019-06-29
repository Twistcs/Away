module.exports = {
    message: (guildInformation, parsedContent, msg) => {
        if(msg.member.roles.find(role => role.name == 'Muted') != null) {
            if(module.exports.currentMuted.includes(msg.member.id)) {
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
                    msg.guild.channels.find(channel => channel.name == 'audit').send(
                        new module.exports.Discord.RichEmbed()
                        .setColor(module.exports.Configuration.color)
                        .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                        .setThumbnail(module.exports.Configuration.thumbnail)
                        .addField('**Action Type:**', 'Message Deleted (Muted)')
                        .addField('**User ID:**', msg.author.id)
                        .addField('**User Tag:**', '@' + msg.author.tag)
                        .addField('**Message:**', msg.content)
                        .setTimestamp()
                    );
                } catch(e) {
                    // Same garbage. People deleting channels or person's DM disabled.
                }
            } else {
                msg.member.removeRole(msg.guild.roles.find(role => role.name == 'Muted'), module.exports.Configuration.reasons.rolePushShift);
                try {
                    msg.author.send(
                        new module.exports.Discord.RichEmbed()
                        .setColor(module.exports.Configuration.color)
                        .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                        .setThumbnail(module.exports.Configuration.thumbnail)
                        .addField('**Server:**', msg.guild.name)
                        .addField('**Attention:**', module.exports.Configuration.reasons.unmuted)
                    );
                } catch(e) {
                    // Garbage from before.
                }
            }
        }
    },
    currentMuted: [],
    muteUser: async(guild, member, muteLength) => {
        let exists = await guild.roles.find(role => role.name == 'Muted') != null;
        if(!exists) {
            await guild.createRole({
                name: 'Muted',
                color: 'DARKER_GREY'
            }, module.exports.Configuration.reasons.roleCreation);
        }
        member.addRole(guild.roles.find(role => role.name == 'Muted'), module.exports.Configuration.reasons.rolePushShift).then(_ => {
            module.exports.currentMuted.push(member.id);
            setTimeout(_ => {
                try {
                    member.removeRole(guild.roles.find(role => role.name == 'Muted'), module.exports.Configuration.reasons.rolePushShift);
                    msg.author.send(
                        new module.exports.Discord.RichEmbed()
                        .setColor(module.exports.Configuration.color)
                        .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                        .setThumbnail(module.exports.Configuration.thumbnail)
                        .addField('**Server:**', msg.guild.name)
                        .addField('**Attention:**', module.exports.Configuration.reasons.unmuted)
                    );
                } catch(e) {
                    // Role is probably already gone or an admin deleted the role. Shame.
                }
            }, muteLength * 1000);
        });
    }
}