const tensorLib = require('@tensorflow-models/toxicity');
module.exports = {
    models: {},
    loadNewModel: async(guildId, newThreshold) => {
        await tensorLib.load(newThreshold).then(model => {
            module.exports.models[guildId] = model;
        });
    },
    message: async(guildInformation, parsedContent, msg) => {
        let inViolation = false;
        if(module.exports.models[guildInformation.id] == null) {
            await tensorLib.load(guildInformation.data.evaluationThreshold).then(model => {
                module.exports.models[guildInformation.id] = model;
            });
        }
        let inViolationOf = [];
        await module.exports.models[guildInformation.id].classify(msg.content).then(results => {
            results.forEach(filter => {
                if(guildInformation.data.filters[filter.label]) {
                    if(filter.results[0].match) {
                        inViolation = true;
                        inViolationOf.push(filter.label);
                    }
                }
            });
        });
        if(guildInformation.users[msg.author.id] == null) {
            guildInformation.users[msg.author.id] = 0;
            module.exports.Data.writeFile(guildInformation.id, 'json', JSON.stringify(guildInformation));
        }
        if(inViolation) {
            guildInformation.users[msg.author.id] += 1;
            module.exports.Data.writeFile(guildInformation.id, 'json', JSON.stringify(guildInformation));
            if(guildInformation.users[msg.author.id] >= guildInformation.data.flagsBeforeMute) {

            }
            try {
                msg.guild.channels.find(channel => channel.name == 'flagged').send(
                    new module.exports.Discord.RichEmbed()
                    .setColor(module.exports.Configuration.color)
                    .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                    .setThumbnail(module.exports.Configuration.thumbnail)
                    .addField('**Message Author ID:**', msg.author.id)
                    .addField('**Message Author Tag:**', '@' + msg.author.tag)
                    .addField('**Message:**', msg.content)
                    .addField('**Flagged For:**', inViolationOf.join(', ').replace('_',' ').toUpperCase())
                    .addField('**Total Flags:**', 'The user in this instance has a total of ' + guildInformation.users[msg.author.id] + ' flags.')
                    .addField('**Enacted Punishment:**', 'N/A')
                    .setTimestamp()
                );
                msg.author.send(
                    new module.exports.Discord.RichEmbed()
                    .setColor(module.exports.Configuration.color)
                    .setAuthor(module.exports.Configuration.title + ' | You have been flagged.', module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                    .setThumbnail(module.exports.Configuration.thumbnail)
                    .addField('**Message Author ID:**', msg.author.id)
                    .addField('**Message Author Tag:**', '@' + msg.author.tag)
                    .addField('**Message:**', msg.content)
                    .addField('**Flagged For:**', inViolationOf.join(', ').replace('_',' ').toUpperCase())
                    .addField('**Total Flags:**', 'You have a total of ' + guildInformation.users[msg.author.id] + ' flags.')
                    .addField('**Enacted Punishment:**', 'N/A')
                    .setTimestamp()
                );
            } catch(e) {
                // There was an issue DM'ing the user or finding the flagged channel. Punishments should work like normal.
            }
        }
    }
};