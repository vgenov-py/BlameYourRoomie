const mongoose = require("mongoose");
// mongoose
//     .connect("mongodb://localhost:27017/blameyourroomie", {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
//     .then(() => console.log("Mongo is connected"));
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
    debts: {
        type: Array,
        default: [],
    },
    apartmentID: {
        type: String,
    },
});

const RoomieDB = mongoose.model("Roomie", roomiesSchema);
module.exports = RoomieDB;

// const changeStatus = async(name) => {
//     const roomie = await RoomieDB.findOne({ name: name });
//     const debtsModified = roomie.debts;
//     debtsModified.forEach((debt) => {
//         debt.isPayed = true;
//     });
//     await RoomieDB.updateOne({ name: name }, { $set: { debts: debtsModified } });
//     await RoomieDB.updateOne({ name: name }, { $set: { debt: 0 } });
// };

// changeStatus("Norma");

// async function kuga() {
//     await RoomieDB.updateOne({ name: "vito" }, { name: "Vito" });
// }
// kuga();

// async function show() {
//     const roomie = await RoomieDB.find({ name: "Macarena" });
//     console.log(roomie.debts);
// }
// show();