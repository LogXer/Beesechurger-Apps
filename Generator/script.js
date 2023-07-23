document.getElementById('generate').addEventListener('click', function() {
  var min = document.getElementById('minValue').value;
  var max = document.getElementById('maxValue').value;
  var num = document.getElementById('numValues').value;
  var historyLimit = document.getElementById('historyLimit').value;
  var historyList = document.getElementById('historyList');
  
  var randomNumberContainer = document.getElementById('randomNumbersContainer');
  while(randomNumberContainer.firstChild){
    randomNumberContainer.removeChild(randomNumberContainer.firstChild);
  }
  
  for (var i = 0; i < num; i++) {
    var random = Math.floor(Math.random() * (max - min + 1)) + parseInt(min);

    var span = document.createElement('span');
    span.textContent = random;
    randomNumberContainer.appendChild(span);
    
    var li = document.createElement('li');
    li.textContent = random;
    historyList.prepend(li);

    while (historyList.children.length > historyLimit) {
      historyList.removeChild(historyList.lastChild);
    }
  }
});

document.getElementById('download').addEventListener('click', function() {
  var historyList = document.getElementById('historyList');
  
  var blob = new Blob([Array.from(historyList.children).map(li => li.textContent).join('\n')], {type: 'text/plain'});
  
  var url = URL.createObjectURL(blob);
  
  var a = document.createElement('a');
  a.href = url;
  a.download = 'history.txt';
  a.click();

    URL.revokeObjectURL(url);
});
