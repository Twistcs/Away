module.exports = {
    message: (guildInformation, parsedContent, msg) => {
        if(parsedContent.command && parsedContent.command == 'streval') {
            if(module.exports.ClientModules['util_permission.js'].hasPermissionFromMsg(msg, 'ADMINISTRATOR')) {
                if(parsedContent.args.length == 1) {
                    if(parsedContent.args[0] == 'enable') {
                        
                    } else if(parsedContent.args[0] == 'disable') {

                    } else if(!isNaN(parsedContent.args[0])) {

                    } else {
                        msg.reply(
                            new module.exports.Discord.RichEmbed()
                            .setColor(module.exports.Configuration.color)
                            .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                            .setThumbnail(module.exports.Configuration.thumbnail)
                            .addField('**Argument Error:**', module.exports.Configuration.adminCommands.streval.error)
                            .addField('**Correct Use:**', module.exports.Configuration.adminCommands.streval.usage)
                        );
                    }
                } else {
                    msg.reply(
                        new module.exports.Discord.RichEmbed()
                        .setColor(module.exports.Configuration.color)
                        .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                        .setThumbnail(module.exports.Configuration.thumbnail)
                        .addField('**Argument Error:**', module.exports.Configuration.adminCommands.streval.error)
                        .addField('**Correct Use:**', module.exports.Configuration.adminCommands.streval.usage)
                    );
                }
            }
        }
    }
};