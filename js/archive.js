if (localStorage.drugArray) {
  medications = JSON.parse(localStorage.getItem('drugArray'));
} else {
  medications = [];
}

Medication.renderArchTable = function() {
  if(localStorage.drugArray){
    medications = JSON.parse(localStorage.getItem('drugArray'));
    console.log(medications);
    for(medication in medications) {
      if (medications[medication].taking === true) {
        var totalListTable = document.getElementById('theArchTable');
        var medRows = document.createElement('tr');
        var drugName = document.createElement('th');
        drugName.textContent = medications[medication].name;
        medRows.appendChild(drugName);
        var doseData = document.createElement('td');
        doseData.textContent = medications[medication].dosage;
        var doseTypeData = document.createElement('td');
        doseTypeData.textContent = medications[medication].doseType;
        var amountLeft = document.createElement('td');
        amountLeft.textContent = medications[medication].pillsLeft;
        medRows.appendChild(doseData);
        medRows.appendChild(doseTypeData);
        medRows.appendChild(amountLeft);
        totalListTable.appendChild(medRows);
      };
    };
  };
};

Medication.renderArchTable();
