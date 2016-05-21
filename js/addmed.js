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

//this is going to happen on the addMed page and will check for both the click item and the medications array in LS.  if both exist, then it will compare them (using similar for loop as we did in the voting) and then target fieldID.value = object.value.  then, once that is done, it will delete the click item from LS.
Medication.renderEditFields = function () {
  if(localStorage.drugArray && localStorage.clickStored) {
    medications = JSON.parse(localStorage.getItem('drugArray'));
    drugNameClicked = JSON.parse(localStorage.getItem('clickStored'));
    for(var j = 0; j < medications.length; j++) {
      medications[j].name = drugNameClicked;
    }
    var editEl = document.getElementById(medForm);
    medName.value =
    docName.value;
    dose.value;
    dosageType.value;
    numRx.value;
    startDate.value;
    duration.value;
    duration.value;
    firstTake.value;
    secondTake.value;
    thirdTake.value;
    withFood.checked;
    beforeFood.checked;
    numRefills.value;
    pharmName.value;
    pharmNumber.value;
    noLongerTaking.checked;
    addSched.checked;
    medNotes.value;

  }

//On addmed.html need event listener for when you click save to check whether no longer taking or add to current schedule was checked
