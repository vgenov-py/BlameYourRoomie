const mongoose = require("mongoose");
// mongoose
//     .connect("mongodb://localhost:27017/blameyourroomie", {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
//     .then(console.log("Mongo is connected!"));
const apartmentsSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
    },
    rooms: {
        type: Number,
        default: 1,
    },
    userId: {
        type: String,
        required: true,
    },
});

const ApartmentDB = mongoose.model("Apartment", apartmentsSchema);
module.exports = ApartmentDB;

async function show() {
    const apartments = await ApartmentDB.find({});
    console.log(apartments);
}