module.exports = {
    message: (guildInformation, parsedContent, msg) => {
        if(parsedContent.command && parsedContent.command == 'help') {
            let userCommands = '';
            let adminCommands = '';
            Object.values(module.exports.Configuration.userCommands).forEach(root => {
                userCommands += '*' + root.usage + '* - ' + root.description + '\n\n'
            });
            Object.values(module.exports.Configuration.adminCommands).forEach(root => {
                adminCommands += '*' + root.usage + '* - ' + root.description + '\n\n'
            });
            msg.delete();
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
};