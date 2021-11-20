const {
    Schema,
    model
} = require("mongoose");

module.exports = model('tickets', new Schema({
    guildID: {
        type: String,
        required: true
    },
    ticketChannel: {
        type: String,
        required: true
    },
    ticketCategory: {
        type: String,
        required: true
    },
    messageId: {
        type: String,
        required: true
    },
    tEmoji: {
        type: String,
        default: "🎫"
    }
}));
