const mongoose = require("mongoose");
const roomiesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    begin: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        default: new Date(),
    },
    debt: {
        type: Number,
        default: 0,
    },
});

const RoomieDB = mongoose.model("Roomie", roomiesSchema);
module.exports = RoomieDB;