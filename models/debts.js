const mongoose = require("mongoose");
// mongoose
//     .connect("mongodb://localhost:27017/blameyourroomie", {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
//     .then(() => console.log("Mongo is connected"));
const debtsSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    service: {
        type: String,
        require: true,
    },
    invoiceID: {
        type: String,
        required: true,
    },
    isPayed: {
        type: Boolean,
        default: false,
    },
});

const debtDB = mongoose.model("debt", debtsSchema);
module.exports = debtDB;

// async function kuga() {
//     await debtDB.deleteMany({ amount: 1 });
// }

// kuga();