/*!
 * @plugin bastion-ticket-plugin
 * @author Xynnix (NightRaven)
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
	if (reaction.emoji.name != "🎫") return;
			console.log("1")
        schema.find({
		guildID: reaction.message.guild.id
		}, function (err, docs) {
            if (err) return console.log(err)
            docs.forEach(async doc => {
			console.log("2")
                    const roles = await reaction.message.guild.roles.cache.filter(r => { r.permissions.has("MANAGE_CHANNELS") && r.permissions.has("ADMINISTRATOR") }).first()
                    const cat = await reaction.message.guild.channels.cache.get(doc.ticketCategory);
                    const chan = await reaction.message.guild.channels.cache.get(doc.ticketChannel);
                    const msg = doc.messageId
		    if(reaction.message.guild.channels.cache.find(n => n.name == `ticket-${user.id}`)) return user.send("You already have a ticket in that server!");
                    if (reaction.message.id == msg) {
			console.log("3")
                        reaction.message.guild.channels.create(`ticket-${user.id}`, {
                            permissionOverwrites: [
                                {
                                    id: reaction.message.guild.id,
                                    deny: ['VIEW_CHANNEL'],
                                },
                                {
                                    id: roles || reaction.client.user.id,
                                    allow: ['VIEW_CHANNEL', `READ_MESSAGE_HISTORY`, `ATTACH_FILES`, `SEND_MESSAGES`],
                                },
                                {
                                    id: user.id,
                                    allow: ['VIEW_CHANNEL', `READ_MESSAGE_HISTORY`, `ATTACH_FILES`, `SEND_MESSAGES`],
                                },
                            ], parent: (cat), position: 1, topic: `A Ticket : <@!${user.id}>`, reason: "Ticket Created"
                        }).then(ms =>{
			ms.send(`${user}, Please describe the reason you made this ticket and the server staff will be with you as soon as possible!`);
		})

                    }
                });
            });
        }
    }

module.exports = TicketListenerPlugin;
