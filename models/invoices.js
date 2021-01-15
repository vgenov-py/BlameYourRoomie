const mongoose = require("mongoose");
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
});

const InvoiceDB = mongoose.model("Invoice", invoicesSchema);

module.exports = InvoiceDB;