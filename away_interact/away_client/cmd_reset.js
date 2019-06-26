module.exports = {
    message: (guildInformation, parsedContent, msg) => {
        if(parsedContent.command && parsedContent.command == 'reset') {
            if(module.exports.ClientModules['util_permission.js'].hasPermissionFromMsg(msg, 'ADMINISTRATOR')) {
                module.exports.Data.createGuild(guildInformation.id);
                msg.reply(
                    new module.exports.Discord.RichEmbed()
                    .setColor(module.exports.Configuration.color)
                    .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                    .setThumbnail(module.exports.Configuration.thumbnail)
                    .addField('**Success!**', 'You have wiped and reset your server data for Away.')
                );
            }
        }
    }
};