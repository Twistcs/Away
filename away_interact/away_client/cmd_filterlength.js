module.exports = {
    message: (guildInformation, parsedContent, msg) => {
        if(parsedContent.command && parsedContent.command == 'filterlength') {
            if(module.exports.ClientModules['util_permission.js'].hasPermissionFromMsg(msg, 'ADMINISTRATOR')) {
                if(parsedContent.args.length == 0) {
                    msg.reply(
                        new module.exports.Discord.RichEmbed()
                        .setColor(module.exports.Configuration.color)
                        .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                        .setThumbnail(module.exports.Configuration.thumbnail)
                        .addField('**Current Lengths (in seconds):**', 
                            'Tempban: ' + guildInformation.data.tempbanLength + ' seconds.\n' +
                            'Mute: ' + guildInformation.data.muteLength + ' seconds.'
                        )
                    );
                } else if(parsedContent.args.length == 2 && !isNaN(parsedContent.args[1])) {
                    if(parsedContent.args[0].toLowerCase() == 'mute') {
                        msg.reply(
                            new module.exports.Discord.RichEmbed()
                            .setColor(module.exports.Configuration.color)
                            .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                            .setThumbnail(module.exports.Configuration.thumbnail)
                            .addField('**Success!**', module.exports.Configuration.adminCommands.filterlength.success)
                        );
                        guildInformation.data.muteLength = parsedContent.args[1];
                        module.exports.Data.writeFile(guildInformation.id, guildInformation);
                    } else if(parsedContent.args[0].toLowerCase() == 'tempban') {
                        msg.reply(
                            new module.exports.Discord.RichEmbed()
                            .setColor(module.exports.Configuration.color)
                            .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                            .setThumbnail(module.exports.Configuration.thumbnail)
                            .addField('**Success!**', module.exports.Configuration.adminCommands.filterlength.success)
                        );
                        guildInformation.data.tempbanLength = parsedContent.args[1];
                        module.exports.Data.writeFile(guildInformation.id, guildInformation);
                    } else {
                        msg.reply(
                            new module.exports.Discord.RichEmbed()
                            .setColor(module.exports.Configuration.color)
                            .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                            .setThumbnail(module.exports.Configuration.thumbnail)
                            .addField('**Argument Error:**', module.exports.Configuration.adminCommands.filterlength.error)
                            .addField('**Correct Use:**', module.exports.Configuration.adminCommands.filterlength.usage)
                        );
                    }
                } else {
                    msg.reply(
                        new module.exports.Discord.RichEmbed()
                        .setColor(module.exports.Configuration.color)
                        .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                        .setThumbnail(module.exports.Configuration.thumbnail)
                        .addField('**Argument Error:**', module.exports.Configuration.adminCommands.filterlength.error)
                        .addField('**Correct Use:**', module.exports.Configuration.adminCommands.filterlength.usage)
                    );
                }
            }
        }
    }
};