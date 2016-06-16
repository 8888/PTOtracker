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
    var currentDate = new Date(); // Update today's date
    sortDates();
    calculateTotals();
};

function addTestData () {
    leaveUsed[0] = new TimeOff(7, new Date(2014, 05, 12));
    leaveUsed[1] = new TimeOff(7, new Date(2016, 01, 18));
    leaveUsed[2] = new TimeOff(5, new Date(2015, 11, 01));
    leaveUsed[3] = new TimeOff(7, new Date(2014, 02, 20));
    leaveUsed[4] = new TimeOff(1.5, new Date(2015, 07, 08));
    leaveUsed[5] = new TimeOff(7, new Date(2016, 03, 28));
    leaveUsed[6] = new TimeOff(7, new Date(2015, 11, 05));
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