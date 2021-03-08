const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

const mongoose = require("mongoose");
const UserDB = require("../models/users");
const ApartmentDB = require("../models/apartments");
const InvoiceDB = require("../models/invoices");
const RoomieDB = require("../models/roomies");

const errMsg = { success: false, msg: "something go wrong" };

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

app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
    app.options("*", (req, res) => {
        res.header(
            "Access-Control-Allow-Methods",
            "GET, PATCH, PUT, POST, DELETE, OPTIONS"
        );
        res.send();
    });
});

//USERS ENDPOINTS:

app.get("/users", async(req, res) => {
    try {
        const users = await UserDB.find();
        res.status(201).send(users);
    } catch (e) {
        res.status(401).send(errMsg);
    }
});

app.post("/users", async(req, res) => {
    const { email, password } = req.body;
    const modifiedPassword = await bcrypt.hash(password, 12);
    try {
        const users = await UserDB;
        await users.create({ email: email, password: modifiedPassword });
        res.status(201).send({
            success: true,
            msg: "User created",
        });
    } catch (e) {
        res.status(401).send({
            success: false,
            msg: "Something go wrong inserting your data",
        });
    }
});

//APARTMENTS ENDPOINTS:

app.get("/apartments", (req, res) => {
    ApartmentDB.find()
        .then((data) => res.status(201).send(data))
        .catch((error) =>
            res.status(400).send({
                message: "Something go wrong fetching your data",
                error: error,
            })
        );
});

app.get("/apartments/:id", (req, res) => {
    const { id } = req.params;
    ApartmentDB.findById(id)
        .then((data) => res.status(201).send(data))
        .catch((error) =>
            res.status(400).send({
                message: "Something go wrong fetching your data",
                error: error,
            })
        );
});

//ROOMIES ENDPOINTS:

app.get("/roomies", (req, res) => {
    RoomieDB.find()
        .then((data) => res.status(201).send(data))
        .catch((error) =>
            res.status(400).send({
                message: "Something go wrong fetching your data",
                error: error,
            })
        );
});

app.get("/invoices", (req, res) => {
    InvoiceDB.find()
        .then((data) => res.status(201).send(data))
        .catch((error) =>
            res.status(400).send({
                message: "Something go wrong fetching your data",
                error: error,
            })
        );
});

app.get("/invoices/:invoiceId", (req, res) => {
    const { invoiceId } = req.params;
    InvoiceDB.findById(invoiceId)
        .then((data) => {
            if (data) res.status(201).send(data);
            else
                res.status(202).send({
                    msg: "There is not such invoice",
                });
        })
        .catch((error) =>
            res.status(400).send({
                message: "Something go wrong fetching your data",
                error: error,
            })
        );
});

app.get("/apartments/:apartmentId/roomies", (req, res) => {
    const { apartmentId } = req.params;
    RoomieDB.find({ apartmentID: apartmentId })
        .then((data) => res.status(201).send(data))
        .catch((error) =>
            res.status(400).send({
                message: "Something go wrong fetching your data",
                error: error,
            })
        );
});

app.get("/apartments/:apartmentId/invoices", (req, res) => {
    const { apartmentId } = req.params;
    InvoiceDB.find({ apartmentID: apartmentId })
        .then((data) => res.status(201).send(data))
        .catch((error) =>
            res.status(400).send({
                message: "Something go wrong fetching your data",
                error: error,
            })
        );
});

app.listen(4000, () => console.log("The API is listening on port 4000"));