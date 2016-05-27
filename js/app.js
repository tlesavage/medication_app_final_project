var medications = [];

function Medication (name, prescriber, dosage, doseType, quantity, start, duration, intervals, first, food, numRefills, pharmName, pharmPhone, taking, addCurrSched, notes) {
  this.name = name;
  this.prescriber = prescriber;
  this.dosage = dosage;
  this.doseType = doseType;
  this.quantity = quantity;
  this.start = start;
  this.duration = duration;
  this.intervals = intervals;
  this.first = first;
  this.food = food;
  this.numRefills = numRefills;
  this.pharmName = pharmName;
  this.pharmPhone = pharmPhone;
  this.taking = taking;
  this.pillsLeft = quantity;
  this.addCurrSched = addCurrSched;
  this.notes = notes;
  medications.push(this);
};
