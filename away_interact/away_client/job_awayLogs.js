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
            guild.createChannel('evaluation', {
                type: 'text',
                parent: guild.channels.find(channel => channel.name == module.exports.Configuration.logsCategory)
            }).then(_ => {
                guild.channels.find(channel => channel.name == 'evaluation' && channel.parent == guild.channels.find(channel => channel.name == module.exports.Configuration.logsCategory && channel.type == 'category')).send(
                    new module.exports.Discord.RichEmbed()
                    .setColor(module.exports.Configuration.color)
                    .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                    .setThumbnail(module.exports.Configuration.thumbnail)
                    .addField('**Away -> Evaluation Logs**', 'All message evaluation logs will actively appear in this channel.')
                );
            });
            guild.createChannel('flagged-evaluation', {
                type: 'text',
                parent: guild.channels.find(channel => channel.name == module.exports.Configuration.logsCategory)
            }).then(_ => {
                guild.channels.find(channel => channel.name == 'flagged-evaluation' && channel.parent == guild.channels.find(channel => channel.name == module.exports.Configuration.logsCategory && channel.type == 'category')).send(
                    new module.exports.Discord.RichEmbed()
                    .setColor(module.exports.Configuration.color)
                    .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                    .setThumbnail(module.exports.Configuration.thumbnail)
                    .addField('**Away -> Evaluation Logs**', 'All flagged message evaluation logs will actively appear in this channel.')
                );
            });
            guild.createChannel('other', {
                type: 'text',
                parent: guild.channels.find(channel => channel.name == module.exports.Configuration.logsCategory)
            }).then(_ => {
                guild.channels.find(channel => channel.name == 'other' && channel.parent == guild.channels.find(channel => channel.name == module.exports.Configuration.logsCategory && channel.type == 'category')).send(
                    new module.exports.Discord.RichEmbed()
                    .setColor(module.exports.Configuration.color)
                    .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                    .setThumbnail(module.exports.Configuration.thumbnail)
                    .addField('**Away -> Other Logs**', 'All moderator and user logs will actively appear in this channel.')
                );
            });
        });
    }
};