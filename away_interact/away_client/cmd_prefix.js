module.exports = {
    message: (guildInformation, parsedContent, msg) => {
        if(parsedContent.command && parsedContent.command == 'prefix') {
            msg.delete();
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
                        .addField('**Success!**', 'You have updated the prefix to ' + prefix)
                    );
                } else {
                    msg.reply(
                        new module.exports.Discord.RichEmbed()
                        .setColor(module.exports.Configuration.color)
                        .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                        .setThumbnail(module.exports.Configuration.thumbnail)
                        .addField('**Argument Error:**', 'Please specify a single phrase to set a new prefix.')
                        .addField('**Correct Use:**', 'prefix <phrase>')
                    );
                }
            }
        }
    }
};