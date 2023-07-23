document.getElementById('generate').addEventListener('click', function() {
  var min = document.getElementById('minValue').value;
  var max = document.getElementById('maxValue').value;
  var num = document.getElementById('numValues').value;
  var historyLimit = document.getElementById('historyLimit').value;
  var historyList = document.getElementById('historyList');
  
  // Clear previous random number(s)
  var randomNumberContainer = document.getElementById('randomNumbersContainer');
  while(randomNumberContainer.firstChild){
    randomNumberContainer.removeChild(randomNumberContainer.firstChild);
  }
  
  for (var i = 0; i < num; i++) {
    var random = Math.floor(Math.random() * (max - min + 1)) + parseInt(min);

    // Display the random number
    var span = document.createElement('span');
    span.textContent = random;
    randomNumberContainer.appendChild(span);
    
    // Add the random number to history
    var li = document.createElement('li');
    li.textContent = random;
    historyList.prepend(li);

    // Check if history list has more than historyLimit items
    while (historyList.children.length > historyLimit) {
      // If it does, remove the last item
      historyList.removeChild(historyList.lastChild);
    }
  }
});

document.getElementById('download').addEventListener('click', function() {
  var historyList = document.getElementById('historyList');
  
  // Create a new Blob with the history list's text
  var blob = new Blob([Array.from(historyList.children).map(li => li.textContent).join('\n')], {type: 'text/plain'});
  
  // Create a new object URL for the Blob
  var url = URL.createObjectURL(blob);
  
  // Create a new anchor element and simulate a click to download the file
  var a = document.createElement('a');
  a.href = url;
  a.download = 'history.txt';
  a.click();
  
  // Revoke the object URL to free up memory
  URL.revokeObjectURL(url);
});
