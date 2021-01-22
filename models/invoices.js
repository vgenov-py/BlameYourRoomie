const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/blameyourroomie", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });
const invoicesSchema = new mongoose.Schema({
    total: {
        type: Number,
        min: 0,
        required: true,
    },
    service: {
        type: String,
        enun: ["luz", "gas", "agua", "otro"],
        lowercase: true,
        required: true,
    },
    begin: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    isPayed: {
        type: Boolean,
        default: false,
    },
    apartmentID: {
        type: String,
        required: true,
    },
});

const InvoiceDB = mongoose.model("Invoice", invoicesSchema);

module.exports = InvoiceDB;

// async function kuga() {
//     await InvoiceDB.deleteMany({ service: "otro" });
// }
// kuga();

// async function show() {
//     const kuga = await InvoiceDB.find({ service: "agua" });
//     console.log(kuga);
// }
// show();