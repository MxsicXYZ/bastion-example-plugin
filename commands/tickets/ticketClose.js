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
        super("ticketClose", {
            description: "This closes the current ticket channel",
            triggers: ["tclose", "closeTicket"],
            arguments: {},
            scope: "guild",
            owner: false,
            typing: false,
            schedulable: false,
            unsafe: false,
            nsfw: false,
            cooldown: 3,
            ratelimit: 1,
            clientPermissions: ["MANAGE_CHANNELS", "MANAGE_MESSAGES", "SEND_MESSAGES", "EMBED_LINKS"],
            userPermissions: ["MANAGE_MESSAGES"],
            syntax: ["tsetup"],
            condition: () => true,
        });
    }

    exec = async (message, argv) => {
      if (!message.channel.name.startsWith("ticket-")) return;
      message.channel.send("Closing this ticket in 15 seconds!")
      setTimeout(()=>{
        message.channel.delete()
      }, 15000)
    }
}

module.exports = ticketCloseCommandPlugin;
