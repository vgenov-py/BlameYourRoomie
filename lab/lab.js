const Roomie = require("../models/roomies");
const Invoice = require("../models/invoices");
const mongoose = require("mongoose");

async function makeReport() {
    const debtors = {};
    const roomies = await Roomie.find({});
    const invoice = await Invoice.findById("60019f5260bef21c363037e9");
    const differenceOnDays =
        (invoice.end - invoice.begin) / (1000 * 60 * 60 * 24);
    const totalPerDayPerRoom = invoice.total / differenceOnDays / 5;

    roomies.forEach((roomie) => {
        // 1. Extract interval:
        const interval = [];
        let debtPerInvoice = 0;
        if (invoice.begin >= roomie.end || invoice.end < roomie.begin) {} else {
            // Extracting the first element of interval:
            if (invoice.begin >= roomie.begin) {
                interval.push(invoice.begin);
            } else {
                interval.push(roomie.begin);
            }
            // Extracting the second element of interval:
            if (invoice.end <= roomie.end) {
                interval.push(invoice.end);
            } else {
                interval.push(roomie.end);
            }
            const diffOnDays = (interval[1] - interval[0]) / (60 * 60 * 24 * 1000); // Getting differences between dates and after converting ms in days.
            debtPerInvoice = totalPerDayPerRoom * diffOnDays;
            debtors[roomie.name] = parseFloat(debtPerInvoice.toFixed(2));
        }
    });
    console.log(debtors, invoice.total);
}