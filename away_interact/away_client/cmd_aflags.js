module.exports = {
    message: (guildInformation, parsedContent, msg) => {
        if(parsedContent.command && parsedContent.command == 'aflags') {
            if(module.exports.ClientModules['util_permission.js'].hasPermissionFromMsg(msg, 'ADMINISTRATOR')) {
                if(parsedContent.args.length == 1 && msg.mentions.users.size == 1) {
                    let user = msg.mentions.users.find(user => user != null);
                    msg.reply(
                        new module.exports.Discord.RichEmbed()
                        .setColor(module.exports.Configuration.color)
                        .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                        .setThumbnail(module.exports.Configuration.thumbnail)
                        .addField('**User ID:**', user.id)
                        .addField('**Total Flags:**', (guildInformation.users[user.id].flags || '0') + ' flags.')
                    );
                } else if(parsedContent.args.length == 2 && parsedContent.args[1].toLowerCase() == 'clear' && msg.mentions.users.size == 1) {
                    let user = msg.mentions.users.find(user => user != null);
                    if(guildInformation.users[user.id] != null) {
                        guildInformation.users[user.id].flags = 0;
                        module.exports.Data.writeFile(guildInformation.id, guildInformation);
                    } else {
                        let tempUser = module.exports.ClientModules['job_smartfilter.js'].defaultUser;
                        tempUser.flags = 0;
                        tempUser.bypassing = false;
                        guildInformation.users[user.id] = tempUser;
                        module.exports.Data.writeFile(guildInformation.id, guildInformation);
                    }
                    msg.reply(
                        new module.exports.Discord.RichEmbed()
                        .setColor(module.exports.Configuration.color)
                        .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                        .setThumbnail(module.exports.Configuration.thumbnail)
                        .addField('**Success!**', module.exports.Configuration.adminCommands.aflags.success)
                    );    
                } else {
                    msg.reply(
                        new module.exports.Discord.RichEmbed()
                        .setColor(module.exports.Configuration.color)
                        .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                        .setThumbnail(module.exports.Configuration.thumbnail)
                        .addField('**Argument Error:**', module.exports.Configuration.adminCommands.aflags.error)
                        .addField('**Correct Use:**', module.exports.Configuration.adminCommands.aflags.usage)
                    );
                }
            }       
        }
    }
};