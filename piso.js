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

    report(invoiceGiven) {
        // 1. Extract interval:

        this.roomiesList.forEach((roomie) => {
            const interval = [];
            let debtPerInvoice = 0;
            if (invoiceGiven.begin >= roomie.end || invoiceGiven.end < roomie.begin) {
                debtors;
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
                console.log(diffOnDays);
                debtPerInvoice = invoiceGiven.totalFractionated * diffOnDays;
                invoiceGiven.debtors[roomie.name] = parseFloat(
                    debtPerInvoice.toFixed(2)
                );
            }
        });
    }
}

class Roomie {
    constructor(name, begin, end, debt = 0) {
        this.name = name;
        this.begin = begin;
        this.end = end;
        this.debt = debt;
    }
}

class Invoice {
    constructor(total, type, begin, end, apartment) {
        this.apartment = apartment;
        this.total = total;
        this.type = type;
        this.begin = begin;
        this.end = end;

        this.isPayed = false;
        this.totalFractionated = this.totalPerRoom();
        this.debtors = {};
    }
    totalPerRoom() {
        const numberOfRooms = this.apartment.numberOfRooms;
        const { begin, end, total } = this;
        const difference = end - begin;
        const daysOfInterval = difference / (1000 * 60 * 60 * 24);
        const totalPerDay = total / daysOfInterval;
        return totalPerDay / numberOfRooms;
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
    new Roomie("Vito", new Date(2018, 0, 1, 2), new Date())
);
guzmanElBueno83.addRoomie(
    new Roomie("Sarah", new Date(2020, 8, 1, 2), new Date())
);
guzmanElBueno83.addRoomie(
    new Roomie("Yausi", new Date(2020, 9, 1, 2), new Date())
);
guzmanElBueno83.addRoomie(
    new Roomie("Anna", new Date(2018, 0, 1, 2), new Date())
);
guzmanElBueno83.addRoomie(
    new Roomie("Norma", new Date(2020, 8, 1, 2), new Date())
);
guzmanElBueno83.addRoomie(
    new Roomie("Oscar", new Date(2018, 0, 1, 2), new Date(2020, 8, 31, 2))
);
guzmanElBueno83.addRoomie(
    new Roomie("Bianca", new Date(2019, 0, 1, 2), new Date(2020, 7, 31, 2))
);

// Invoices:
guzmanElBueno83.addInvoice(
    new Invoice(
        58.6,
        "gas",
        new Date(2020, 7, 20, 2),
        new Date(2020, 9, 20, 2),
        guzmanElBueno83
    )
);

guzmanElBueno83.addInvoice(
    new Invoice(
        51.46,
        "luz",
        new Date(2020, 8, 7, 1),
        new Date(2020, 9, 9, 1),
        guzmanElBueno83
    )
);

//Tests:
guzmanElBueno83.report(guzmanElBueno83.invoices[0]);
console.log(guzmanElBueno83.invoices[1]);
// console.log(guzmanElBueno83.invoices[0]);
// guzmanElBueno83.invoices[1].report();
// guzmanElBueno83.invoices[1].report();
// console.log(guzmanElBueno83.invoices[1]);
// console.log(guzmanElBueno83);

// const date1 = new Date(2020, 7, 20, 2);
// const date2 = new Date(2020, 9, 20, 2);
// const dif = date2 - date1;
// console.log(dif / (60 * 60 * 24 * 1000));
// console.log(guzmanElBueno83.roomiesList[0]);