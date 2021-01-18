async function spreadTotal(RoomieDB, invoiceSelected) {
    debtors = {};
    const roomies = await RoomieDB.find({});
    const differenceOnDays =
        (invoiceSelected.end - invoiceSelected.begin) / (1000 * 60 * 60 * 24);
    const totalPerDayPerRoom = invoiceSelected.total / differenceOnDays / 5;
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
            debtors[roomie.name] = parseFloat(debtPerInvoice.toFixed(2));
        }
        return debtors;
    });
}

module.exports = spreadTotal;