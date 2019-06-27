module.exports = {
    message: (guildInformation, parsedContent, msg) => {
        if(parsedContent.command && parsedContent.command == 'prefix') {
            if(module.exports.ClientModules['util_permission.js'].hasPermissionFromMsg(msg, 'ADMINISTRATOR')) {
                if(parsedContent.args.length == 1) {
                    let prefix = parsedContent.args[0];
                    guildInformation.prefix = prefix;
                    module.exports.Data.writeFile(guildInformation.id, 'json', JSON.stringify(guildInformation));
                    msg.reply(
                        new module.exports.Discord.RichEmbed()
                        .setColor(module.exports.Configuration.color)
                        .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                        .setThumbnail(module.exports.Configuration.thumbnail)
                        .addField('**Success!**', module.exports.Configuration.adminCommands.prefix.success)
                    );
                } else {
                    msg.reply(
                        new module.exports.Discord.RichEmbed()
                        .setColor(module.exports.Configuration.color)
                        .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                        .setThumbnail(module.exports.Configuration.thumbnail)
                        .addField('**Argument Error:**', module.exports.Configuration.adminCommands.prefix.error)
                        .addField('**Correct Use:**', module.exports.Configuration.adminCommands.prefix.usage)
                    );
                }
            }
        }
    }
};