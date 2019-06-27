module.exports = {
    message: (guildInformation, parsedContent, msg) => {
        if(parsedContent.command && parsedContent.command == 'blacklist') {
            if(module.exports.ClientModules['util_permission.js'].hasPermissionFromMsg(msg, 'ADMINISTRATOR')) {
                if(parsedContent.args.length == 2) {
                    if(parsedContent.args[0] == 'add') {
                        if(guildInformation.data.blacklistedKeywords.includes(parsedContent.args[1])) {
                            msg.reply(
                                new module.exports.Discord.RichEmbed()
                                .setColor(module.exports.Configuration.color)
                                .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                                .setThumbnail(module.exports.Configuration.thumbnail)
                                .addField('**Includes Error:**', module.exports.Configuration.adminCommands.blacklist.includesError)
                            );
                        } else {
                            guildInformation.data.blacklistedKeywords.push(parsedContent.args[1]);
                            module.exports.Data.writeFile(guildInformation.id, 'json', JSON.stringify(guildInformation));
                            msg.reply(
                                new module.exports.Discord.RichEmbed()
                                .setColor(module.exports.Configuration.color)
                                .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                                .setThumbnail(module.exports.Configuration.thumbnail)
                                .addField('**Success!**', module.exports.Configuration.adminCommands.blacklist.success)
                            );
                        }
                    } else if(parsedContent.args[0] == 'remove') {
                        if(!guildInformation.data.blacklistedKeywords.includes(parsedContent.args[1])) {
                            msg.reply(
                                new module.exports.Discord.RichEmbed()
                                .setColor(module.exports.Configuration.color)
                                .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                                .setThumbnail(module.exports.Configuration.thumbnail)
                                .addField('**Includes Error:**', module.exports.Configuration.adminCommands.blacklist.includesError)
                            );
                        } else {
                            guildInformation.data.blacklistedKeywords.splice(guildInformation.data.blacklistedKeywords.indexOf(parsedContent.args[1]), 1);
                            module.exports.Data.writeFile(guildInformation.id, 'json', JSON.stringify(guildInformation));
                            msg.reply(
                                new module.exports.Discord.RichEmbed()
                                .setColor(module.exports.Configuration.color)
                                .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                                .setThumbnail(module.exports.Configuration.thumbnail)
                                .addField('**Success!**', module.exports.Configuration.adminCommands.blacklist.success)
                            );
                        }
                    } else {
                        msg.reply(
                            new module.exports.Discord.RichEmbed()
                            .setColor(module.exports.Configuration.color)
                            .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                            .setThumbnail(module.exports.Configuration.thumbnail)
                            .addField('**Argument Error:**', module.exports.Configuration.adminCommands.blacklist.error)
                            .addField('**Correct Use:**', module.exports.Configuration.adminCommands.blacklist.usage)
                        );
                    }
                } else {
                    msg.reply(
                        new module.exports.Discord.RichEmbed()
                        .setColor(module.exports.Configuration.color)
                        .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                        .setThumbnail(module.exports.Configuration.thumbnail)
                        .addField('**Argument Error:**', module.exports.Configuration.adminCommands.blacklist.error)
                        .addField('**Correct Use:**', module.exports.Configuration.adminCommands.blacklist.usage)
                    );
                }
            }
        }
    }
};