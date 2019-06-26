// Discord JS Library
const Discord = require('discord.js');
const ClientInstance = new Discord.Client();

// Away Interact Configuration
const Configuration = require('./away_interact/configuration.json');

// Away Modules
const Console = require('./away_modules/console.js');
const Data = require('./away_modules/data.js');
Data.Configuration = Configuration;
Data.Console = Console;

// Away Interact Client
const ClientModules = {};

// Client Instance Ready
ClientInstance.on('ready', () => {
    Console.log('The client instance is now running.');
    // Set Bot Activity
    Console.log('Setting bot activity with server count.');
    ClientInstance.user.setActivity(ClientInstance.guilds.size + ' server(s)', {type:'WATCHING'});
    // Require Client Modules & Supply { Console, Configuration, ClientModules }
    require('fs').readdirSync('./away_interact/away_client/').forEach(file => {
        let tempRequire = require('./away_interact/away_client/' + file);
        tempRequire.Discord = Discord;
        tempRequire.Console = Console;
        tempRequire.Configuration = Configuration;
        tempRequire.ClientModules = ClientModules;
        tempRequire.ClientInstance = ClientInstance;
        // Add To Module Chain
        ClientModules[file] = tempRequire;
    });
});

// Away Events
ClientInstance.on('guildCreate', guild => {
    // Create Data Structure For New Guild
    Console.log('Added to guild known by the id ' + guild.id + '.');
    Data.createGuild(guild.id);
});

// Client Instance Events
ClientInstance.on('message', msg => {
    // Fire Message Event For All Client Modules
    let guildInformation = Data.readGuild(msg.guild.id);
    // Decipher if the message content is a command - if it is retrieve it's lowercase string.
    let command = msg.content != guildInformation.prefix && msg.content.substring(0, 1) == guildInformation.prefix ? (msg.content.split(' ').length == 1 ? msg.content.substring(1) : msg.content.split(' ')[0].substring(1)).toLowerCase() : false;
    // Decipher message arguments
    let args = command ? (msg.content.split(command)[1].substring(0, 1) == ' ' ? msg.content.split(command)[1].substring(1).split(' ') : msg.content.split(command)[1].split(' ')) : {};
    Object.keys(ClientModules).forEach(moduleName => {
        try {
            ClientModules[moduleName].message(guildInformation, {command, args}, msg);
        } catch(e) {
            Console.warn('Couldn\'t find message event in ' + moduleName + '.');
        }
    });
});

// Update Server Count Every Minute
setInterval(_ => {
    // Update Bot Activity
    Console.log('Updating bot activity status with server count.');
    ClientInstance.user.setActivity(ClientInstance.guilds.size + ' server(s)', {type:'WATCHING'});
}, 1000 * 60);

ClientInstance.login(Configuration.token);

