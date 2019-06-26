module.exports = {
    message: (guildInformation, parsedContent, msg) => {
        if(msg.author.id == module.exports.ClientInstance.user.id) {
            msg.delete(12000);
        }
    }
};