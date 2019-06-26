const defaultGuild = {
    id: '',
    prefix: '^',
    data: {
        stringEvaluation: true,
        evaluationStrength: 3,
        evaluationsBeforeMute: 5,
        clearRecordInterval: 86400,
        blacklistedKeywords: [],
        whitelistedKeywords: []
    }
};
const fs = require('fs');
module.exports = {
    fileExists: (name, extension) => {
        try {
            return fs.existsSync(module.exports.Configuration.dataPath + name + '.' + extension);
        } catch(e) {
            return false;
            module.exports.Console.error('There was an issue reading a file by the name of ' + name + '.');
        }
    },
    writeFile: (name, extension, data) => {
        try {
            fs.writeFileSync(module.exports.Configuration.dataPath + name + '.' + extension, data);
        } catch(e) {
            module.exports.Console.error('There was an issue writing a file by the name of ' + name + '.');
        }
    },
    readFile: (name, extension) => {
        try {
            return fs.readFileSync(module.exports.Configuration.dataPath + name + '.' + extension);
        } catch(e) {
            return null;
            module.exports.Console.error('There was an issue reading a file by the name of ' + name + '.');
        }
    },
    createGuild: id => {
        // Warn For Potential Overwrites
        if(module.exports.fileExists(id, 'json')) {
            module.exports.Console.warn('A guild by the id of ' + id + ' has previous history and is overwriting their data.');
        }
        let tempGuild = defaultGuild;
        tempGuild.id = id;
        // Write Default Guild Data To File
        module.exports.writeFile(id, 'json', JSON.stringify(tempGuild));
        module.exports.Console.log('A guild by the id of ' + id + ' has presumably succesfully created their data.');
    },
    readGuild: id => {
        return JSON.parse(module.exports.readFile(id, 'json'))
    }
};