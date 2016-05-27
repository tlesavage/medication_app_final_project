var date = new Date();
var medications = [];
var todaysMeds = [];

var quantityTaken = 0;
var quantitySkipped = 0;

var tableEl = document.getElementById('upNextTable');

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

Medication.renderUpNextTable = function() {
  document.getElementById('noMedMessage').hidden = true;
  tableEl.hidden = false;

  for (meds in todaysMeds) {
    var trEl = document.createElement('tr');
    trEl.id = todaysMeds[meds].name + 'Alert';

    var medNameThEl = document.createElement('th');
    medNameThEl.innerHTML = '<a href="addmed.html" id=' + todaysMeds[meds].name + '>' + todaysMeds[meds].name + '</a>';
    trEl.appendChild(medNameThEl);

    var timeNextTdEl = document.createElement('td');
    timeNextTdEl.textContent = todaysMeds[meds].first;
    trEl.appendChild(timeNextTdEl);

    var dosageTdEl = document.createElement('td');
    dosageTdEl.textContent = todaysMeds[meds].dosage + ' ' + todaysMeds[meds].doseType;
    trEl.appendChild(dosageTdEl);

    var adherenceTdEl = document.createElement('td');
    adherenceTdEl.innerHTML = '<form id="' + todaysMeds[meds].name + 'Adhere' + '"><input type="radio" name="adherence" value="took" /> Took <input type="radio" name="adherence" value="skipped"> Skip </form>';
    trEl.appendChild(adherenceTdEl);

    tableEl.appendChild(trEl);
  }
};

var schedule = {
  data: {
    labels: ['Taken', 'Skipped'],
    datasets: [{
      label: 'Taken vs Skipped',
      backgrounColor: '#00c52c',
      data: quantityTaken
    },
      // {
      //   label: 'Skipped',
      //   fillColor: '#9f2c0c',
      //   data: quantitySkipped
      ]
  },

  alertMed: function() {
    var currentTime = [date.getHours(), date.getMinutes()];
    for (obj in todaysMeds) {
      var medTime = [parseInt(todaysMeds[obj].first.substring(0,2)), parseInt(todaysMeds[obj].first.substring(3))];
      if (currentTime[0] > medTime[0]) {
        var alertRow = document.getElementById(todaysMeds[obj].name + 'Alert');
        alertRow.className = 'alert';
        alert('You have missed your scheduled dose of ' + todaysMeds[obj].name + '!');
      } else if (currentTime[0] === medTime[0]) {
        if (currentTime[1] > medTime[1]) {
          var alertRow = document.getElementById(todaysMeds[obj].name + 'Alert');
          alertRow.className = 'alert';
          alert('You have missed your scheduled dose of ' + todaysMeds[obj].name + '!');
        }
      }
    }
  },

  clickMedName: function() {
    var jsonDrugClicked = JSON.stringify(todaysMeds[obj]);
    localStorage.setItem('medClicked', jsonDrugClicked);
  },

  tookEvent: function(element, todayArr, idx, medArr) {
    var removeTr = element.parentNode.parentNode.parentNode;
    tableEl.removeChild(removeTr);

    for(item in medArr) {
      if (todayArr[idx] === medArr[item]) {
        console.log(medArr[item].pillsLeft + ' old');
        medArr[item].pillsLeft = todayArr[idx].pillsLeft - todayArr[idx].dosage;
        console.log(medArr[item].pillsLeft + ' new');
      }
    }
    if(todayArr[idx] === todayArr[0]) {
      todayArr.shift();
    } else {
      todayArr.splice(idx, idx); //DOESNT WANT TO REMOVE OBJECT AT INDEX 0 HALLLLP // SOMETIMES TWO OBJECTS ARE DELETED
    }
    localStorage.setItem('todaysMedsStored', JSON.stringify(todayArr));
    localStorage.setItem('drugArray', JSON.stringify(medArr));
  },

  skipEvent: function(element) {
    var removeTr = element.parentNode.parentNode.parentNode;
    tableEl.removeChild(removeTr);

    if(todaysMeds[obj] === todaysMeds[0]) {
      todaysMeds.shift();
    } else {
      todaysMeds.splice(obj, obj);
    }

    localStorage.setItem('todaysMedsStored', JSON.stringify(todaysMeds));
  },

  renderRefills: function() {
    var refMsg = document.getElementById('refills');
    for(obj in medications) {
      if(medications[obj].taking === false && medications[obj].pillsLeft < 10) {
        var noRefPEl = document.getElementById('noRefills');
        noRefPEl.hidden = true;

        var userMessageRefills = document.createElement('p');
        console.log('created the p');
        userMessageRefills.textContent = 'You need to refill ' + medications[obj].name + ' in the next ' + medications[obj].quantity + ' days.';
        refMsg.appendChild(userMessageRefills);
      }
    }
  },

  displayChart: function() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: this.data,
    });
  }
};

if (localStorage.drugArray) {
  medications = JSON.parse(localStorage.getItem('drugArray'));

  if (localStorage.storedDate) {
    var lastLoginDate = JSON.parse(localStorage.getItem('storedDate'));
    var currentDate = [date.getMonth(), date.getDate()];
    if (!(currentDate[0] === lastLoginDate[0]) || !(currentDate[1] === lastLoginDate[1])) {
      for (meds in medications) {
        if (medications[meds].taking === false) {
          todaysMeds.push(medications[meds]);
          var jsonTodayMeds = JSON.stringify(todaysMeds);
          localStorage.setItem('todaysMedsStored', jsonTodayMeds);
        }
      }
    } else {
      var todaysMeds = JSON.parse(localStorage.getItem('todaysMedsStored'));
    }
  } else {
    for (meds in medications) {
      if (medications[meds].taking === false) {
        todaysMeds.push(medications[meds]);
      }
    }
    var jsonTodayMeds = JSON.stringify(todaysMeds);
    localStorage.setItem('todaysMedsStored', jsonTodayMeds);

    var currentDate = [date.getMonth(), date.getDate()];
    localStorage.setItem('storedDate', JSON.stringify(currentDate));
  }

  Medication.renderUpNextTable();
  schedule.alertMed();
  schedule.renderRefills();
}

tableEl.addEventListener('click', function(event) {
  for(obj in todaysMeds) {
    if (event.target.id === todaysMeds[obj].name) {
      schedule.clickMedName();
    } else if (event.target.value === 'took' && event.target.parentNode.parentNode.parentNode.id === todaysMeds[obj].name + 'Alert') {
      schedule.tookEvent(event.target, todaysMeds, obj, medications);
    } else if (event.target.value === 'skipped' && event.target.parentNode.parentNode.parentNode.id === todaysMeds[obj].name + 'Alert') {
      schedule.skipEvent(event.target);
    }
  }
});

// schedule.displayChart();
