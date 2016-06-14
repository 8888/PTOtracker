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
    var date = new Date(document.getElementById("inputDate").value);
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
    leaveUsed[6] = new TimeOff(7, new Date(2015, 11, 05));
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

function orderList () {
    //Orders an array of dates from earliest date to most recent
    //Years in javascript are yyyy
    //Months in javascript are 0-11
    //Days in javascript are 1-31
    var dates = leaveUsed.slice(); //Creates a copy of the array
    var orderedArray = []
    var currentWorkingYear = []
    var currentWorkingMonth = []

    //Year
    while (dates.length > 0) {
        var earliestYear = 9999
        //Finds the earliest year
        for (i=0; i < dates.length; i++) {
            if (dates[i].date.getFullYear() < earliestYear) {
                earliestYear = dates[i].date.getFullYear();
            };
        };
        //Removes all dates with the earliest year
        for (i=0; i < dates.length; i++) {
            if (dates[i].date.getFullYear() === earliestYear) {
                currentWorkingYear.push(dates.splice(i, 1)[0]); // Removes the object from the array and adds it to the new array. splice(index to start at, number of items to remove) splice returns an array of the items, hence the final 0 index.
                i -= 1;
            };
        };

        //Month
        while (currentWorkingYear.length > 0) {
            var earliestMonth = 12
            //Finds the earliest month
            for (i=0; i < currentWorkingYear.length; i++) {
                if (currentWorkingYear[i].date.getMonth() < earliestMonth) {
                    earliestMonth = currentWorkingYear[i].date.getMonth();
                };
            };
            //Removes all dates with the earliest month
            for (i=0; i < currentWorkingYear.length; i++) {
                if (currentWorkingYear[i].date.getMonth() === earliestMonth) {
                    currentWorkingMonth.push(currentWorkingYear.splice(i, 1)[0]);
                    i -= 1;
                };
            };

            //Day
            while (currentWorkingMonth.length > 0) {
                var earliestDay = 31
                // Finds the earliest day
                for (i=0; i < currentWorkingMonth.length; i++) {
                    if (currentWorkingMonth[i].date.getDate() < earliestDay) {
                        earliestDay = currentWorkingMonth[i].date.getDate();
                    };
                };
                // Removes all dates with the earliest day
                for (i=0; i < currentWorkingMonth.length; i++) {
                    if (currentWorkingMonth[i].date.getDate() === earliestDay) {
                        orderedArray.push(currentWorkingMonth.splice(i, 1)[0]);
                        i -= 1;
                    };
                };
            };
        };
    };
    console.log(leaveUsed)
    leaveUsed = orderedArray;
    console.log(leaveUsed)
};