module.exports = {
    message: (guildInformation, parsedContent, msg) => {
        if(parsedContent.command && parsedContent.command == 'help') {
            if(parsedContent.args.length == 1) {
                if(module.exports.Configuration.userCommands[parsedContent.args[0].toLowerCase()] != null) {
                    msg.reply(
                        new module.exports.Discord.RichEmbed()
                        .setColor(module.exports.Configuration.color)
                        .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                        .setThumbnail(module.exports.Configuration.thumbnail)
                        .addField('**Command:**', parsedContent.args[0].toLowerCase())
                        .addField('**Description:**', module.exports.Configuration.userCommands[parsedContent.args[0].toLowerCase()].description)
                        .addField('**Correct Use:**', module.exports.Configuration.userCommands[parsedContent.args[0].toLowerCase()].usage)
                    );
                } else if(module.exports.Configuration.adminCommands[parsedContent.args[0].toLowerCase()] != null) {
                    msg.reply(
                        new module.exports.Discord.RichEmbed()
                        .setColor(module.exports.Configuration.color)
                        .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                        .setThumbnail(module.exports.Configuration.thumbnail)
                        .addField('**Command:**', parsedContent.args[0].toLowerCase())
                        .addField('**Description:**', module.exports.Configuration.adminCommands[parsedContent.args[0].toLowerCase()].description)
                        .addField('**Correct Use:**', module.exports.Configuration.adminCommands[parsedContent.args[0].toLowerCase()].usage)
                    );
                } else {
                    msg.reply(
                        new module.exports.Discord.RichEmbed()
                        .setColor(module.exports.Configuration.color)
                        .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                        .setThumbnail(module.exports.Configuration.thumbnail)
                        .addField('**Argument Error:**', module.exports.Configuration.userCommands.help.error)
                        .addField('**Correct Use:**', module.exports.Configuration.userCommands.help.usage)
                    );
                }
            } else {
                let userCommands = '';
                let adminCommands = '';
                Object.values(module.exports.Configuration.userCommands).forEach(root => {
                    userCommands += '*' + root.usage + '* - ' + root.description + '\n\n'
                });
                Object.values(module.exports.Configuration.adminCommands).forEach(root => {
                    adminCommands += '*' + root.usage + '* - ' + root.description + '\n\n'
                });
                msg.reply(
                    new module.exports.Discord.RichEmbed()
                    .setColor('#ffffff')
                    .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                    .setThumbnail(module.exports.Configuration.thumbnail)
                    .addField('**Away Announcements:**', module.exports.Configuration.announcement)
                    .addField('**Server Information:**', 'Server ID: ' + guildInformation.id + '\nPrefix: ' + guildInformation.prefix)
                    .addField('**Commands:**', userCommands)
                    .addField('**Admin Commands:**', adminCommands)
                );
            }
        }
    }
};
