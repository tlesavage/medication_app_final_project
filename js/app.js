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
  this.addCurrSched = addCurrSched;
  this.notes = notes;
  medications.push(this);
}

var sample = new Medication('nitro', 'lee', 1, 'mg', 30, 'Jan 1', '5 days', '6 hours', '8 pm', null, null, true, false, 9, 'Walgreens', '2063722460', true, true, 'Nothing to add all good');

//medications array needs to be put in localStorage.

(Medication.renderUpNextTable = function(){
  var tableEl = document.getElementById('upNextTable');

  for (meds in medications) {
    if (medications[meds].taking = true) {
      var trEl = document.createElement('tr');

      var medNameThEl = document.createElement('th');
      medNameThEl.textContent = medications[meds].name;
      trEl.appendChild(medNameThEl);

      var timeNextTdEl = document.createElement('td');
      timeNextTdEl.textContent = medications[meds].first;
      trEl.appendChild(timeNextTdEl);

      var dosageTdEl = document.createElement('td');
      dosageTdEl.textContent = medications[meds].dosage;
      trEl.appendChild(dosageTdEl);

      var adherenceTdEl = document.createElement('td');
      adherenceTdEl.innerHTML = '<form><input type="checkbox" name="adherence" value="took" /> "Took" <input type="checkbox" name="adherence" value="skipped"> "Skip" </form>';
      console.log(trEl);
      console.log(adherenceTdEl);
      // trEl.appendChild('adherenceTdEl');

      tableEl.appendChild(trEl);
    }
  }
  //Code to render table to landing page
  //remember to assign id to Medication.name
  //Not only render/create the table but also populate it with any medication object within the medications array found in localStorage (if(localStorage.key)).  So we need to getItem and then JSON.parse the array, assign it to something, then iterate over it using a 'for' loop to populate the table. this will only add items that have a 'true' value for 'add to current schedule' property.
},

Medication.renderCurrTable = function () {
  //Write some code to create table on medication.html
  //remember to assign id to Medication.name
  //Not only render/create the table but also populate it with any medication object within the medications array found in localStorage (if(localStorage.key)).  So we need to getItem and then JSON.parse the array, assign it to something, then iterate over it using a 'for' loop to populate the table.

},

Medication.renderArchTable = function() {
  //Write some code to create table on archive page
  //remember to assign id to Medication.name
  //Not only render/create the table but also populate it with any medication object within the medications array found in localStorage (if(localStorage.key)).  So we need to getItem and then JSON.parse the array, assign it to something, then iterate over it using a 'for' loop to populate the table.
},

Medication.createChart = function() {
  //Need chart to display on landing to show current streak
  //pulling also from localStorage and targeting the 'took it' or 'skipped' propery of each object, then adding 1 to the chart for each object htat has one of those selected (or deleting 1 if 'skipped')
})();

Medication.renderUpNextTable();

var schedule = {
  // alert: write code to compare current time to schdeule time to alert for late dose
  // taken: write code to add 1 to chart data for taken dose
  // skipped; write code to add 1 to chart date for skipped dose
};

//event listeners need for the following

//On landing page event listener for when you click on medication name -- should take you to addmed.html page with all fields prepopulated.

//On med.html need event listener for when you click on medication name -- should take you to addmed.html page with all fields prepopulated.

//On addmed.html need event listener for when you click save to check whether no longer taking or add to current schedule was checked so that we know whether to archive or add to current med list or add to UPNext on index.html.
