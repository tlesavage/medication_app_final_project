if (localStorage.drugArray) {
  medications = JSON.parse(localStorage.getItem('drugArray'));
} else {
  medications = [];
}

var formEl = document.getElementById('medForm');
formEl.addEventListener('submit', function(event) {
  event.preventDefault();
  var newName = event.target.medName.value.charAt(0).toUpperCase() + event.target.medName.value.slice(1).toLowerCase();
  var newPrescriber = event.target.docName.value;
  var newDosage = event.target.dose.value;
  var newDoseType = event.target.dosageType.value;
  var newQuantity = event.target.quantity.value;
  var newStart = event.target.startDate.value;
  var newDuration = event.target.duration.value;
  var newIntervals = event.target.intervalTake.value;
  var newFirst = event.target.firstTake.value;
  var newFood = event.target.food.value;
  var newNumRefills = event.target.numRefills.value;
  var newPharmName = event.target.pharmName.value;
  var newPharmPhone = event.target.pharmNumber.value;
  var newTaking = event.target.noLongerTaking.checked;
  var newAddCurrSched = event.target.addSched.checked;
  var newNotes = event.target.medNotes.value;
  var newDrug = new Medication(newName, newPrescriber, newDosage, newDoseType, newQuantity, newStart, newDuration, newIntervals, newFirst, newFood, newNumRefills, newPharmName, newPharmPhone, newTaking, newAddCurrSched, newNotes);
  formEl.reset();

  if(localStorage.todaysMedsStored) {
    if(newDrug.taking === false) {
      var todaysMeds = JSON.parse(localStorage.getItem('todaysMedsStored'));
      console.log(todaysMeds);
      todaysMeds.push(newDrug);
      localStorage.setItem('todaysMedsStored', JSON.stringify(todaysMeds));
    }
  }

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
    quantity.value = drugNameClicked.quantity;
    startDate.value = drugNameClicked.start;
    duration.value = drugNameClicked.duration;
    intervalTake.value = drugNameClicked.intervals;
    firstTake.value = drugNameClicked.first;
    foodInstructions.value = drugNameClicked.food;
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
