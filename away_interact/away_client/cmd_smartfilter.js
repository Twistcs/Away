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
                        guildInformation.data.smartFilter = true;
                        module.exports.Data.writeFile(guildInformation.id, guildInformation);
                        msg.reply(
                            new module.exports.Discord.RichEmbed()
                            .setColor(module.exports.Configuration.color)
                            .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                            .setThumbnail(module.exports.Configuration.thumbnail)
                            .addField('**Success!**', module.exports.Configuration.adminCommands.smartfilter.success)
                        );
                    } else if(parsedContent.args[0].toLowerCase() == 'disable') {
                        guildInformation.data.smartFilter = false;
                        module.exports.Data.writeFile(guildInformation.id, guildInformation);
                        msg.reply(
                            new module.exports.Discord.RichEmbed()
                            .setColor(module.exports.Configuration.color)
                            .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                            .setThumbnail(module.exports.Configuration.thumbnail)
                            .addField('**Success!**', module.exports.Configuration.adminCommands.smartfilter.success)
                        );
                    } else if(!isNaN(parsedContent.args[0]) && parsedContent.args[0] >= 1 && parsedContent.args[0] <= 99) {
                        guildInformation.data.filterThreshold = parsedContent.args[0];
                        module.exports.Data.writeFile(guildInformation.id, guildInformation);
                        module.exports.ClientModules['job_eval.js'].loadNewModel(guildInformation.id, parsedContent.args[0]);
                        msg.reply(
                            new module.exports.Discord.RichEmbed()
                            .setColor(module.exports.Configuration.color)
                            .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                            .setThumbnail(module.exports.Configuration.thumbnail)
                            .addField('**Success!**', module.exports.Configuration.adminCommands.smartfilter.success)
                        );
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