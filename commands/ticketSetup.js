/*!
 * @plugin bastion-example-plugin
 * @author Sankarsan Kampa (k3rn31p4nic)
 * @license MIT
 */

"use strict";

const tesseract = require("@bastion/tesseract");

class ticketSetupCommandPlugin extends tesseract.Command {
    constructor() {
        super("ticketSetup", {
            description: "This creates the settings for the ticket plugin!",
            triggers: ["tsetup", "ticketset"],
            arguments: {},
            scope: "guild",
            owner: false,
            typing: false,
            schedulable: false,
            unsafe: false,
            nsfw: false,
            cooldown: 0,
            ratelimit: 1,
            clientPermissions: ["MANAGE_CHANNELS", "MANAGE_MESSAGES", "SEND_MESSAGES", "EMBED_LINKS"],
            userPermissions: ["MANAGE_GUILD"],
            syntax: ["tsetup <ticketChannelId> <ticketCategoryId>"],
            condition: () => true,
        });
    }

    exec = async (message, argv) => {

        if (1 > message.mentions.size || 2 < message.mentions.size) return message.channel.send(`Correct usage: ${this.syntax}`)
        const chn = message.mentions.channels.filter(x => x.parentId == null && (x.type ==
            "GUILD_TEXT" || x.type == "text"))
        const cat = message.mentions.channels.filter(x => x.parentId == null && (x.type ==
            "GUILD_CATEGORY" || x.type == "category"))
        if (!chn || chn.type !== "text" && chn.type !== "GUILD_TEXT") return message.channel.send("Please provide a `TEXT` channel.");
        if (!cat || cat.type !== "category" && chn.type !== "GUILD_CATEGORY") return message.channel.send("Please provide a `TEXT` channel.");
        await chn.send("React below with `🎫` to create a new ticket!").then(m => {
            const data = new schema({
                guildID: (message.guild.id),
                ticketCategory: (cat.id),
                messageId: m.id,
                ticketChannel: chn.id
            });
            data.save().catch(e => console.log("Error: saving remind channels to ticket-db"))
        })
    }
}

module.exports = ticketSetupCommandPlugin;
