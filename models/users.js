const mongoose = require("mongoose");
// mongoose
//     .connect("mongodb://localhost:27017/blameyourroomie", {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
//     .then(() => console.log("Mongo is connected"));
const usersSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});
const UserDB = mongoose.model("User", usersSchema);
module.exports = UserDB;