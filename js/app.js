var medications = [];

function Medication (name, prescriber, dosage, doseType, quantity, start, duration, intervals, first, second, third, withFood, beforeFood, numRefills, pharmName, pharmPhone, taking, addCurrSched, notes) {
  this.name = name;
  this.prescriber = prescriber;
  this.dosage = dosage;
  this.doseType = doseType;
  this.quantity = quantity;
  this.start = start;
  this.duration = duration;
  this.intervals = intervals;
  this.first = first;
  this.second = second;
  this.third = third;
  this.withFood = withFood;
  this.beforeFood = beforeFood;
  this.numRefills = numRefills;
  this.pharmName = pharmName;
  this.pharmPhone = pharmPhone;
  this.taking = taking;
  this.pillsLeft = 0; // this has to be this.quantity - this.dosage anytime a user clicks 'taken' within the UpNextTable.
  this.addCurrSched = addCurrSched;
  this.notes = notes;
  medications.push(this);
  // Medication.renderCurrTable(this);
};

//   //Write some code to create table on archive page
//   //remember to assign id to Medication.name
//   //Not only render/create the table but also populate it with any medication object within the medications array found in localStorage (if(localStorage.key)).  So we need to getItem and then JSON.parse the array, assign it to something, then iterate over it using a 'for' loop to populate the table.
// },
//
// Medication.createChart = function() {
//   //Need chart to display on landing to show current streak
//   //pulling also from localStorage and targeting the 'took it' or 'skipped' propery of each object, then adding 1 to the chart for each object htat has one of those selected (or deleting 1 if 'skipped')
// })();

// var schedule = {
//   // alert: write code to compare current time to schdeule time to alert for late dose
//
//   // taken: write code to add 1 to chart data for taken dose
//
//   // skipped; write code to add 1 to chart date for skipped dose
// };

//event listeners need for the following

//On landing page event listener for when you click on medication name -- should take you to addmed.html page with all fields prepopulated.

//On med.html need event listener for when you click on medication name -- should take you to addmed.html page with all fields prepopulated.

//On addmed.html need event listener for when you click save to check whether no longer taking or add to current schedule was checked so that
