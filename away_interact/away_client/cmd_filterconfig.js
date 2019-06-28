module.exports = {
    message: (guildInformation, parsedContent, msg) => {
        if(parsedContent.command && parsedContent.command == 'filterconfig') {
            if(module.exports.ClientModules['util_permission.js'].hasPermissionFromMsg(msg, 'ADMINISTRATOR')) {
                if(parsedContent.args.length == 0) {
                    let filterStatuses = '';
                    Object.keys(guildInformation.data.filters).forEach(filterName => {
                        filterStatuses += (filterName.toUpperCase() + ': ') + (guildInformation.data.filters[filterName] ? 'Enabled' : 'Disabled') + '\n';
                    });
                    msg.reply(
                        new module.exports.Discord.RichEmbed()
                        .setColor(module.exports.Configuration.color)
                        .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                        .setThumbnail(module.exports.Configuration.thumbnail)
                        .addField('**Filter Statuses:**', filterStatuses)
                    );
                } else if(parsedContent.args.length == 2) {
                    if(guildInformation.data.filters[parsedContent.args[0].toLowerCase()] != null) {
                        if(parsedContent.args[1].toLowerCase() == 'enable') {
                            msg.reply(
                                new module.exports.Discord.RichEmbed()
                                .setColor(module.exports.Configuration.color)
                                .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                                .setThumbnail(module.exports.Configuration.thumbnail)
                                .addField('**Success!**', module.exports.Configuration.adminCommands.filterconfig.success)
                            );
                            guildInformation.data.filters[parsedContent.args[0].toLowerCase()] = true;
                            module.exports.Data.writeFile(guildInformation.id, guildInformation);
                        } else if(parsedContent.args[1].toLowerCase() == 'disable') {
                            msg.reply(
                                new module.exports.Discord.RichEmbed()
                                .setColor(module.exports.Configuration.color)
                                .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                                .setThumbnail(module.exports.Configuration.thumbnail)
                                .addField('**Success!**', module.exports.Configuration.adminCommands.filterconfig.success)
                            );
                            guildInformation.data.filters[parsedContent.args[0].toLowerCase()] = false;
                            module.exports.Data.writeFile(guildInformation.id, guildInformation);
                        } else {
                            msg.reply(
                                new module.exports.Discord.RichEmbed()
                                .setColor(module.exports.Configuration.color)
                                .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                                .setThumbnail(module.exports.Configuration.thumbnail)
                                .addField('**Argument Error:**', module.exports.Configuration.adminCommands.filterconfig.error)
                                .addField('**Correct Use:**', module.exports.Configuration.adminCommands.filterconfig.usage)
                            );
                        }
                    } else {
                        msg.reply(
                            new module.exports.Discord.RichEmbed()
                            .setColor(module.exports.Configuration.color)
                            .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                            .setThumbnail(module.exports.Configuration.thumbnail)
                            .addField('**Argument Error:**', module.exports.Configuration.adminCommands.filterconfig.error)
                            .addField('**Correct Use:**', module.exports.Configuration.adminCommands.filterconfig.usage)
                        );
                    }
                } else {
                    msg.reply(
                        new module.exports.Discord.RichEmbed()
                        .setColor(module.exports.Configuration.color)
                        .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                        .setThumbnail(module.exports.Configuration.thumbnail)
                        .addField('**Argument Error:**', module.exports.Configuration.adminCommands.filterconfig.error)
                        .addField('**Correct Use:**', module.exports.Configuration.adminCommands.filterconfig.usage)
                    );
                }
            }
        }
    }
}