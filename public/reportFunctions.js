const debtDB = require("../models/debts");

const getDebtors = (roomies, invoiceSelected, rooms) => {
    const dicta = {};
    const debtors = [];
    const amounts = [];
    const differenceOnDays =
        (invoiceSelected.end - invoiceSelected.begin) / (1000 * 60 * 60 * 24);
    const totalPerDayPerRoom = invoiceSelected.total / differenceOnDays / rooms;
    roomies.forEach((roomie) => {
        // 1. Extract interval:
        const interval = [];
        let debtPerInvoice = 0;
        if (
            invoiceSelected.begin >= roomie.end ||
            invoiceSelected.end < roomie.begin
        ) {} else {
            // Extracting the first element of interval:
            if (invoiceSelected.begin >= roomie.begin) {
                interval.push(invoiceSelected.begin);
            } else {
                interval.push(roomie.begin);
            }
            // Extracting the second element of interval:
            if (invoiceSelected.end <= roomie.end) {
                interval.push(invoiceSelected.end);
            } else {
                interval.push(roomie.end);
            }
            const diffOnDays = (interval[1] - interval[0]) / (60 * 60 * 24 * 1000); // Getting differences between dates and after converting ms in days.
            debtPerInvoice = totalPerDayPerRoom * diffOnDays;
            debtors.push(roomie);
            amounts.push(parseFloat(debtPerInvoice.toFixed(2)));
        }
    });
    dicta["debtors"] = debtors;
    dicta["amounts"] = amounts;
    return dicta;
};

const addDebt = (debtors, amounts, invoiceSelected) => {
    const numbers = amounts;
    debtors.forEach(async(debtor) => {
        const debt = new debtDB({
            service: invoiceSelected.service,
            amount: numbers.shift(),
            invoiceID: invoiceSelected._id,
        });
        await debt.save();
        debtor.debts.push(debt);
        debtor.debt += debt.amount;
        await debtor.save();
    });
};

module.exports = {
    getDebtors: getDebtors,
    addDebt: addDebt,
};