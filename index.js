/**
 * @file Starting point of TrueBot
 * @author Aiden Garth
 * @license Apache-2.0
 */

const Discord = require("discord.js");
const assets = require("./assets.json");
const client = new Discord.Client({});
const prefix = "?"
const version = "0.1.0"
const env = require("./settings.json")

client.login(process.env.token)

client.on("ready", () => {
  client.user.setActivity(`${client.guilds.size} Servers`, {
    "type": "WATCHING",
    "url": "http://github.com/Aiden-Garth/TrueBot"
  });
});

client.on("message", (message) => {
  if (message.author.bot) return;
  if (message.channel === "dm") return;

  if (message.content.startsWith(`${prefix}botinfo`)) {
    const embed = new Discord.RichEmbed()
      .setAuthor(client.user.username)
      .setColor(assets.main)
      .setDescription("This is information about TrueBot")
      .setThumbnail(client.user.defaultAvatarURL)
      .addField("Version", version)
      .addField("Creator", "Aiden Garth")
      .addField("GitHub", "http://github.com/Aiden-Garth/TrueBot")
      .addBlankField()
      .addField("Commands", "Please do *?commands* to get help with the commands.")
      .addBlankField()
      .addField("Full Name", `${client.user.username}#${client.user.discriminator}`)
      .addField("Created On", client.user.createdAt);

    message.channel.send(embed)
  }

  if (message.content.startsWith(`${prefix}serverinfo`)) {
    const embed = new Discord.RichEmbed()
      .setAuthor(client.user.username)
      .setColor(assets.main)
      .setDescription(`This is information about ${message.guild.name}`)
      .setThumbnail(message.guild.iconURL)
      .addField("Owner", message.guild.owner)
      .addField("Member Count", message.guild.memberCount)
      .addField("Region", message.guild.region)
      .addField("Created At", message.guild.createdAt);

    message.channel.send(embed)
  }

  if (message.content.startsWith(`${prefix}invite`)) {
    client.generateInvite("ADMINISTRATOR")
      .then((result) => {
        message.channel.send(result)
      })
      .catch(() => {
        message.channel.send("Something went wrong.")
          .then((message) => message.react("☺"))
        
      })
  }
});
