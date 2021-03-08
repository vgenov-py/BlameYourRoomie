const express = require("express");
const app = express();
const path = require("path");
const rf = require("./public/reportFunctions");
const mongoose = require("mongoose");
const ApartmentDB = require("./models/apartments");
const InvoiceDB = require("./models/invoices");
const RoomieDB = require("./models/roomies");
mongoose
    .connect("mongodb://localhost:27017/blameyourroomie", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(console.log("Mongo is connected!"))
    .catch((e) => {
        console.log("Eroor:", e);
    });
app.use(express.static(path.join(__dirname, "public")));
app.use(
    express.static(__dirname + "/public/js", {
        Headers: { "Content-Type": "text/javascript" },
    })
);
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/test", (req, res) => {
    res.render("test");
});

//Apartments:
app.get("/apartments", async(req, res) => {
    const apartments = await ApartmentDB.find({});
    res.render("apartments/index", { apartments });
});

app.get("/apartments/:id", async(req, res) => {
    const { id } = req.params;
    const apartmentSelected = await ApartmentDB.findById(id);
    res.render("apartments/details", {
        apartmentSelected,
    });
});

//Roomies:
app.get("/apartments/:id/roomies", async(req, res) => {
    const apartmentID = req.params;
    const roomies = await RoomieDB.find({ apartmentID: apartmentID.id });
    res.locals.apartmentID = apartmentID.id;
    res.render("roomies/index", { roomies });
});

app.get("/roomies/new", (req, res) => {
    //TODO
    res.render("roomies/new");
});

app.post("/roomies", async(req, res) => {
    const newRoomie = new RoomieDB(req.body);
    await newRoomie.save();
    res.send("Roomie added");
});

//Invoices:

app.get("/apartments/:id/invoices", async(req, res) => {
    const apartmentID = req.params;
    const invoices = await InvoiceDB.find({ apartmentID: apartmentID.id });
    res.locals.apartmentID = apartmentID.id;
    res.render("invoices/index", { invoices });
});

app.get("/apartments/:id/invoices/new", (req, res) => {
    const apartmentID = req.params;
    res.render("invoices/new", { apartmentID });
});

app.post("/apartments/:id/invoices", async(req, res) => {
    const { apartmentID, service, begin, end, total } = req.body;
    const roomies = await RoomieDB.find({
        apartmentID: apartmentID,
    });
    const apartment = await ApartmentDB.findOne({ _id: apartmentID });
    const rooms = apartment.rooms;
    const newInvoice = new InvoiceDB({
        service: service,
        apartmentID: apartmentID,
        begin: begin,
        end: end,
        total: total,
        apartmentID: apartmentID,
    });
    await newInvoice.save();
    //TEST:

    const dicta = rf.getDebtors(roomies, newInvoice, rooms);
    rf.addDebt(dicta.debtors, dicta.amounts, newInvoice);

    res.redirect(`invoices/${newInvoice._id}`);
});

app.get("/apartments/:id/invoices/:id", async(req, res) => {
    const { id } = req.params;
    const invoiceSelected = await InvoiceDB.findById(id);
    const apartment = await ApartmentDB.findById(invoiceSelected.apartmentID);
    const apartmentID = apartment._id; //Maybe change order? Improve requirment
    const rooms = apartment.rooms;
    const roomies = await RoomieDB.find({
        apartmentID: apartmentID,
    });
    const dicta = rf.getDebtors(roomies, invoiceSelected, rooms);
    res.locals.debtors = dicta.debtors;
    res.locals.amounts = dicta.amounts;
    res.render("invoices/details", { invoiceSelected });
});

app.get("/apartments/:id/roomies/:id", async(req, res) => {
    const { id } = req.params;
    const roomie = await RoomieDB.findById(id);
    res.render("roomies/details", {
        roomie,
    });
});

app.listen(3000, () => {
    console.log("Listening on port 3000!");
});