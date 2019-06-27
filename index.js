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
        tempRequire.ClientInstance = ClientInstance;
        tempRequire.ClientModules = ClientModules;
        tempRequire.Data = Data;
        // Add To Module Chain
        ClientModules[file] = tempRequire;
    });
});

// Away Events
ClientInstance.on('guildCreate', guild => {
    // Create Data Structure For New Guild
    Console.log('Added to guild known by the id ' + guild.id + '.');
    Data.createGuild(guild.id);
    ClientModules['job_awayLogs.js'].create(guild);
});

// Client Instance Events
ClientInstance.on('message', msg => {
    // Prevent Bot Messages From Going Through & Delete Job
    if(msg.author.bot) {
        if(msg.author.id == ClientInstance.user.id && msg.channel.parent && msg.channel.parent.name != Configuration.logsCategory) {
            msg.delete(12000);
        }
        return;
    }
    // Overwrite All If Reset
    if(msg.content == '^reset') {
        ClientModules['cmd_reset.js'].message(null, {command:'reset', args: []}, msg);
        return;
    }
    // Fire Message Event For All Client Modules
    let guildInformation;
    try {
        guildInformation = Data.readGuild(msg.guild.id);
    } catch(e) {
        // Likely corrupted data, notify about reset
        msg.reply(
            new Discord.RichEmbed()
            .setColor(Configuration.color)
            .setAuthor(Configuration.title, Configuration.thumbnail, Configuration.website)
            .setThumbnail(Configuration.thumbnail)
            .addField('**Critical Error:**', 'Your server data may have been corrupted. Please ask an Administrator to run ^reset')
        );
        return;
    }
    // Decipher if the message content is a command - if it is retrieve it's lowercase string.
    let command = msg.content != guildInformation.prefix && msg.content.substring(0, guildInformation.prefix.length) == guildInformation.prefix ? (msg.content.split(' ').length == 1 ? msg.content.substring(guildInformation.prefix.length) : msg.content.split(' ')[0].substring(guildInformation.prefix.length)).toLowerCase() : false;
    // Decipher message arguments
    let args = [];
    if(command) {
        msg.delete();
        let tempArgs = msg.content.split(' ');
        tempArgs.shift();
        if(tempArgs[0] == command) {
            tempArgs.shift();
        }
        args = tempArgs;
    }
    Object.keys(ClientModules).forEach(moduleName => {
        try {
            ClientModules[moduleName].message(guildInformation, {command, args}, msg);
        } catch(e) {
            Console.warn('An issue occurred in the message event within ' + moduleName + '.');
            Console.error('-> ' + e);
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

