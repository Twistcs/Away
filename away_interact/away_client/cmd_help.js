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
<<<<<<< HEAD:away_interact/away_client/cmd_help.js
                .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                .setThumbnail(module.exports.Configuration.thumbnail)
                .addField('**Away Announcements:**', module.exports.Configuration.announcement)
=======
                .setAuthor('Away Moderation', 'https://i.imgur.com/iQiy4KE.png', 'https://awaybot.me')
                .setThumbnail('https://i.imgur.com/iQiy4KE.png')
                .addField('**Away Purpose:**', 'Away is an open source state of the art Discord Moderation bot developed for Discord Hack Week.')
>>>>>>> 5cf7682f8c1c3082b55eb72c73dcd96f54673e7e:away_interact/away_client/help.js
                .addField('**Server Information:**', 'Server ID: ' + guildInformation.id + '\nPrefix: ' + guildInformation.prefix)
                .addField('**Commands:**', userCommands)
                .addField('**Admin Commands:**', adminCommands)
            );
        }
    }
};
