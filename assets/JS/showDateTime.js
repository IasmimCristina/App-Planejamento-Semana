//Constantes:
const currentDate = document.getElementById('current-date');
const currentTime = document.getElementById('current-time');

//Funções:
const tempo = setInterval(function time() {

  let date = new Date();

  let horas = date.getHours();
  let minutos = date.getMinutes();

  //Adição do 0 à esquerda.
  if (horas < 10) horas = '0' + horas;
  if (minutos< 10) minutos = '0' + minutos;

  let tempo = horas + ":" + minutos;
  currentTime.textContent = tempo;
})

const dataExtenso = setInterval(function time() {
  //Arrays com os valores necessários.
  let meses = new Array("Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro");

  // Data sendo pêga. 
  let date = new Date();

  let dataNumero = date.getDate();
  let dataMes = date.getMonth();
  let dataAno = date.getFullYear();

  //Modelo da data escrita.
  let dataExtenso = dataNumero + " de " + meses[dataMes] + " de " + dataAno;

  //Data sendo escrita.
  currentDate.textContent = dataExtenso;

})





