const eval = require('../eval.json');
module.exports = {
    message: (guildInformation, parsedContent, msg) => {
        let inViolation = false;
        let flaggedWords = [];
        Object.keys(eval).forEach(key => {
            if(msg.content.includes(key) && eval[key] < 0 && Math.abs(eval[key]) >= guildInformation.data.evaluationStrength) {
                inViolation = true;
                flaggedWords.push(key);
            }
        });
        if(guildInformation.users[msg.author.id] == null) {
            guildInformation.users[msg.author.id] = 0;
            module.exports.Data.writeFile(guildInformation.id, 'json', JSON.stringify(guildInformation));
        }
        if(inViolation) {
            guildInformation.users[msg.author.id] += 1;
            module.exports.Data.writeFile(guildInformation.id, 'json', JSON.stringify(guildInformation));
            msg.guild.channels.find(channel => channel.name == 'flagged-evaluation' && channel.parent.name == module.exports.Configuration.logsCategory).send(
                new module.exports.Discord.RichEmbed()
                .setColor(module.exports.Configuration.color)
                .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                .setThumbnail(module.exports.Configuration.thumbnail)
                .addField('**Message Author ID:**', msg.author.id)
                .addField('**Message Author Tag:**', '@' + msg.author.tag)
                .addField('**Message In Question:**', msg.content)
                .addField('**Violation Details:**', 'Message is in violation of the filter surpassing a minimum score of ' + guildInformation.data.evaluationStrength + '.')
                .addField('**Current Flags:**', 'The user in this instance has a total of ' + guildInformation.users[msg.author.id] + ' flags.')
                .addField('**Enacted Punishment:**', 'N/A')
                .setTimestamp()
            );
        } else {
            msg.guild.channels.find(channel => channel.name == 'evaluation' && channel.parent.name == module.exports.Configuration.logsCategory).send(
                new module.exports.Discord.RichEmbed()
                .setColor(module.exports.Configuration.color)
                .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                .setThumbnail(module.exports.Configuration.thumbnail)
                .addField('**Message Author ID:**', msg.author.id)
                .addField('**Message Author Tag:**', '@' + msg.author.tag)
                .addField('**Message In Question:**', msg.content)
                .addField('**Violation Details:**', 'Message is not in violation of the filter falling under the minimum score of ' + guildInformation.data.evaluationStrength + '.')
                .addField('**Current Flags:**', 'The user in this instance has a total of ' + guildInformation.users[msg.author.id] + ' flags.')
                .addField('**Enacted Punishment:**', 'N/A')
                .setTimestamp()
            );
        }
    }
};