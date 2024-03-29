const tensorLib = require('@tensorflow-models/toxicity');
module.exports = {
    defaultUser: {
        flags: 0,
        bypassing: false
    },
    models: {},
    loadNewModel: async(guildId, newThreshold) => {
        await tensorLib.load(newThreshold / 100).then(model => {
            module.exports.models[guildId] = model;
        });
    },
    message: async(guildInformation, parsedContent, msg) => {
        if(parsedContent.command == 'blacklist' || parsedContent.command == 'whitelist' || msg.member.roles.find(role => role.name == 'Muted') != null || (guildInformation.users[msg.author.id] && guildInformation.users[msg.author.id].bypassing)) { return; }
        let inViolation = false;
        if(module.exports.models[guildInformation.id] == null) {
            await tensorLib.load(guildInformation.data.filterThreshold / 100).then(model => {
                module.exports.models[guildInformation.id] = model;
            });
        }
        let inViolationOf = [];
        let tempContent = msg.content.toLowerCase();
        guildInformation.data.whitelistedKeywords.forEach(keyword => {
            tempContent = tempContent.replace(keyword.toLowerCase(), '');
        });
        await module.exports.models[guildInformation.id].classify(tempContent).then(results => {
            results.forEach(filter => {
                if(guildInformation.data.filters[filter.label]) {
                    if(filter.results[0].match) {
                        inViolation = true;
                        inViolationOf.push(filter.label);
                    }
                }
            });
        });
        guildInformation.data.blacklistedKeywords.forEach(keyword => {
            if(msg.content.includes(keyword)) {
                inViolation = true;
                inViolationOf.push('BLACKLIST');
            }
        });
        if(guildInformation.users[msg.author.id] == null) {
            guildInformation.users[msg.author.id] = module.exports.defaultUser;
            module.exports.Data.writeFile(guildInformation.id, guildInformation);
        }
        if(inViolation) {
            msg.delete();
            msg.reply(
                new module.exports.Discord.RichEmbed()
                .setColor(module.exports.Configuration.color)
                .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                .setThumbnail(module.exports.Configuration.thumbnail)
                .addField('**Attention:**', module.exports.Configuration.reasons.deletionMessage)
                .addField('**Flagged For:**', inViolationOf.join(', ').replace('_',' ').toUpperCase())
                .setTimestamp()
            );
            guildInformation.users[msg.author.id].flags += 1;
            module.exports.Data.writeFile(guildInformation.id, guildInformation);
            let enactedPunishments = [];
            if(guildInformation.users[msg.author.id].flags >= guildInformation.data.flagsBeforeBan) {
                enactedPunishments.push('BAN');
            } else if(guildInformation.users[msg.author.id].flags >= guildInformation.data.flagsBeforeTempban) {
                enactedPunishments.push('TEMPBAN');
            } else if(guildInformation.users[msg.author.id].flags >= guildInformation.data.flagsBeforeKick) {
                enactedPunishments.push('KICK');
            } else if(guildInformation.users[msg.author.id].flags >= guildInformation.data.flagsBeforeMute) {
                enactedPunishments.push('MUTE');
            }
            try {
                await msg.guild.channels.find(channel => channel.name == 'flagged').send(
                    new module.exports.Discord.RichEmbed()
                    .setColor(module.exports.Configuration.color)
                    .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                    .setThumbnail(module.exports.Configuration.thumbnail)
                    .addField('**Message Author ID:**', msg.author.id)
                    .addField('**Message Author Tag:**', '@' + msg.author.tag)
                    .addField('**Message:**', msg.content)
                    .addField('**Flagged For:**', inViolationOf.join(', ').replace('_',' ').toUpperCase())
                    .addField('**Total Flags:**', 'The user in this instance has a total of ' + guildInformation.users[msg.author.id].flags + ' flag(s).')
                    .addField('**Enacted Punishment:**', enactedPunishments.length > 0 ? enactedPunishments.join(', ').toUpperCase() : 'N/A')
                    .setTimestamp()
                );
                await msg.author.send(
                    new module.exports.Discord.RichEmbed()
                    .setColor(module.exports.Configuration.color)
                    .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                    .setThumbnail(module.exports.Configuration.thumbnail)
                    .addField('**Server:**', msg.guild.name)
                    .addField('**Attention:**', module.exports.Configuration.reasons.deletionMessage)
                    .addField('**Message:**', msg.content)
                    .addField('**Flagged For:**', inViolationOf.join(', ').replace('_',' ').toUpperCase())
                    .addField('**Total Flags:**', 'You have a total of ' + guildInformation.users[msg.author.id].flags + ' flag(s).')
                    .addField('**Enacted Punishment:**', enactedPunishments.length > 0 ? enactedPunishments.join(', ').toUpperCase() : 'N/A')
                    .setTimestamp()
                );
            } catch(e) {
                // There was an issue DM'ing the user or finding the flagged channel. Punishments should work like normal.
            }
            if(enactedPunishments.includes('BAN')) {
                msg.member.ban({
                    days: 36500,
                    reason: module.exports.Configuration.reasons.banReason
                });
            } else if(enactedPunishments.includes('TEMPBAN')) {
                msg.member.ban({
                    days: guildInformation.data.tempbanLength / (24*60*60),
                    reason: module.exports.Configuration.reasons.tempbanReason
                });
            } else if(enactedPunishments.includes('KICK')) {
                msg.member.kick(module.exports.Configuration.reasons.kickReason)
            } else if(enactedPunishments.includes('MUTE')) {
                module.exports.ClientModules['job_mute.js'].muteUser(msg.guild, msg.member, guildInformation.data.muteLength);
            }
        }
    }
};