var totalListTable = document.getElementById('theTable');

if (localStorage.drugArray) {
  medications = JSON.parse(localStorage.getItem('drugArray'));
} else {
  medications = [];
}

Medication.renderCurrTable = function () {
  if(localStorage.drugArray){
    medications = JSON.parse(localStorage.getItem('drugArray'));
    console.log(medications);
    for(medication in medications) {
      if (medications[medication].taking === false) {
        var medRows = document.createElement('tr');
        medRows.id = medications[medication].name;
        var drugName = document.createElement('th');
        drugName.innerHTML = '<a href="addmed.html" id=' + medications[medication].name + '>' + medications[medication].name.charAt(0).toUpperCase() + medications[medication].name.slice(1) + '</a>';
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
        var deleteMed = document.createElement('td');
        var remove = document.createElement('a');
        var linkText = document.createTextNode('Remove');
        remove.id = medications[medication].name + 'remove';
        remove.appendChild(linkText);
        deleteMed.appendChild(remove);
        remove.title = 'Remove';
        remove.href = '';
        medRows.appendChild(deleteMed);
        totalListTable.appendChild(medRows);
      };
    };
  };
};

//listening for a click on the med name to view prepopulated fields
totalListTable.addEventListener('click', function(event) {
  for(obj in medications) {
    if (event.target.id === medications[obj].name) {
      var jsonDrugClicked = JSON.stringify(medications[obj]);
      localStorage.setItem('medClicked', jsonDrugClicked);
    };
  }
});

//listening for a click on the remove to remove item from the list.
totalListTable.addEventListener('click', function(event){
  for(obj in medications) {
    if(event.target.id === medications[obj].name + 'remove') {
      medications[obj].taking = true;
      var takenChanged = JSON.stringify(medications);
      localStorage.setItem('drugArray', takenChanged);
    };
  };
});
Medication.renderCurrTable();
