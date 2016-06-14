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
    var hours = parseFloat(document.getElementById("inputHours").value);
    var date = document.getElementById("inputDate").value
    var i = leaveUsed.length;
    leaveUsed[i] = new TimeOff(hours, date);
};

function updateLeave () {
    var currentDate = new Date();
    calculateTotals()
};

function calculateTotals () {
    var totalHours = 0
    var totalDays = 0
    var totalFullDays = 0
    for (i=0; i < leaveUsed.length; i++) {
        totalHours += leaveUsed[i].hours;
        if (leaveUsed[i].hours === 7) {
            totalFullDays += 1
        };    
    };  
    totalDays = totalHours / hoursInFullDay;

console.log(totalHours)
console.log(totalDays)
console.log(totalFullDays)
};