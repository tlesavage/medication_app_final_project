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

if (localStorage.drugArray) {
  medications = JSON.parse(localStorage.getItem('drugArray'));

  Medication.renderUpNextTable = function() {
  //Also at this time the page will be displaying all current medications in no particular order
  //Need to arrange medications array by time time to take somehow.
    document.getElementById('noMedMessage').hidden = true;
    var tableEl = document.getElementById('upNextTable');
    tableEl.hidden = false;

    for (meds in medications) {
      if (medications[meds].taking === true) {
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
  };
};

Medication.renderUpNextTable();
