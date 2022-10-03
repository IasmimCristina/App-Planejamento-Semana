
//Funcionamento do dropdown dos dias de semana.
var dropdownContent = document.getElementById('days-of-the-week');
var dropdownBtn = document.getElementById('day-of-the-week');

dropdownBtn.addEventListener('click', function () {
  dropdownContent.classList.toggle('show');  
})

