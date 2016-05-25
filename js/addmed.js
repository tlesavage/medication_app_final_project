var medications = [];

if (localStorage.drugArray) {
  medications = JSON.parse(localStorage.getItem('drugArray'));
} else {
  medications = [];
}

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

var formEl = document.getElementById('medForm');
formEl.addEventListener('submit', function(event) {
  event.preventDefault();
  var newName = event.target.medName.value;
  var newPrescriber = event.target.docName.value;
  var newDosage = event.target.dose.value;
  var newDoseType = event.target.dosageType.value;
  var newQuantity = parseInt(event.target.numRx.value);
  var newStart = event.target.startDate.value;
  var newDuration = event.target.duration.value;
  var newIntervals = event.target.duration.value;
  var newFirst = event.target.firstTake.value;
  var newSecond = event.target.secondTake.value;
  var newThird = event.target.thirdTake.value;
  var newWithFood = event.target.withFood.checked;
  var newBeforeFood = event.target.beforeFood.checked;
  var newNumRefills = event.target.numRefills.value;
  var newPharmName = event.target.pharmName.value;
  var newPharmPhone = event.target.pharmNumber.value;
  var newTaking = event.target.noLongerTaking.checked;
  var newAddCurrSched = event.target.addSched.checked;
  var newNotes = event.target.medNotes.value;
  var newDrug = new Medication(newName, newPrescriber, newDosage, newDoseType, newQuantity, newStart, newDuration, newIntervals, newFirst, newSecond, newThird, newWithFood, newBeforeFood, newNumRefills, newPharmName, newPharmPhone, newTaking, newAddCurrSched, newNotes);
  formEl.reset();
  var jsonMed = JSON.stringify(medications);
  console.log(jsonMed);
  localStorage.setItem('drugArray', jsonMed);
});

Medication.renderEditFields = function () {
  if(localStorage.drugArray && localStorage.medClicked) {
    drugNameClicked = JSON.parse(localStorage.getItem('medClicked'));
    medName.value = drugNameClicked.name;
    docName.value = drugNameClicked.prescriber;
    dose.value = drugNameClicked.dosage;
    dosageType.value = drugNameClicked.doseType;
    numRx.value = drugNameClicked.numRefills;
    startDate.value = drugNameClicked.startDate;
    duration.value = drugNameClicked.duration;
    intervalTake.value = drugNameClicked.intervals;
    firstTake.value = drugNameClicked.first;
    secondTake.value = drugNameClicked.second;
    thirdTake.value = drugNameClicked.third;
    withFood.checked = drugNameClicked.withFood;
    beforeFood.checked = drugNameClicked.beforeFood;
    numRefills.value = drugNameClicked.numRefills;
    pharmName.value = drugNameClicked.pharmName;
    pharmNumber.value = drugNameClicked.pharmPhone;
    noLongerTaking.checked = drugNameClicked.taking;
    addSched.checked = drugNameClicked.addCurrSched;
    medNotes.value = drugNameClicked.notes;
    localStorage.removeItem('medClicked');
  }
};

Medication.renderEditFields();
