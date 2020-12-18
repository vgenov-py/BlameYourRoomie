class Apartment {
    constructor(id, adress, numberOfRooms) {
        this.id = id;
        this.adress = adress;
        this.numberOfRooms = numberOfRooms;
        this.roomiesList = [];
        this.invoices = [];
    }
    addRoomie(roomie) {
        this.roomiesList.push(roomie);
    }
    addInvoice(invoice) {
        this.invoices.push(invoice);
    }
    addDebt(invoiceGiven) {
            //1. Total per room for further calculation:
            const differenceOnDays =
                (invoiceGiven.end - invoiceGiven.begin) / (1000 * 60 * 60 * 24);
            const totalPerDayPerRoom =
                invoiceGiven.total / differenceOnDays / this.numberOfRooms;

            this.roomiesList.forEach((roomie) => {
                // 1. Extract interval:
                const interval = [];
                let debtPerInvoice = 0;
                if (invoiceGiven.begin >= roomie.end || invoiceGiven.end < roomie.begin) {
                    debtorsDic;
                } else {
                    // Extracting the first element of interval:
                    if (invoiceGiven.begin >= roomie.begin) {
                        interval.push(invoiceGiven.begin);
                    } else {
                        interval.push(roomie.begin);
                    }
                    // Extracting the second element of interval:
                    if (invoiceGiven.end <= roomie.end) {
                        interval.push(invoiceGiven.end);
                    } else {
                        interval.push(roomie.end);
                    }
                    // 2. Insert names and debt into the dictionary debtors:
                    const diffOnDays = (interval[1] - interval[0]) / (60 * 60 * 24 * 1000); // Getting differences between dates and after converting ms in days.
                    debtPerInvoice = totalPerDayPerRoom * diffOnDays;
                    // debtorsDic[roomie.name] = parseFloat(debtPerInvoice.toFixed(2)); // To make instant report on a variable dictionary.
                    roomie.debts.push(
                        new Debt(invoiceGiven, parseFloat(debtPerInvoice.toFixed(2)), false)
                    ); //Add debt
                }
            });
        } // addDebt closure
    debtReport() {
        const dictionary = {};
        this.roomiesList.forEach((roomie) => {
            dictionary[roomie.name] = 0;
            roomie.debts.forEach((debt) => {
                if (debt.isPayed === false) {
                    dictionary[roomie.name] += debt.total;
                }
            });
        });
        return dictionary;
    }
    invoiceReport(invoiceGiven) {
        const dictionary = {};
        this.roomiesList.forEach((roomie) => {
            dictionary[roomie.name] = 0;
            roomie.debts.forEach((debt) => {
                if (debt.invoice === invoiceGiven) {
                    dictionary[roomie.name] += debt.total;
                }
            });
        });
        return dictionary;
    }
}
const debtorsDic = {};

class Roomie {
    constructor(id, name, begin, end) {
        this.id = id;
        this.name = name;
        this.begin = begin;
        this.end = end;
        this.debts = [];
    }
    payInvoice(invoiceGiven) {
        this.debts.forEach((debt) => {
            if (debt.invoice === invoiceGiven) {
                debt.isPayed = true;
            }
        });
    }
}

class Debt {
    constructor(invoice, total, isPayed) {
        this.invoice = invoice;
        this.total = total;
        this.isPayed = isPayed;
    }
}

class Invoice {
    constructor(id, total, type, begin, end) {
        this.id = id;
        this.total = total;
        this.type = type;
        this.begin = begin;
        this.end = end;
        this.isPayed = false;
    }
}

//Creation statements:
const guzmanElBueno83 = new Apartment(
    "1",
    "Calle Guzman el Bueno 83, bajo C",
    5
);

//Roomies

guzmanElBueno83.addRoomie(
    new Roomie(1, "Vito", new Date(2018, 0, 1, 2), new Date())
);
guzmanElBueno83.addRoomie(
    new Roomie(2, "Sarah", new Date(2020, 8, 1, 2), new Date())
);
guzmanElBueno83.addRoomie(
    new Roomie(3, "Yausi", new Date(2020, 9, 1, 2), new Date())
);
guzmanElBueno83.addRoomie(
    new Roomie(4, "Anna", new Date(2018, 0, 1, 2), new Date())
);
guzmanElBueno83.addRoomie(
    new Roomie(5, "Norma", new Date(2020, 8, 1, 2), new Date())
);
guzmanElBueno83.addRoomie(
    new Roomie(6, "Oscar", new Date(2018, 0, 1, 2), new Date(2020, 8, 31, 2))
);
guzmanElBueno83.addRoomie(
    new Roomie(7, "Bianca", new Date(2019, 0, 1, 2), new Date(2020, 7, 31, 2))
);

// Invoices:
guzmanElBueno83.addInvoice(
    new Invoice(
        1,
        58.6,
        "gas",
        new Date(2020, 7, 20, 2),
        new Date(2020, 9, 20, 2)
    )
);

guzmanElBueno83.addInvoice(
    new Invoice(2, 51.46, "luz", new Date(2020, 8, 7, 2), new Date(2020, 9, 9, 2))
);

//Tests:
guzmanElBueno83.addDebt(guzmanElBueno83.invoices[0]);
guzmanElBueno83.addDebt(guzmanElBueno83.invoices[1]);
guzmanElBueno83.roomiesList[0].payInvoice(guzmanElBueno83.invoices[0]);
console.log(guzmanElBueno83.invoiceReport(guzmanElBueno83.invoices[0]));
// console.log(guzmanElBueno83.invoices[0]);
// console.log(guzmanElBueno83.debtReport());
// console.log(guzmanElBueno83.invoices[1]);
// console.log(debtorsDic);
// console.log(guzmanElBueno83.invoices[0]);
// guzmanElBueno83.invoices[1].report();
// guzmanElBueno83.invoices[1].report();
// console.log(guzmanElBueno83.invoices[1]);
// console.log(guzmanElBueno83);