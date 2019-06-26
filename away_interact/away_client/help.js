module.exports = {
    message: (guildInformation, parsedContent, msg) => {
        if(parsedContent.command && parsedContent.command == 'help') {
            let userCommands = '';
            let adminCommands = '';
            module.exports.Configuration.userCommands.forEach(root => {
                userCommands += '*' + root.command + '* - ' + root.description + '\n'
            });
            module.exports.Configuration.adminCommands.forEach(root => {
                adminCommands += '*' + root.command + '* - ' + root.description + '\n'
            });
            msg.delete();
            msg.reply(
                new module.exports.Discord.RichEmbed()
                .setColor('#ffffff')
                .setAuthor('Away Moderation', 'https://i.imgur.com/iQiy4KE.png', 'https://awaybot.me')
                .setThumbnail('https://i.imgur.com/iQiy4KE.png')
                .addField('**Away Purpose:**', 'Away is an open source state of the art Discord Moderation bot developed for Discord\'s Hack Week.')
                .addField('**Server Information:**', 'Server ID: ' + guildInformation.id + '\nPrefix: ' + guildInformation.prefix)
                .addField('**Commands:**', userCommands)
                .addField('**Admin Commands:**', adminCommands)
            );
        }
    }
};