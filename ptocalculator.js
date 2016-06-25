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
    var totals = calculateTotals(); // [total days in a year, full days in a year], [total days in 6 weeks, full days in 6 weeks]
    document.getElementById("TDyear").innerHTML = totals[0][0];
    document.getElementById("FDyear").innerHTML = totals[0][1];
    document.getElementById("TD6weeks").innerHTML = totals[1][0];
    document.getElementById("FD6weeks").innerHTML = totals[1][1];
};

function addTestData () {
    leaveUsed[0] = new TimeOff(7, new Date(2014, 05, 12));
    leaveUsed[1] = new TimeOff(7, new Date(2016, 01, 18));
    leaveUsed[2] = new TimeOff(5, new Date(2015, 11, 01));
    leaveUsed[3] = new TimeOff(7, new Date(2014, 02, 20));
    leaveUsed[4] = new TimeOff(1.5, new Date(2015, 07, 08));
    leaveUsed[5] = new TimeOff(7, new Date(2016, 03, 28));
    leaveUsed[6] = new TimeOff(7, new Date(2015, 11, 05));
    leaveUsed[7] = new TimeOff(7, new Date(2016, 05, 27));
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
    ]
    var totals = [[0,0],[0,0]]; // [total days in a year, full days in a year], [total days in 6 weeks, full days in 6 weeks]

    for (i=0; i<leaveUsed.length; i++) {
        for (z=0; z<unitInMS.length; z++) {
            if (currentDate.getTime() - leaveUsed[i].date.getTime() <= unitInMS[z]) {
                totals[z][0] += leaveUsed[i].hours;
                if (leaveUsed[i].hours === hoursInFullDay) {
                    totals[z][1] += 1;
                }
            }
        }
    }
    totals[0][0] /= hoursInFullDay;
    totals[1][0] /= hoursInFullDay;
    return totals;
};