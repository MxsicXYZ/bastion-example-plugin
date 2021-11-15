/*!
 * @plugin bastion-example-plugin
 * @author Sankarsan Kampa (k3rn31p4nic)
 * @license MIT
 */

"use strict";
const schema = require("../models/tickets")
const tesseract = require("@bastion/tesseract");

class TicketListenerPlugin extends tesseract.Listener {
    constructor() {
        // This will listen to the `message` event - https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-message
        // Refer https://bastion.gitbook.io/docs/plugins#supported-events for all supported events.
        super("messageReactionAdd");
    }

    exec = async (reaction, user) => {
        if (reaction.name !== "🎫") return;
        schema.find({}, function (err, docs) {
            if (err) return console.log(err)
            docs.forEach(async doc => {
                if (doc.guildId == reaction.message.guild.id) {
                    const roles = await mreaction.guild.roles.cache.filter(r => { r.permissions.has("MANAGE_CHANNELS") && r.permissions.has("ADMINISTRATOR") }).first()
                    const cat = await reaction.message.guild.channels.cache.get(doc.ticketCategory);
                    const chan = await reaction.message.guild.channels.cache.get(doc.ticketChannel);
                    const msg = await chan.messages.fetch(docs.messageId);
                    if (reaction.message.id == msg.id) {
                        button.guild.channels.create(`ticket-${count}`, {
                            permissionOverwrites: [
                                {
                                    id: reaction.message.guild.id,
                                    deny: ['VIEW_CHANNEL'],
                                },
                                {
                                    id: roles.id || message,
                                    allow: ['VIEW_CHANNEL', `READ_MESSAGE_HISTORY`, `ATTACH_FILES`, `SEND_MESSAGES`],
                                },
                                {
                                    id: user.id,
                                    allow: ['VIEW_CHANNEL', `READ_MESSAGE_HISTORY`, `ATTACH_FILES`, `SEND_MESSAGES`],
                                },
                            ], parent: (cat), position: 1, topic: `A Ticket : <@!${reaction.message.user.id}>`, reason: "Ticket Created"
                        })

                    }
                };
            });
        });
    }
}

module.exports = TicketListenerPlugin;
