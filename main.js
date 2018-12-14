const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const prefix = config.prefix;

const guild = client.guilds.name === "Bellingham Gaming Group"

const kindimages = [
    "https://pixnio.com/free-images/2017/03/23/2017-03-23-17-46-16-725x483.jpg",
    "https://cdn.pixabay.com/photo/2017/02/08/03/48/cute-dog-2047699_960_720.jpg",
    "https://c.pxhere.com/photos/9a/ff/young_dog_puppy_dog_funny_dogs_yellow_dog_dog_nose_yellow_dogs_doggy-1387994.jpg!d",
    "https://c1.staticflickr.com/3/2170/1698598876_2eb077b419_b.jpg",
    "https://www.maxpixel.net/static/photo/1x/Animal-Domestic-Animal-Animals-Cute-Cat-Kitten-3019090.jpg",
    "https://www.maxpixel.net/static/photo/1x/Portrait-Cute-Cat-Lazy-Sleep-Animal-Domestic-Pet-2709966.jpg"
];

const pickuplines = [
    "Hey gurl are you my appenix? Because I don't know what you do, but this feeling in my gut makes me want to take you out.",
    "want sum fuk?",
    "What's the similarity between this line and an obese polar bear? They both do an all right job at breaking the ice.",
    "Are you from Tennissee? Because you are the only ten I see.",
    "Did it hurt when you fell from heaven?",
    "On a scale from 1 to America, how free are you tonight?",
    "Please keep your distance. I might fall for you.",
    "Let’s be nothing. ‘Cause nothing lasts forever.",
    "If you were words on a page, you’d be what they call 'fine print.'",
    "Are you a parking ticket? ‘Cause you’ve got fine written all over you.",
    "I’m not a photographer, but I can picture you and me together.",
    "If you were a fruit, you'd be a fine-apple"
];

client.on("ready", () => {
    console.log("I am combat ready!");
});

client.on("guildCreate", guild => {
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildDelete", guild=> {
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    client.user.setActivity(`Serving on ${client.guilds.size} servers`);
});
   
client.on("message", (message) => {

if(!message.content.startsWith(prefix) || message.author.bot || message.content.indexOf(prefix)!== 0) return;


if((message.member.highestRole.name === "Admins") || (message.member.highestRole.name === "Moderators") ){

    if(message.content.startsWith(prefix+"logout")){
        message.delete();
        client.destroy();
    }

    if(message.content.startsWith(prefix+"h event")){
        message.author.send(`Usage: !event @creator;google calendar link;the first line;the `+ 
            `description;who is welcome;the date;the location;where to RSVP\n\nCreates a rich `+ 
            `embed to display an event nicely`);
    }

    if(message.content.startsWith(prefix+"h remind")){
        message.author.send(`Usage: !remind @username\n\nSends a PM to the user specified, `+
        `reminding them to be kind.`);
    }

    if(message.content.startsWith(prefix+"remind")){
        let img = kindimages[Math.floor(Math.random()*kindimages.length)];
        message.mentions.members.first().send({embed:{
            color: 15337741,
            author: {
                name: client.user.username,
                icon_url: client.user.avatarURL
            },
            description: "This is a nice reminder to be *kind* ",
            "image": {
                "url": `${img}`
            },
            timestamp: new Date(),
            footer:{
                icon_url: client.user.avatarURL,
                text: "If anything seems off, PANIC and contact a moderator!"
            }
        }});
        message.delete();

    }

    

    if (message.content.startsWith(prefix+"event")){
        const args = message.content.slice(prefix.length).trim().split(";");
        let host = message.mentions.members.first();
        let [calendar,firstline, description, opento, cost, date, location, rsvp] = args;
        message.channel.send(`@everyone`);
        message.channel.send({embed:{
            color: 4427053,
            author: {
                name: client.user.name,
                icon_url: client.user.avatarURL
            },
            title: `THERE IS A NEW EVENT`,
            url: calendar,
            description: `${host} ${firstline}`,
            fields: [
                {
                    name: "DESCRIPTION",
                    value:`${description}`
                },
                {
                    name:"WHO IS WELCOME?",
                    value:`${opento}`
                },
                {
                    name:"WHAT DOES IT COST?",
                    value:`${cost}`
                },
                {
                    name:"WHEN IS IT?",
                    value:`${date}`
                },
                {
                    name:"WHERE IS IT?",
                    value:`${location}`
                },
                {
                    name:"WHERE DO I RSVP?",
                    value:`${rsvp}`
                }
            ],
            timestamp: new Date(),
            footer:{
                icon_url: client.user.avatarURL,
                text: "If anything seems off, PANIC and contact a moderator!"
            }
        }});
        message.delete();


    }
    
}

if(message.content.startsWith(prefix+"help")&&message.member.roles.some(r=>["Moderators","Admins"].includes(r.name))){
    message.author.send(`Usage: !h events, !h remind, !h complain`);
}
else if(message.content.startsWith(prefix+"help")){
    message.author.send(`Usage: !h complain`);
}

if(message.content.startsWith(prefix+"h complain")){
    message.author.send(`Usage: @user reason\n\nSend an official complaint for the `+
    `moderation team.\nNo user required for general complaints.`)
}

if(message.content.startsWith(prefix+"pickup")){
    let line = pickuplines[Math.floor(Math.random()*pickuplines.length)];
    message.channel.send(`${line}`);
}

if(message.content.startsWith(prefix+"complain")){
    //@user reason
    let plaintiff = message.author;
    let defence = message.mentions.members.first();
    reason = message.content.slice(prefix.length).trim().split(/ +/g).slice(1).join(" ");
    let channel = message.guild.channels.find(channel => channel.name === "complaint-forms");
    channel.send({embed:{
        color: 4427053,
            author: {
                name: `HURT FEELINGS REPORT`,
                icon_url: "https://cdn.discordapp.com/attachments/505575444293091350/519745809135435787/28130731-352-k102174.png"
            },
            title: `OFFICIAL COMPLAINT FORM`,
            fields: 
            [
                {
                    name: "PLAINTIFF",
                    value:`${plaintiff}`
                },
                {
                    name: "DEFENCE",
                    value: `${defence}`
                },
                {
                    name: "REASON",
                    value: `${reason}`
                }
            ],
            timestamp: new Date(),
            footer:{
                icon_url: client.user.avatarURL,
                text: "If anything seems off, PANIC and contact a moderator!"
            }
    }});
    message.delete();

}


});
   
  

  client.login(config.token);


  