module.exports = {
    message: (guildInformation, parsedContent, msg) => {
        if(parsedContent.command && parsedContent.command == 'bypass') {
            if(module.exports.ClientModules['util_permission.js'].hasPermissionFromMsg(msg, 'ADMINISTRATOR')) {
                if(parsedContent.args.length == 0) {
                    msg.reply(
                        new module.exports.Discord.RichEmbed()
                        .setColor(module.exports.Configuration.color)
                        .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                        .setThumbnail(module.exports.Configuration.thumbnail)
                        .addField('**Success!**', module.exports.Configuration.adminCommands.bypass.success)
                    );
                    if(guildInformation.users[msg.author.id] != null) {
                        guildInformation.users[msg.author.id].bypassing = !guildInformation.users[msg.author.id].bypassing;
                        module.exports.Data.writeFile(guildInformation.id, guildInformation);
                    } else {
                        let tempUser = module.exports.ClientModules['job_smartfilter.js'].defaultUser;
                        tempUser.flags = 0;
                        tempUser.bypassing = true;
                        guildInformation.users[msg.author.id] = tempUser;
                        module.exports.Data.writeFile(guildInformation.id, guildInformation);
                    }
                } else if(parsedContent.args.length == 1 && msg.mentions.users.size == 1) {
                    let user = msg.mentions.users.find(user => user != null);
                    msg.reply(
                        new module.exports.Discord.RichEmbed()
                        .setColor(module.exports.Configuration.color)
                        .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                        .setThumbnail(module.exports.Configuration.thumbnail)
                        .addField('**Success!**', module.exports.Configuration.adminCommands.bypass.success)
                    );
                    if(guildInformation.users[user.id] != null) {
                        guildInformation.users[user.id].bypassing = !guildInformation.users[user.id].bypassing;
                        module.exports.Data.writeFile(guildInformation.id, guildInformation);
                    } else {
                        let tempUser = module.exports.ClientModules['job_smartfilter.js'].defaultUser;
                        tempUser.flags = 0;
                        tempUser.bypassing = true;
                        guildInformation.users[user.id] = tempUser;
                        module.exports.Data.writeFile(guildInformation.id, guildInformation);
                    }
                } else {
                    msg.reply(
                        new module.exports.Discord.RichEmbed()
                        .setColor(module.exports.Configuration.color)
                        .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                        .setThumbnail(module.exports.Configuration.thumbnail)
                        .addField('**Argument Error:**', module.exports.Configuration.adminCommands.bypass.error)
                        .addField('**Correct Use:**', module.exports.Configuration.adminCommands.bypass.usage)
                    );
                }
            }
        }
    }
};