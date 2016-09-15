var hoursInFullDay = 7
var leaveUsed = []; // array of TimeOff objects
var currentDate = new Date(); // Set today's date

// Object Constructors
function TimeOff (hours, date) {
    this.hours = hours;
    this.date = date;
};

// Functions
function set_as_today () {
    year = currentDate.getFullYear();
    month = currentDate.getMonth() + 1;
    day = currentDate.getDate();
    document.getElementById('year_input').value = year;
    document.getElementById('month_input').value = month;
    document.getElementById('day_input').value = day;
}

function submitLeave (year, month, day, hours) {
    // Creates a JS Date object with SQL DB values
    var hours = parseFloat(hours);
    var date  = new Date(year, month-1, day); // JS Date objects use 0-11 for months, but years and days are as is
    var i = leaveUsed.length;
    leaveUsed[i] = new TimeOff(hours, date);
};

function updateLeave () {
    currentDate = new Date(); // Update today's date
    //sortDates();
    var totals = calculateTotals(); // [TD year, FD year], [TD 6 weeks, FD 6 weeks], [TD month, FD month]
    document.getElementById("TD12months").innerHTML = totals[0][0];
    document.getElementById("FD12months").innerHTML = totals[0][1];
    document.getElementById("TDyear").innerHTML = totals[2][0];
    document.getElementById("FDyear").innerHTML = totals[2][1];
    document.getElementById("TD6weeks").innerHTML = totals[1][0];
    document.getElementById("FD6weeks").innerHTML = totals[1][1];
    document.getElementById("TDmonth").innerHTML = totals[3][0];
    document.getElementById("FDmonth").innerHTML = totals[3][1];
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
        31536000000, // 12 months
        3628800000 // six weeks
    ];
    var totals = [
        [0,0], // [total days in 12  months, full days in 12 months]
        [0,0], // [total days in 6 weeks, full days in 6 weeks]
        [0,0], // [total days in a year, full days in a year]
        [0,0]  // [total days in current month, full days in current month]
    ];
    for (i=0; i<leaveUsed.length; i++) {
        // 12 months and six weeks
        for (z=0; z<unitInMS.length; z++) {
            if (currentDate.getTime() - leaveUsed[i].date.getTime() <= unitInMS[z]) {
                totals[z][0] += leaveUsed[i].hours;
                if (leaveUsed[i].hours === hoursInFullDay) {
                    totals[z][1] += 1;
                }
            }
        }
        // Current Year
        if (currentDate.getFullYear() === leaveUsed[i].date.getFullYear()) {
            totals[2][0] += leaveUsed[i].hours;
            if (leaveUsed[i].hours === hoursInFullDay) {
                totals[2][1] += 1;
            }
        }
        // Current Month
        if (currentDate.getFullYear() === leaveUsed[i].date.getFullYear() && currentDate.getMonth() === leaveUsed[i].date.getMonth()) {
            totals[3][0] += leaveUsed[i].hours;
            if (leaveUsed[i].hours === hoursInFullDay) {
                totals[3][1] += 1;
            }
        }
    }
    for (i=0; i<totals.length; i++) {
        totals[i][0] /= hoursInFullDay;
    }
    return totals;
};