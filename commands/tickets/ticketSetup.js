/*!
 * @plugin bastion-ticket-plugin
 * @author Xynnix (Night Raven)
 * @license MIT
 */

"use strict";

const tesseract = require("@bastion/tesseract");
const schema = require("../../models/tickets");

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
        const chn = message.mentions.channels.first();
        if (!chn) return message.channel.send("Please provide a `TEXT` channel.");
        await chn.send("React below with `🎫` to create a new ticket!").then(m => {
            const data = new schema({
                guildID: message.guild.id,
                ticketCategory: chn.parentID,
                messageId: m.id,
                ticketChannel: chn.id
            });
            data.save().catch(e => console.log("Error: saving ticket channels to ticket-db"+e))
        	m.react("🎫")
	})
    }
}

module.exports = ticketSetupCommandPlugin;
