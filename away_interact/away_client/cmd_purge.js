module.exports = {
    message: (guildInformation, parsedContent, msg) => {
        if(parsedContent.command && parsedContent.command == 'purge' && msg.channel.name != 'flagged' && msg.channel.name != 'audit') {
            if(module.exports.ClientModules['util_permission.js'].hasPermissionFromMsg(msg, 'MANAGE_MESSAGES')) {
                if(parsedContent.args.length == 1 && !isNaN(parsedContent.args[0]) && parsedContent.args[0] > 0 && parsedContent.args[0] <= 100) {
                    msg.channel.fetchMessages({ limit: parsedContent.args[0] }).then(messages => msg.channel.bulkDelete(messages));
                    msg.reply(
                        new module.exports.Discord.RichEmbed()
                        .setColor(module.exports.Configuration.color)
                        .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                        .setThumbnail(module.exports.Configuration.thumbnail)
                        .addField('**Success!**', module.exports.Configuration.adminCommands.purge.success)
                    );
                } else {
                    msg.reply(
                        new module.exports.Discord.RichEmbed()
                        .setColor(module.exports.Configuration.color)
                        .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                        .setThumbnail(module.exports.Configuration.thumbnail)
                        .addField('**Argument Error:**', module.exports.Configuration.adminCommands.purge.error)
                        .addField('**Correct Use:**', module.exports.Configuration.adminCommands.purge.usage)
                    );
                }
            }
        }
    }
};