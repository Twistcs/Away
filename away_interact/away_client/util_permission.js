module.exports = {
    message: () => {},
    hasPermission: (member, permission) => {
        let tempPermission = permission.toUpperCase();
        return member.hasPermission(tempPermission);
    },
    hasPermissionFromMsg: (msg, permission) => {
        let tempPermission = permission.toUpperCase();
        if(module.exports.hasPermission(msg.member, permission)) {
            return true;
        } else {
            msg.reply(
                new module.exports.Discord.RichEmbed()
                .setColor(module.exports.Configuration.color)
                .setAuthor(module.exports.Configuration.title, module.exports.Configuration.thumbnail, module.exports.Configuration.website)
                .setThumbnail(module.exports.Configuration.thumbnail)
                .addField('**Permission Error:**', 'You are __missing__ the ' + tempPermission + ' permission flag.')
            );
            return false;
        }
    }
};