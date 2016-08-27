var hoursInFullDay = 7
var leaveUsed = []; // array of TimeOff objects
var currentDate = new Date(); // Set today's date

// Object Constructors
function TimeOff (hours, date) {
    this.hours = hours;
    this.date = date;
};

// Functions
function submitLeave () {
    // Adds a user inputed date
    var hours = parseFloat(document.getElementById("inputHours").value);
    var date = new Date(document.getElementById("inputDate").value);
    var i = leaveUsed.length;
    leaveUsed[i] = new TimeOff(hours, date);
};

function updateLeave () {
    currentDate = new Date(); // Update today's date
    sortDates();
    var totals = calculateTotals(); // [TD year, FD year], [TD 6 weeks, FD 6 weeks], [TD month, FD month]
    document.getElementById("TDyear").innerHTML = totals[0][0];
    document.getElementById("FDyear").innerHTML = totals[0][1];
    document.getElementById("TD6weeks").innerHTML = totals[1][0];
    document.getElementById("FD6weeks").innerHTML = totals[1][1];
    document.getElementById("TDmonth").innerHTML = totals[2][0];
    document.getElementById("FDmonth").innerHTML = totals[2][1];
};

function addTestData () {
    leaveUsed[0] = new TimeOff(7, new Date(2014, 05, 12)); // (year, month, day) year and day are as is. month is 0-11 based
    leaveUsed[1] = new TimeOff(7, new Date(2016, 01, 18));
    leaveUsed[2] = new TimeOff(5, new Date(2015, 11, 01));
    leaveUsed[3] = new TimeOff(7, new Date(2014, 02, 20));
    leaveUsed[4] = new TimeOff(1.5, new Date(2015, 07, 08));
    leaveUsed[5] = new TimeOff(7, new Date(2016, 03, 28));
    leaveUsed[6] = new TimeOff(7, new Date(2015, 11, 05));
    leaveUsed[7] = new TimeOff(7, new Date(2016, 05, 27));
    leaveUsed[8] = new TimeOff(3.5, new Date(2016, 05, 12));
};

function sortDates () {
    // Sorts Date objects from oldest to most recent
    leaveUsed.sort(function(a,b){
        if (a.date.getFullYear() != b.date.getFullYear()) {
            return a.date.getFullYear() - b.date.getFullYear();
        } else if (a.date.getMonth() != b.date.getMonth()) {
            return a.date.getMonth() - b.date.getMonth();
        } else {
            return a.date.getDate() - b.date.getDate();
        };
    });
};

function calculateTotals () {
    // Calculates the total hours of time off used in a given interval
    var unitInMS = [
        31536000000, // year
        3628800000 // six weeks
    ];
    var totals = [
        [0,0], // [total days in a year, full days in a year]
        [0,0], // [total days in 6 weeks, full days in 6 weeks]
        [0,0]  // [total days in current month, full days in current month]
    ];
    for (i=0; i<leaveUsed.length; i++) {
        for (z=0; z<unitInMS.length; z++) {
            if (currentDate.getTime() - leaveUsed[i].date.getTime() <= unitInMS[z]) {
                totals[z][0] += leaveUsed[i].hours;
                if (leaveUsed[i].hours === hoursInFullDay) {
                    totals[z][1] += 1;
                }
            }
        }
        if (currentDate.getYear() === leaveUsed[i].date.getYear() && currentDate.getMonth() === leaveUsed[i].date.getMonth()) {
            totals[2][0] += leaveUsed[i].hours;
            if (leaveUsed[i].hours === hoursInFullDay) {
                totals[2][1] += 1;
            }
        }
    }
    for (i=0; i<totals.length; i++) {
        totals[i][0] /= hoursInFullDay;
    }
    return totals;
};

function testCreateObject (year, month, day) {
    // Creates a JS Date object from SQL DB values
    var testDate = new Date(year, month, day);
    return testDate;
}