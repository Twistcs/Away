module.exports = {
    message: (guildInformation, parsedContent, msg) => {
        if(parsedContent.command && parsedContent.command == 'whitelist') {
            if(module.exports.ClientModules['util_permission.js'].hasPermissionFromMsg(msg, 'ADMINISTRATOR')) {
                if(parsedContent.args.length == 0) {
                    msg.reply(
                        new module.exports.Discord.RichEmbed()
                        .setColor(module.exports.Configuration.color)
                        .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                        .setThumbnail(module.exports.Configuration.thumbnail)
                        .addField('**Whitelisted Keywords:**', guildInformation.data.whitelistedKeywords.join(', ').toLowerCase() || 'N/A')
                    );
                } else if(parsedContent.args.length == 2) {
                    if(parsedContent.args[0].toLowerCase() == 'add') {
                        if(guildInformation.data.whitelistedKeywords.includes(parsedContent.args[1].toLowerCase())) {
                            msg.reply(
                                new module.exports.Discord.RichEmbed()
                                .setColor(module.exports.Configuration.color)
                                .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                                .setThumbnail(module.exports.Configuration.thumbnail)
                                .addField('**Includes Error:**', module.exports.Configuration.adminCommands.whitelist.includesError)
                            );
                        } else {
                            msg.reply(
                                new module.exports.Discord.RichEmbed()
                                .setColor(module.exports.Configuration.color)
                                .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                                .setThumbnail(module.exports.Configuration.thumbnail)
                                .addField('**Success!**', module.exports.Configuration.adminCommands.whitelist.success)
                            );
                            guildInformation.data.whitelistedKeywords.push(parsedContent.args[1].toLowerCase());
                            module.exports.Data.writeFile(guildInformation.id, guildInformation);
                        }
                    } else if(parsedContent.args[0].toLowerCase() == 'remove') {
                        if(!guildInformation.data.whitelistedKeywords.includes(parsedContent.args[1].toLowerCase())) {
                            msg.reply(
                                new module.exports.Discord.RichEmbed()
                                .setColor(module.exports.Configuration.color)
                                .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                                .setThumbnail(module.exports.Configuration.thumbnail)
                                .addField('**Includes Error:**', module.exports.Configuration.adminCommands.whitelist.includesError)
                            );
                        } else {
                            msg.reply(
                                new module.exports.Discord.RichEmbed()
                                .setColor(module.exports.Configuration.color)
                                .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                                .setThumbnail(module.exports.Configuration.thumbnail)
                                .addField('**Success!**', module.exports.Configuration.adminCommands.whitelist.success)
                            );
                            guildInformation.data.whitelistedKeywords.splice(guildInformation.data.whitelistedKeywords.indexOf(parsedContent.args[1].toLowerCase()), 1);
                            module.exports.Data.writeFile(guildInformation.id, guildInformation);
                        }
                    } else {
                        msg.reply(
                            new module.exports.Discord.RichEmbed()
                            .setColor(module.exports.Configuration.color)
                            .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                            .setThumbnail(module.exports.Configuration.thumbnail)
                            .addField('**Argument Error:**', module.exports.Configuration.adminCommands.whitelist.error)
                            .addField('**Correct Use:**', module.exports.Configuration.adminCommands.whitelist.usage)
                        );
                    }
                } else {
                    msg.reply(
                        new module.exports.Discord.RichEmbed()
                        .setColor(module.exports.Configuration.color)
                        .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                        .setThumbnail(module.exports.Configuration.thumbnail)
                        .addField('**Argument Error:**', module.exports.Configuration.adminCommands.whitelist.error)
                        .addField('**Correct Use:**', module.exports.Configuration.adminCommands.whitelist.usage)
                    );
                }
            }
        }
    }
};