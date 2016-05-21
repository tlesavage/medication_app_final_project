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
  this.taking = taking; //this is the property whose value we'll verify when determining if something is active or inactive.  clicking 'remove' on the med list is the same as clicking 'no longer taking' within the med details page.  selecting either one of those needs to set this value to 'false' (since 'true' means that the med is acive and being taken by the user).  then when we pull to populate the archive table, we just pull only meds whose this.taking = false.
  this.pillsLeft = 0; // this has to be this.quantity - this.dosage anytime a user clicks 'taken' within the UpNextTable.
  this.refillsLeft = 0; //this has to be numRefills - 1 every time pillsLeft === 0
  this.addCurrSched = addCurrSched;
  this.notes = notes;
  medications.push(this);
  // Medication.renderCurrTable(this);
}

var formEl = document.getElementById('medForm');
// formEl.addEventListener('submit', function(event) {
//   event.preventDefault();
//   var newName = event.target.medName.value;
//   var newPrescriber = event.target.docName.value;
//   var newDosage = event.target.dose.value;
//   var newDoseType = event.target.dosageType.value;
//   var newQuantity = parseInt(event.target.numRx.value);
//   var newStart = event.target.startDate.value;
//   var newDuration = event.target.duration.value;
//   var newIntervals = event.target.duration.value;
//   var newFirst = event.target.firstTake.value;
//   var newSecond = event.target.secondTake.value;
//   var newThird = event.target.thirdTake.value;
//   var newWithFood = event.target.withFood.checked;
//   var newBeforeFood = event.target.beforeFood.checked;
//   var newNumRefills = event.target.numRefills.value;
//   var newPharmName = event.target.pharmName.value;
//   var newPharmPhone = event.target.pharmNumber.value;
//   var newTaking = event.target.noLongerTaking.checked;
//   var newAddCurrSched = event.target.addSched.checked;
//   var newNotes = event.target.medNotes.value;
//   var newDrug = new Medication(newName, newPrescriber, newDosage, newDoseType, newQuantity, newStart, newDuration, newIntervals, newFirst, newSecond, newThird, newWithFood, newBeforeFood, newNumRefills, newPharmName, newPharmPhone, newTaking, newAddCurrSched, newNotes);
//   formEl.reset();
//   var jsonMed = JSON.stringify(medications);
//   console.log(jsonMed);
//   localStorage.setItem('drugArray', jsonMed);
// });

(Medication.renderUpNextTable = function() {
  //Not only render/create the table but also populate it with any medication object within the medications array found in localStorage (if(localStorage.key)).  So we need to getItem and then JSON.parse the array, assign it to something, then iterate over it using a 'for' loop to populate the table. this will only add items that have a 'true' value for 'add to current schedule' property.
  //Here we should be checking whether there is anything in localStorage array. So this if statement will need to change.
  //Also at this time the page will be displaying all current medications in no particular order
  //Need to arrange medications array by time time to take somehow.
  if (localStorage.drugArray) {
    medications = JSON.parse(localStorage.getItem('drugArray'));
    document.getElementById('noMedMessage').hidden = true;
    var tableEl = document.getElementById('upNextTable');
    tableEl.hidden = false;

    for (meds in medications) {
      if (medications[meds].taking = true) {
        var trEl = document.createElement('tr');

        var medNameThEl = document.createElement('th');
        medNameThEl.innerHTML = '<a href="addmed.html" id=' + medications[meds].name + '>' + medications[meds].name.charAt(0).toUpperCase() + medications[meds].name.slice(1) + '</a>';
        trEl.appendChild(medNameThEl);

        var timeNextTdEl = document.createElement('td');
        timeNextTdEl.textContent = medications[meds].first;
        trEl.appendChild(timeNextTdEl);

        var dosageTdEl = document.createElement('td');
        dosageTdEl.textContent = medications[meds].dosage;
        trEl.appendChild(dosageTdEl);

        var adherenceTdEl = document.createElement('td');
        adherenceTdEl.innerHTML = '<form><input type="radio" name="adherence" value="took" /> Took <input type="radio" name="adherence" value="skipped"> Skip </form>';
        trEl.appendChild(adherenceTdEl);

        tableEl.appendChild(trEl);
      }
    }
  }
})();

// Medication.renderCurrTable = function () {
//   if(localStorage.xxxx){
//     var medRows = document.createElement('tr');
//     var drugName = document.createElement('th');
//     drugName.textContent = medication.name;
//     drugName.setAttribute('id', medication.name);
//     medRows.appendChild(drugName);
//     for(medication in medications) {
//       if (medications[medication].taking === true) {
//         var doseData = medications[medication].dosage; //not sure if this is right...trying to pinpoint a specific property of an object within the medications array.
//         var doseTypeData = medications[medication].doseType;
//         // var amtLeftData = medications.Medication. //this is going to require some math and calling from the event listener.  i have to take the medication.quantity and subtract one for each time they've said they took the medication, then i can call that and assign it to this variable.
//         // var numRefillsData = medications[medication]. // this is going to have to have more math too...because i need to take the total number of refills initially provided, then know how many times the user has depleted the total number of pills (so if they were given 30, how many times did 30 = 0, then once that hits 0, subtract one from the total number of refills.)
//         medRows.appendChild(doseData);
//         medRows.appendChild(doseTypeData);
//         medRows.appendChild(amtLeftData);
//         medRows.appendChild(numRefillsData);
//       }
//       var remove = document.createElement('a');
//       var linkText = document.createTextNode("Remove");
//       a.appendChild(linkText);
//       a.title = "Remove";
//       a.href = ""; // this needs to be more functions removing the element and putting it in the archive table...so i need to see how to remove the row, but then i'll call whatever 'add to archive table' method we have.
//       medRows.appendChild(a);
//   };
//   };
//   //Write some code to create table on medication.html
//   //remember to assign id to Medication.name
//   //Not only render/create the table but also populate it with any medication object within the medications array found in localStorage (if(localStorage.key)).  So we need to getItem and then JSON.parse the array, assign it to something, then iterate over it using a 'for' loop to populate the table.
//
// },
//
// Medication.renderArchTable = function() {
//   //Write some code to create table on archive page
//   //remember to assign id to Medication.name
//   //Not only render/create the table but also populate it with any medication object within the medications array found in localStorage (if(localStorage.key)).  So we need to getItem and then JSON.parse the array, assign it to something, then iterate over it using a 'for' loop to populate the table.
// },
//
// Medication.createChart = function() {
//   //Need chart to display on landing to show current streak
//   //pulling also from localStorage and targeting the 'took it' or 'skipped' propery of each object, then adding 1 to the chart for each object htat has one of those selected (or deleting 1 if 'skipped')
// })();

// Medication.renderUpNextTable();

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
