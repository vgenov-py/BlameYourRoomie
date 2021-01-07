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
            if (invoiceGiven.begin >= roomie.end || invoiceGiven.end < roomie.begin) {} else {
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
                roomie.debts.push(
                    new Debt(invoiceGiven, parseFloat(debtPerInvoice.toFixed(2)))
                );
            }
        });
    }
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
        const dictionary = { Factura: invoiceGiven.type };
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
    payInvoice(invoiceGiven) {
        const dicta = {};
        const debtors = { "Left to pay": [] };
        this.roomiesList.forEach((roomie) => {
            roomie.debts
                .filter((debt) => debt.invoice === invoiceGiven)
                .forEach((debt) => {
                    if (debt.isPayed === true) {
                        dicta[roomie.name] = debt.isPayed;
                    } else {
                        dicta[roomie.name] = debt.isPayed;
                    }
                });
        });
        if (Object.values(dicta).every((value) => value === true)) {
            invoiceGiven.isPayed = true;
        } else {
            for (const [key, value] of Object.entries(dicta)) {
                if (value === false) {
                    debtors["Left to pay"].push(key);
                }
            }
        }
        if (debtors["Left to pay"].length >= 1) {
            console.log(debtors);
        }
    }
}

class Roomie {
    constructor(id, name, begin, end) {
        this.id = id;
        this.name = name;
        this.begin = begin;
        this.end = end;
        this.debts = [];
    }
    payInvoiceDebt(invoiceGiven) {
        this.debts.forEach((debt) => {
            if (debt.invoice === invoiceGiven) {
                debt.isPayed = true;
            }
        });
    }
}

class Debt {
    constructor(invoice, total) {
        this.invoice = invoice;
        this.total = total;
        this.isPayed = false;
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
guzmanElBueno83.addRoomie(
    new Roomie(7, "Laura", new Date(2021, 0, 1, 2), new Date())
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

guzmanElBueno83.addInvoice(
    new Invoice(
        3,
        53.8,
        "luz(08112020-06122020)",
        new Date(2020, 10, 8, 2),
        new Date(2020, 11, 6, 2)
    )
);
guzmanElBueno83.addInvoice(
    new Invoice(
        4,
        52.13,
        "agua(04092020-30102020)",
        new Date(2020, 8, 4, 2),
        new Date(2020, 9, 30, 2)
    )
);

//Tests:
guzmanElBueno83.addDebt(guzmanElBueno83.invoices[0]);
guzmanElBueno83.addDebt(guzmanElBueno83.invoices[1]);
guzmanElBueno83.addDebt(guzmanElBueno83.invoices[2]);
guzmanElBueno83.addDebt(guzmanElBueno83.invoices[3]);

//Invoices payed by roomie:

guzmanElBueno83.roomiesList[0].payInvoiceDebt(guzmanElBueno83.invoices[0]);
guzmanElBueno83.roomiesList[1].payInvoiceDebt(guzmanElBueno83.invoices[0]);
guzmanElBueno83.roomiesList[2].payInvoiceDebt(guzmanElBueno83.invoices[0]);
guzmanElBueno83.roomiesList[3].payInvoiceDebt(guzmanElBueno83.invoices[0]);
guzmanElBueno83.roomiesList[4].payInvoiceDebt(guzmanElBueno83.invoices[0]);
guzmanElBueno83.roomiesList[5].payInvoiceDebt(guzmanElBueno83.invoices[0]);
guzmanElBueno83.roomiesList[6].payInvoiceDebt(guzmanElBueno83.invoices[0]);
guzmanElBueno83.roomiesList[0].payInvoiceDebt(guzmanElBueno83.invoices[1]);
guzmanElBueno83.roomiesList[1].payInvoiceDebt(guzmanElBueno83.invoices[1]);
guzmanElBueno83.roomiesList[2].payInvoiceDebt(guzmanElBueno83.invoices[1]);
guzmanElBueno83.roomiesList[3].payInvoiceDebt(guzmanElBueno83.invoices[1]);
guzmanElBueno83.roomiesList[4].payInvoiceDebt(guzmanElBueno83.invoices[1]);
guzmanElBueno83.roomiesList[5].payInvoiceDebt(guzmanElBueno83.invoices[1]);
guzmanElBueno83.roomiesList[6].payInvoiceDebt(guzmanElBueno83.invoices[1]);
guzmanElBueno83.roomiesList[1].payInvoiceDebt(guzmanElBueno83.invoices[2]);
guzmanElBueno83.roomiesList[1].payInvoiceDebt(guzmanElBueno83.invoices[3]);
guzmanElBueno83.roomiesList[4].payInvoiceDebt(guzmanElBueno83.invoices[2]);
guzmanElBueno83.roomiesList[4].payInvoiceDebt(guzmanElBueno83.invoices[3]);
guzmanElBueno83.roomiesList[5].payInvoiceDebt(guzmanElBueno83.invoices[3]);

guzmanElBueno83.roomiesList[0].payInvoiceDebt(guzmanElBueno83.invoices[2]);
guzmanElBueno83.roomiesList[2].payInvoiceDebt(guzmanElBueno83.invoices[2]);
guzmanElBueno83.roomiesList[3].payInvoiceDebt(guzmanElBueno83.invoices[2]);
guzmanElBueno83.roomiesList[0].payInvoiceDebt(guzmanElBueno83.invoices[3]);
guzmanElBueno83.roomiesList[2].payInvoiceDebt(guzmanElBueno83.invoices[3]);
guzmanElBueno83.roomiesList[3].payInvoiceDebt(guzmanElBueno83.invoices[3]);

guzmanElBueno83.payInvoice(guzmanElBueno83.invoices[0]);
guzmanElBueno83.payInvoice(guzmanElBueno83.invoices[1]);
guzmanElBueno83.payInvoice(guzmanElBueno83.invoices[2]);
guzmanElBueno83.payInvoice(guzmanElBueno83.invoices[3]);
console.log(guzmanElBueno83.invoices[3]);
// console.log(guzmanElBueno83.payInvoice(guzmanElBueno83.invoices[0]));
// console.log(guzmanElBueno83);
// console.log(guzmanElBueno83.payInvoice(guzmanElBueno83.invoices[0]));
// console.log(guzmanElBueno83.invoiceReport(guzmanElBueno83.invoices[2]));
// console.log(guzmanElBueno83.invoiceReport(guzmanElBueno83.invoices[3]));
// console.log(guzmanElBueno83.invoices[0]);
// console.log(guzmanElBueno83.debtReport());
// console.log(guzmanElBueno83.invoices[1]);
// console.log(debtorsDic);
// console.log(guzmanElBueno83.invoices[0]);
// guzmanElBueno83.invoices[1].report();
// guzmanElBueno83.invoices[1].report();
// console.log(guzmanElBueno83.invoices[1]);
// console.log(guzmanElBueno83);