class Roomie {
    constructor(name, begin, end, debt = 0) {
        this.name = name;
        this.begin = begin;
        this.end = end;
        this.debt = debt;
    }
}

class Invoice {
    constructor(total, type, begin, end) {
        //ask for this
        this.total = total;
        this.type = type;
        this.begin = begin;
        this.end = end;
        this.payed = false;
        this.totalFractionated = this.totalPerPerson();
        this.debtors = {};
    }
    totalPerPerson() {
            const { begin, end, total } = this;
            const difference = end.getTime() - begin.getTime(); //.getTime function were eliminated for the sake of a simplified test.
            const daysOfInterval = difference / (1000 * 60 * 60 * 24); // keeping in mind the mentioned test this has to be eliminated also.
            const totalPerDay = total / daysOfInterval;
            return totalPerDay / 5;
        }
        //Report function:
    report() {
        const { total, type, begin, end, payed, debtors, totalFractionated } = this;

        // 1. Extract interval:

        roomiesList.forEach((roomie) => {
            const interval = [];
            let debtPerInvoice = 0;
            if (begin >= roomie.end || end < roomie.begin) {
                console.log("Begin was higher or end was lower than begin");
                debtors;
            } else {
                // Extracting the first element of interval:

                if (begin >= roomie.begin) {
                    interval.push(begin);
                    console.log("invoice.begin was pushed");
                } else {
                    interval.push(roomie.begin);
                    console.log("roomie.begin was pushed");
                }

                // Extracting the second element of interval:

                if (end <= roomie.end) {
                    interval.push(end);
                } else {
                    interval.push(roomie.end);
                }
                console.log(interval);
                const diffOnDays = (interval[1] - interval[0]) / (60 * 60 * 24 * 1000); // Getting differences between dates and after converting ms into days
                debtPerInvoice = totalFractionated * diffOnDays;
                debtors[roomie.name] = debtPerInvoice; // Insert amount in invoice dictionary.
                roomie.debt += debtPerInvoice; // Insert amount in roomie debt.
            }
            // First exit of the else statemt.
        });
    }
}

//Creation statements:

const anonymous1 = new Roomie(
    "Anonymous1",
    new Date(2018, 0, 1),
    new Date(2020, 11, 31, 1)
);
const anonymous2 = new Roomie( //Sarah
    "Anonymous2",
    new Date(2020, 8, 1, 1),
    new Date(2020, 11, 31, 1)
);
const anonymous3 = new Roomie( //Yausi
    "Anonymous3",
    new Date(2020, 9, 1, 1),
    new Date(2020, 11, 31, 1)
);
const anonymous4 = new Roomie( //Anna
    "Anonymous4",
    new Date(2018, 0, 1, 1),
    new Date(2020, 11, 31, 1)
);
const anonymous5 = new Roomie( //Norma
    "Anonymous5",
    new Date(2020, 8, 1, 1),
    new Date(2020, 11, 31, 1)
);
const anonymous6 = new Roomie( //Oscar
    "Anonymous6",
    new Date(2018, 0, 1, 1),
    new Date(2020, 8, 31, 1)
);

const roomiesList = [
    anonymous1,
    anonymous2,
    anonymous3,
    anonymous4,
    anonymous5,
    anonymous6,
];

const luz = new Invoice(
    51.46,
    "luz",
    new Date(2020, 8, 7, 1),
    new Date(2020, 9, 9, 1)
);
const gas = new Invoice(
    58.6,
    "gas",
    new Date(2020, 7, 20, 1),
    new Date(2020, 9, 20, 1)
);

const invoices = [luz, gas];
//Tests:

// console.log(luz);
luz.report();
gas.report();
console.log(luz);
console.log(gas);
console.log(anonymous1);
// console.log(anonymous2);
// console.log(anonymous3);
// console.log(`Start date invoice: ${luz.begin}`);
// console.log(`End date invoice: ${luz.end}`);
// console.log(`Total amoun per day & per room: ${luz.totalPerPerson()}`);
// console.log(`Function test: ${luz.totalPerPerson() === 20}`);

//lab:

// const fecha1 = new Date(2020, 10, 10, 1);
// const fecha2 = new Date(2020, 10, 12, 1);
// const diff = (fecha2 - fecha1) / (60 * 60 * 24 * 1000);
// console.log(diff);