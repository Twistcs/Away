module.exports = {
    message: (guildInformation, parsedContent, msg) => {
        if(parsedContent.command && parsedContent.command == 'smartfilter') {
            if(module.exports.ClientModules['util_permission.js'].hasPermissionFromMsg(msg, 'ADMINISTRATOR')) {
                if(parsedContent.args.length == 0) {
                    msg.reply(
                        new module.exports.Discord.RichEmbed()
                        .setColor(module.exports.Configuration.color)
                        .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                        .setThumbnail(module.exports.Configuration.thumbnail)
                        .addField('**Filter Status:**', guildInformation.data.smartFilter ? 'Enabled' : 'Disabled')
                        .addField('**Filter Threshold:**', guildInformation.data.filterThreshold + '%')
                    );
                } else if(parsedContent.args.length == 1) {
                    if(parsedContent.args[0].toLowerCase() == 'enable') {
                        msg.reply(
                            new module.exports.Discord.RichEmbed()
                            .setColor(module.exports.Configuration.color)
                            .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                            .setThumbnail(module.exports.Configuration.thumbnail)
                            .addField('**Success!**', module.exports.Configuration.adminCommands.smartfilter.success)
                        );
                        guildInformation.data.smartFilter = true;
                        module.exports.Data.writeFile(guildInformation.id, guildInformation);
                    } else if(parsedContent.args[0].toLowerCase() == 'disable') {
                        msg.reply(
                            new module.exports.Discord.RichEmbed()
                            .setColor(module.exports.Configuration.color)
                            .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                            .setThumbnail(module.exports.Configuration.thumbnail)
                            .addField('**Success!**', module.exports.Configuration.adminCommands.smartfilter.success)
                        );
                        guildInformation.data.smartFilter = false;
                        module.exports.Data.writeFile(guildInformation.id, guildInformation);
                    } else if(!isNaN(parsedContent.args[0]) && parsedContent.args[0] >= 1 && parsedContent.args[0] <= 99) {
                        msg.reply(
                            new module.exports.Discord.RichEmbed()
                            .setColor(module.exports.Configuration.color)
                            .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                            .setThumbnail(module.exports.Configuration.thumbnail)
                            .addField('**Success!**', module.exports.Configuration.adminCommands.smartfilter.success)
                        );
                        guildInformation.data.filterThreshold = parsedContent.args[0];
                        module.exports.Data.writeFile(guildInformation.id, guildInformation);
                        module.exports.ClientModules['job_smartfilter.js'].loadNewModel(guildInformation.id, parsedContent.args[0]);
                    } else {
                        msg.reply(
                            new module.exports.Discord.RichEmbed()
                            .setColor(module.exports.Configuration.color)
                            .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                            .setThumbnail(module.exports.Configuration.thumbnail)
                            .addField('**Argument Error:**', module.exports.Configuration.adminCommands.smartfilter.error)
                            .addField('**Correct Use:**', module.exports.Configuration.adminCommands.smartfilter.usage)
                        );
                    }
                } else {
                    msg.reply(
                        new module.exports.Discord.RichEmbed()
                        .setColor(module.exports.Configuration.color)
                        .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                        .setThumbnail(module.exports.Configuration.thumbnail)
                        .addField('**Argument Error:**', module.exports.Configuration.adminCommands.smartfilter.error)
                        .addField('**Correct Use:**', module.exports.Configuration.adminCommands.smartfilter.usage)
                    );
                }
            }
        }
    }
};