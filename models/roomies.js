const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/blameyourroomie", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });
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
    apartmentID: {
        tpye: String,
    },
});

const RoomieDB = mongoose.model("Roomie", roomiesSchema);
module.exports = RoomieDB;

// async function kuga() {
//     await RoomieDB.findOneAndUpdate({ name: "Bianca" }, { apartmentID: "6005581db429961913b7d45f" });
// }
// kuga();

// async function show() {
//     const kuga = await RoomieDB.find({ name: "Bianca" });
//     console.log(kuga);
// }
// show();