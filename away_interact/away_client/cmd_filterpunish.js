module.exports = {
    message: (guildInformation, parsedContent, msg) => {
        if(parsedContent.command && parsedContent.command == 'filterpunish') {
            if(module.exports.ClientModules['util_permission.js'].hasPermissionFromMsg(msg, 'ADMINISTRATOR')) {
                if(parsedContent.args.length == 2 && !isNaN(parsedContent.args[1])) {
                    if(parsedContent.args[0] == 'ban') {
                        guildInformation.data.flagsBeforeBan = parsedContent.args[1];
                        module.exports.Data.writeFile(guildInformation.id, 'json', JSON.stringify(guildInformation));
                        msg.reply(
                            new module.exports.Discord.RichEmbed()
                            .setColor(module.exports.Configuration.color)
                            .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                            .setThumbnail(module.exports.Configuration.thumbnail)
                            .addField('**Success!**', module.exports.Configuration.adminCommands.filterpunish.success)
                        );
                    } else if(parsedContent.args[0] == 'kick') {
                        guildInformation.data.flagsBeforeKick = parsedContent.args[1];
                        module.exports.Data.writeFile(guildInformation.id, 'json', JSON.stringify(guildInformation));
                        msg.reply(
                            new module.exports.Discord.RichEmbed()
                            .setColor(module.exports.Configuration.color)
                            .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                            .setThumbnail(module.exports.Configuration.thumbnail)
                            .addField('**Success!**', module.exports.Configuration.adminCommands.filterpunish.success)
                        );
                    } else if(parsedContent.args[0] == 'mute') {
                        guildInformation.data.flagsBeforeMute = parsedContent.args[1];
                        module.exports.Data.writeFile(guildInformation.id, 'json', JSON.stringify(guildInformation));
                        msg.reply(
                            new module.exports.Discord.RichEmbed()
                            .setColor(module.exports.Configuration.color)
                            .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                            .setThumbnail(module.exports.Configuration.thumbnail)
                            .addField('**Success!**', module.exports.Configuration.adminCommands.filterpunish.success)
                        );
                    } else if(parsedContent.args[0] == 'tempban') {
                        guildInformation.data.flagsBeforeTempban = parsedContent.args[1];
                        module.exports.Data.writeFile(guildInformation.id, 'json', JSON.stringify(guildInformation));
                        msg.reply(
                            new module.exports.Discord.RichEmbed()
                            .setColor(module.exports.Configuration.color)
                            .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                            .setThumbnail(module.exports.Configuration.thumbnail)
                            .addField('**Success!**', module.exports.Configuration.adminCommands.filterpunish.success)
                        );
                    } else {
                        msg.reply(
                            new module.exports.Discord.RichEmbed()
                            .setColor(module.exports.Configuration.color)
                            .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                            .setThumbnail(module.exports.Configuration.thumbnail)
                            .addField('**Argument Error:**', module.exports.Configuration.adminCommands.filterpunish.error)
                            .addField('**Correct Use:**', module.exports.Configuration.adminCommands.filterpunish.usage)
                        );
                    }
                } else {
                    msg.reply(
                        new module.exports.Discord.RichEmbed()
                        .setColor(module.exports.Configuration.color)
                        .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                        .setThumbnail(module.exports.Configuration.thumbnail)
                        .addField('**Argument Error:**', module.exports.Configuration.adminCommands.filterpunish.error)
                        .addField('**Correct Use:**', module.exports.Configuration.adminCommands.filterpunish.usage)
                    );
                }
            }
        }
    }
};