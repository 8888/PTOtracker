var hoursInFullDay = 7
var leaveUsed = []; // array of TimeOff objects
var totalHours = 0
var totalDays = 0
var totalFullDays = 0

// Object Constructors
function TimeOff (hours, date) {
    this.hours = hours;
    this.date = date;
};

// Functions
function submitLeave () {
    // Adds a user inputed date
    var hours = parseFloat(document.getElementById("inputHours").value);
    var date = document.getElementById("inputDate").value
    var i = leaveUsed.length;
    leaveUsed[i] = new TimeOff(hours, date);
};

function updateLeave () {
    var currentDate = new Date();
    calculateTotals();
    orderList();
};

function addTestData () {
    leaveUsed[0] = new TimeOff(7, new Date(2014, 05, 12));
    leaveUsed[1] = new TimeOff(7, new Date(2016, 01, 18));
    leaveUsed[2] = new TimeOff(5, new Date(2015, 11, 01));
    leaveUsed[3] = new TimeOff(7, new Date(2014, 02, 20));
    leaveUsed[4] = new TimeOff(1.5, new Date(2015, 07, 08));
    leaveUsed[5] = new TimeOff(7, new Date(2016, 03, 28));
    console.log(leaveUsed)
}

function calculateTotals () {
    totalHours = 0
    totalDays = 0
    totalFullDays = 0
    for (i=0; i < leaveUsed.length; i++) {
        totalHours += leaveUsed[i].hours;
        if (leaveUsed[i].hours === 7) {
            totalFullDays += 1
        };    
    };  
    totalDays = totalHours / hoursInFullDay;
};

function orderList (){
    //Orders an array of dates from earliest date to most recent
    var copyArray = leaveUsed.slice();
    var orderedArray = []
    var earliestYear = findEarliestYear(copyArray);
    var earliestMonth = findEarliestMonth(copyArray, earliestYear);
    var earliestDay = findEarliestDay(copyArray, earliestYear, earliestMonth);
    console.log(earliestYear, earliestMonth, earliestDay)
};

function findEarliestYear (dates) {
    //Finds the earliest year out of an array of dates
    //Years in javascript are yyyy
    var earliestYear = 9999
    for (i=0; i < dates.length; i++) {
        if (dates[i].date.getFullYear() < earliestYear) {
            earliestYear = dates[i].date.getFullYear();
        };
    };
    return earliestYear;
};

function findEarliestMonth (dates, earliestYear) {
    //Finds the earliest month out of a subsection of the earliest year of an array of dates
    //Months in javascript are from 0-11
    var earliestMonth = 11
    for (i=0; i < dates.length; i++) {
        if (dates[i].date.getFullYear() === earliestYear) {
            if (dates[i].date.getMonth() < earliestMonth) {
                earliestMonth = dates[i].date.getMonth();
            };
        };
    };
    return earliestMonth;
};

function findEarliestDay (dates, earliestYear, earliestMonth) {
    //Finds the earliest day out of a subsection of the earliest year and month of an array of dates
    //Days in javascript are from 1-31
    var earliestDay = 31
    for (i=0; i < dates.length; i++) {
        if (dates[i].date.getFullYear() === earliestYear) {
            if (dates[i].date.getMonth() === earliestMonth) {
                if (dates[i].date.getDate() < earliestDay) {
                    earliestDay = dates[i].date.getDate();
                };
            };
        };
    };
    return earliestDay;
};