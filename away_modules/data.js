const defaultGuild = {
    id: '',
    prefix: '^',
    data: {
        smartFilter: true,
        filterThreshold: 50,
        flagsBeforeMute: 5,
        flagsBeforeKick: 10,
        flagsBeforeTempban: 15,
        flagsBeforeBan: 20,
        muteLength: 600,
        tempbanLength: 86400,
        clearRecordInterval: 86400,
        blacklistedKeywords: [],
        filters: {
            identity_attack: true,
            insult: true,
            obscene: true,
            severe_toxicity: true,
            sexual_explicit: true,
            threat: true,
            toxicity: true
        }
    },
    users: {}
};

const admin = require('firebase-admin');
const serviceAccount = require('./ServiceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

module.exports = {
    fileExists: async name => {
        return await db.doc('guilds/' + name).get(snapshot => { return snapshot.exists })
    },
    writeFile: async (name, data) => {
        return await db.doc('guilds/' + name).set(data);
    },
    readFile: async name  => {
        return await db.doc('guilds/' + name).get(snapshot => { return snapshot; });
    },
    createGuild: async id  => {
        let tempGuild = defaultGuild;
        tempGuild.id = id;
        module.exports.writeFile(id, tempGuild);
        module.exports.Console.log('A guild by the id of ' + id + ' has succesfully created their data.');
    }
};