module.exports = {
    message: (guildInformation, parsedContent, msg) => {
        if(!msg.author.bot && msg.channel.parent.name == module.exports.Configuration.logsCategory) {
            msg.delete();
        }
    },
    create: guild => {
        guild.createChannel(module.exports.Configuration.logsCategory, {
            type: 'category',
            permissionOverwrites: [{
                id: guild.id,
                deny: ['VIEW_CHANNEL']
            }]
        }).then(_ => {
            guild.createChannel('flagged', {
                type: 'text',
                parent: guild.channels.find(channel => channel.name == module.exports.Configuration.logsCategory)
            }).then(_ => {
                guild.channels.find(channel => channel.name == 'flagged' && channel.parent == guild.channels.find(channel => channel.name == module.exports.Configuration.logsCategory && channel.type == 'category')).send(
                    new module.exports.Discord.RichEmbed()
                    .setColor(module.exports.Configuration.color)
                    .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                    .setThumbnail(module.exports.Configuration.thumbnail)
                    .addField('**Away -> Smart Filter**', 'All flagged smart filter messages will be documented in this channel.')
                );
            });
            guild.createChannel('audit', {
                type: 'text',
                parent: guild.channels.find(channel => channel.name == module.exports.Configuration.logsCategory)
            }).then(_ => {
                guild.channels.find(channel => channel.name == 'audit' && channel.parent == guild.channels.find(channel => channel.name == module.exports.Configuration.logsCategory && channel.type == 'category')).send(
                    new module.exports.Discord.RichEmbed()
                    .setColor(module.exports.Configuration.color)
                    .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                    .setThumbnail(module.exports.Configuration.thumbnail)
                    .addField('**Away -> Audit Logs+**', 'All actions (more than that of the default Audit Log) will be documented in this channel.')
                );
            });
        });
    },
    guildBanAdd: async data => {
        let guild = data.leading;
        let user = data.lagging;
        let bans = await guild.fetchBans(true);
        let banInfo = await bans.find(ban => ban.user.id == user.id);
        guild.channels.find(channel => channel.name == 'audit' && channel.parent == guild.channels.find(channel => channel.name == module.exports.Configuration.logsCategory && channel.type == 'category')).send(
            new module.exports.Discord.RichEmbed()
            .setColor(module.exports.Configuration.color)
            .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
            .setThumbnail(module.exports.Configuration.thumbnail)
            .addField('**Action Type:**', banInfo.reason == module.exports.Configuration.reasons.banReason ? 'Automatic Ban' : 'Manual Ban')
            .addField('**User ID:**', user.id)
            .addField('**User Tag:**', user.tag)
            .addField('**Ban Reason:**', banInfo.reason || 'N/A')
            .setTimestamp()
        );
    },
    guildBanRemove: data => {
        let guild = data.leading;
        let user = data.lagging;
        guild.channels.find(channel => channel.name == 'audit' && channel.parent == guild.channels.find(channel => channel.name == module.exports.Configuration.logsCategory && channel.type == 'category')).send(
            new module.exports.Discord.RichEmbed()
            .setColor(module.exports.Configuration.color)
            .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
            .setThumbnail(module.exports.Configuration.thumbnail)
            .addField('**Action Type:**', 'Manual Unban')
            .addField('**User ID:**', user.id)
            .addField('**User Tag:**', user.tag)
            .setTimestamp()
        );
    },
    guildMemberRemove: data => {
        let member = data.leading;
        let guild = member.guild;
        guild.channels.find(channel => channel.name == 'audit' && channel.parent == guild.channels.find(channel => channel.name == module.exports.Configuration.logsCategory && channel.type == 'category')).send(
            new module.exports.Discord.RichEmbed()
            .setColor(module.exports.Configuration.color)
            .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
            .setThumbnail(module.exports.Configuration.thumbnail)
            .addField('**Action Type:**', 'Left / Manual Kick')
            .addField('**User ID:**', member.id)
            .addField('**User Tag:**', member.user.tag)
            .setTimestamp()
        );
    },
    guildMemberUpdate: data => {
        let oldMember = data.leading;
        let newMember = data.lagging;
        let guild = newMember.guild;
        if(oldMember.roles != newMember.roles) {
            let previousRoles = [];
            let newRoles = [];
            oldMember.roles.forEach(role => {
                if(role.name != '@everyone') {
                    previousRoles.push(role.name);
                }
            });
            newMember.roles.forEach(role => {
                if(role.name != '@everyone') {
                    newRoles.push(role.name);
                }
            });
            if(oldMember.roles.size < newMember.roles.size) {
                guild.channels.find(channel => channel.name == 'audit' && channel.parent == guild.channels.find(channel => channel.name == module.exports.Configuration.logsCategory && channel.type == 'category')).send(
                    new module.exports.Discord.RichEmbed()
                    .setColor(module.exports.Configuration.color)
                    .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                    .setThumbnail(module.exports.Configuration.thumbnail)
                    .addField('**Action Type:**', 'Role Added')
                    .addField('**User ID:**', newMember.id)
                    .addField('**User Tag:**', newMember.user.tag)
                    .addField('**Previous Roles:**', previousRoles.join(', '))
                    .addField('**New Roles:**', newRoles.join(', '))
                    .setTimestamp()
                ); 
            } else {
                guild.channels.find(channel => channel.name == 'audit' && channel.parent == guild.channels.find(channel => channel.name == module.exports.Configuration.logsCategory && channel.type == 'category')).send(
                    new module.exports.Discord.RichEmbed()
                    .setColor(module.exports.Configuration.color)
                    .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                    .setThumbnail(module.exports.Configuration.thumbnail)
                    .addField('**Action Type:**', 'Role Removed')
                    .addField('**User ID:**', newMember.id)
                    .addField('**User Tag:**', newMember.user.tag)
                    .addField('**Previous Roles:**', previousRoles.join(', '))
                    .addField('**New Roles:**', newRoles.join(', '))
                    .setTimestamp()
                ); 
            }
        } else if(oldMember.nickname != newMember.nickname) {
            guild.channels.find(channel => channel.name == 'audit' && channel.parent == guild.channels.find(channel => channel.name == module.exports.Configuration.logsCategory && channel.type == 'category')).send(
                new module.exports.Discord.RichEmbed()
                .setColor(module.exports.Configuration.color)
                .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                .setThumbnail(module.exports.Configuration.thumbnail)
                .addField('**Action Type:**', 'Nickname Changed')
                .addField('**User ID:**', newMember.id)
                .addField('**User Tag:**', newMember.user.tag)
                .addField('**Old Nickname:**', oldMember.nickname)
                .addField('**New Nickname:**', newMember.nickname)
                .setTimestamp()
            ); 
        }
    },
    messageUpdate: data => {
        let oldMessage = data.leading;
        let newMessage = data.lagging;
        let guild = newMessage.guild;
        if(oldMessage.content != newMessage.content) {
            guild.channels.find(channel => channel.name == 'audit' && channel.parent == guild.channels.find(channel => channel.name == module.exports.Configuration.logsCategory && channel.type == 'category')).send(
                new module.exports.Discord.RichEmbed()
                .setColor(module.exports.Configuration.color)
                .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                .setThumbnail(module.exports.Configuration.thumbnail)
                .addField('**Action Type:**', 'Message Edit')
                .addField('**User ID:**', newMessage.author.id)
                .addField('**User Tag:**', newMessage.author.tag)
                .addField('**Message ID:**', newMessage.id)
                .addField('**Old Content:**', oldMessage.content)
                .addField('**New Content:**', newMessage.content)
                .setTimestamp()
            ); 
        }
    },
    roleCreate: data => {
        let role = data.leading;
        let guild = role.guild;
        guild.channels.find(channel => channel.name == 'audit' && channel.parent == guild.channels.find(channel => channel.name == module.exports.Configuration.logsCategory && channel.type == 'category')).send(
            new module.exports.Discord.RichEmbed()
            .setColor(module.exports.Configuration.color)
            .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
            .setThumbnail(module.exports.Configuration.thumbnail)
            .addField('**Action Type:**', 'Role Created')
            .addField('**Role ID:**', role.id)
            .addField('**Role Name:**', role.name)
            .setTimestamp()
        ); 
    },
    roleDelete: data => {
        let role = data.leading;
        let guild = role.guild;
        guild.channels.find(channel => channel.name == 'audit' && channel.parent == guild.channels.find(channel => channel.name == module.exports.Configuration.logsCategory && channel.type == 'category')).send(
            new module.exports.Discord.RichEmbed()
            .setColor(module.exports.Configuration.color)
            .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
            .setThumbnail(module.exports.Configuration.thumbnail)
            .addField('**Action Type:**', 'Role Deleted')
            .addField('**Role ID:**', role.id)
            .addField('**Role Name:**', role.name)
            .setTimestamp()
        );
    },
    roleUpdate: data => {
        let oldRole = data.leading;
        let newRole = data.leading;
        let guild = newRole.guild;
        if(oldRole.name != newRole.name) {
            guild.channels.find(channel => channel.name == 'audit' && channel.parent == guild.channels.find(channel => channel.name == module.exports.Configuration.logsCategory && channel.type == 'category')).send(
                new module.exports.Discord.RichEmbed()
                .setColor(module.exports.Configuration.color)
                .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                .setThumbnail(module.exports.Configuration.thumbnail)
                .addField('**Action Type:**', 'Role Name Modified')
                .addField('**Role ID:**', newRole.id)
                .addField('**Old Role Name:**', oldRole.name)
                .addField('**New Role Name:**', newRole.name)
                .setTimestamp()
            );
        }
        if(oldRole.permissions != newRole.permissions) {
            guild.channels.find(channel => channel.name == 'audit' && channel.parent == guild.channels.find(channel => channel.name == module.exports.Configuration.logsCategory && channel.type == 'category')).send(
                new module.exports.Discord.RichEmbed()
                .setColor(module.exports.Configuration.color)
                .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                .setThumbnail(module.exports.Configuration.thumbnail)
                .addField('**Action Type:**', 'Role Permissions Modified')
                .addField('**Role ID:**', newRole.id)
                .addField('**Role Name:**', newRole.name)
                .setTimestamp()
            );
        }
        if(oldRole.hexColor != newRole.hexColor) {
            guild.channels.find(channel => channel.name == 'audit' && channel.parent == guild.channels.find(channel => channel.name == module.exports.Configuration.logsCategory && channel.type == 'category')).send(
                new module.exports.Discord.RichEmbed()
                .setColor(module.exports.Configuration.color)
                .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                .setThumbnail(module.exports.Configuration.thumbnail)
                .addField('**Action Type:**', 'Role Color Modified')
                .addField('**Role ID:**', newRole.id)
                .addField('**Role Name:**', newRole.name)
                .addField('**Old Role Color:**', oldRole.hexColor || 'N/A')
                .addField('**New Role Color:**', newRole.hexColor || 'N/A')
                .setTimestamp()
            );
        }
    }
};