module.exports = {
    message: (guildInformation, parsedContent, msg) => {
        if(parsedContent.command && parsedContent.command == 'evalpunish') {
            if(module.exports.ClientModules['util_permission.js'].hasPermissionFromMsg(msg, 'ADMINISTRATOR')) {
                if(parsedContent.args.length == 2 && !isNaN(parsedContent.args[1])) {
                    if(parsedContent.args[0] == 'ban') {
                        guildInformation.data.evaluationsBeforeBan = parsedContent.args[1];
                        module.exports.Data.writeFile(guildInformation.id, 'json', JSON.stringify(guildInformation));
                        msg.reply(
                            new module.exports.Discord.RichEmbed()
                            .setColor(module.exports.Configuration.color)
                            .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                            .setThumbnail(module.exports.Configuration.thumbnail)
                            .addField('**Success!**', module.exports.Configuration.adminCommands.evalpunish.success)
                        );
                    } else if(parsedContent.args[0] == 'kick') {
                        guildInformation.data.evaluationsBeforeKick = parsedContent.args[1];
                        module.exports.Data.writeFile(guildInformation.id, 'json', JSON.stringify(guildInformation));
                        msg.reply(
                            new module.exports.Discord.RichEmbed()
                            .setColor(module.exports.Configuration.color)
                            .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                            .setThumbnail(module.exports.Configuration.thumbnail)
                            .addField('**Success!**', module.exports.Configuration.adminCommands.evalpunish.success)
                        );
                    } else if(parsedContent.args[0] == 'mute') {
                        guildInformation.data.evaluationsBeforeMute = parsedContent.args[1];
                        module.exports.Data.writeFile(guildInformation.id, 'json', JSON.stringify(guildInformation));
                        msg.reply(
                            new module.exports.Discord.RichEmbed()
                            .setColor(module.exports.Configuration.color)
                            .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                            .setThumbnail(module.exports.Configuration.thumbnail)
                            .addField('**Success!**', module.exports.Configuration.adminCommands.evalpunish.success)
                        );
                    } else {
                        msg.reply(
                            new module.exports.Discord.RichEmbed()
                            .setColor(module.exports.Configuration.color)
                            .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                            .setThumbnail(module.exports.Configuration.thumbnail)
                            .addField('**Argument Error:**', module.exports.Configuration.adminCommands.evalpunish.error)
                            .addField('**Correct Use:**', module.exports.Configuration.adminCommands.evalpunish.usage)
                        );
                    }
                } else {
                    msg.reply(
                        new module.exports.Discord.RichEmbed()
                        .setColor(module.exports.Configuration.color)
                        .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                        .setThumbnail(module.exports.Configuration.thumbnail)
                        .addField('**Argument Error:**', module.exports.Configuration.adminCommands.evalpunish.error)
                        .addField('**Correct Use:**', module.exports.Configuration.adminCommands.evalpunish.usage)
                    );
                }
            }
        }
    }
};