module.exports = {
    message: (guildInformation, parsedContent, msg) => {
        if(parsedContent.command && parsedContent.command == 'dump') {
            if(module.exports.ClientModules['util_permission.js'].hasPermissionFromMsg(msg, 'ADMINISTRATOR')) {
                msg.reply(
                    new module.exports.Discord.RichEmbed()
                    .setColor(module.exports.Configuration.color)
                    .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                    .setThumbnail(module.exports.Configuration.thumbnail)
                    .addField('**Success!**', module.exports.Configuration.adminCommands.dump.success)
                    .addField('**Dump:**', JSON.stringify(guildInformation))
                );
            }
        }
    }
};