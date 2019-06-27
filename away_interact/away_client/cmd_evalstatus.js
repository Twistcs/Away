module.exports = {
    message: (guildInformation, parsedContent, msg) => {
        if(parsedContent.command && parsedContent.command == 'evalstatus') {
            if(module.exports.ClientModules['util_permission.js'].hasPermissionFromMsg(msg, 'ADMINISTRATOR')) {
                if(parsedContent.args.length == 1) {
                    if(parsedContent.args[0] == 'enable') {
                        guildInformation.data.stringEvaluation = true;
                        module.exports.Data.writeFile(guildInformation.id, 'json', JSON.stringify(guildInformation));
                        msg.reply(
                            new module.exports.Discord.RichEmbed()
                            .setColor(module.exports.Configuration.color)
                            .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                            .setThumbnail(module.exports.Configuration.thumbnail)
                            .addField('**Success!**', module.exports.Configuration.adminCommands.evalstatus.success)
                        );
                    } else if(parsedContent.args[0] == 'disable') {
                        guildInformation.data.stringEvaluation = false;
                        module.exports.Data.writeFile(guildInformation.id, 'json', JSON.stringify(guildInformation));
                        msg.reply(
                            new module.exports.Discord.RichEmbed()
                            .setColor(module.exports.Configuration.color)
                            .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                            .setThumbnail(module.exports.Configuration.thumbnail)
                            .addField('**Success!**', module.exports.Configuration.adminCommands.evalstatus.success)
                        );
                    } else if(!isNaN(parsedContent.args[0]) && parsedContent.args[0] >= 1 && parsedContent.args[0] <= 7) {
                        guildInformation.data.evaluationStrength = parsedContent.args[0];
                        module.exports.Data.writeFile(guildInformation.id, 'json', JSON.stringify(guildInformation));
                        msg.reply(
                            new module.exports.Discord.RichEmbed()
                            .setColor(module.exports.Configuration.color)
                            .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                            .setThumbnail(module.exports.Configuration.thumbnail)
                            .addField('**Success!**', module.exports.Configuration.adminCommands.evalstatus.success)
                        );
                    } else {
                        msg.reply(
                            new module.exports.Discord.RichEmbed()
                            .setColor(module.exports.Configuration.color)
                            .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                            .setThumbnail(module.exports.Configuration.thumbnail)
                            .addField('**Argument Error:**', module.exports.Configuration.adminCommands.evalstatus.error)
                            .addField('**Correct Use:**', module.exports.Configuration.adminCommands.evalstatus.usage)
                        );
                    }
                } else {
                    msg.reply(
                        new module.exports.Discord.RichEmbed()
                        .setColor(module.exports.Configuration.color)
                        .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                        .setThumbnail(module.exports.Configuration.thumbnail)
                        .addField('**Argument Error:**', module.exports.Configuration.adminCommands.evalstatus.error)
                        .addField('**Correct Use:**', module.exports.Configuration.adminCommands.evalstatus.usage)
                    );
                }
            }
        }
    }
};