module.exports = {
    message: (guildInformation, parsedContent, msg) => {
        if(parsedContent.command && parsedContent.command == 'flags') {
            try {
                msg.author.send(
                    new module.exports.Discord.RichEmbed()
                    .setColor(module.exports.Configuration.color)
                    .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                    .setThumbnail(module.exports.Configuration.thumbnail)
                    .addField('**Server:**', msg.guild.name)
                    .addField('**Total Flags:**', (guildInformation.users[msg.author.id] || '0') + ' flags.')
                );
            } catch(e) {
                // DMs not working or something /shrug
            }
        }
    }
};