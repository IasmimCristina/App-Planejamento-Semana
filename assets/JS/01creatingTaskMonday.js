/* <div class="task-area-task task-area-task-monday">
  <div class="task-wrapper">
    <div class="task-area-task-time task-area-task-time-monday noselect">
      <span>10h30m</span>
    </div>
    <div class="task-area-task-text task-area-task-text-monday noselect">
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore
        illum dolorem
        modi
        iusto quidem corporis minima harum suscipit maxime temporibus
        reprehenderit illo
        eum,
        laudantium perspiciatis dolore. Numquam officia aperiam iste!
      </p>
      <button class="btn-delete-task">Apagar</button>
    </div>
  </div>
</div> */


// let bank = [

//   { 'time': '11h00m', 'task': 'Estudar html' },
//   { 'time': '11h30m', 'task': 'Estudar html e termina ro projeto' },
//   { 'time': '12h00m', 'task': 'Fazer exercicos html' },
//   { 'time': '12h00m', 'task': 'Fazer exercicos css' },
//   { 'time': '12h00m', 'task': 'Fazer exercicos html' },
//   { 'time': '12h00m', 'task': 'Fazer exercicos JS' }

// ];

const getBank = () => JSON.parse(localStorage.getItem('taskAreaTask')) ?? [];
const setBank = (bank) => localStorage.setItem('taskAreaTask', JSON.stringify(bank));

//Modelo para segunda-feira.
//Talvez essa função possa ter atributos
//Algo com o dataset dos buttons.

const validatingTaskTime = () => {
  const bank = getBank();
  bank.forEach(time => console.log(time))
}

const createTask = (time, activity, index) => {
  const task = document.createElement('div');
  task.classList.add('task-area-task');
  task.classList.add('task-area-task-monday');
  //Um if aqui com duas opções de inner.
  task.innerHTML = `
  <div class="task-wrapper">
    <div class="task-area-task-time task-area-task-time-monday noselect">
      <span>${time}</span>
    </div>
    <div class="task-area-task-text task-area-task-text-monday noselect">
      <p>
        ${activity}
      </p>
      <button  class="btn-delete-task"  data-index = ${index} >Apagar</button>
    </div>
  </div>  
  `
  document.getElementById('tab-monday').appendChild(task);
}

const cleanActivities = () => {
  const tabMonday = document.getElementById('tab-monday');
  while (tabMonday.firstChild) {
    tabMonday.removeChild(tabMonday.lastChild);
  }
}

const updateScreen = () => {
  cleanActivities();
  const bank = getBank();
  bank.forEach((task, index) => createTask(task.time, task.task, index));
  // createTask('1010', 'tarefaaaaaaaa');
}


//atividade task-time
const insertTask = () => {
  var timeActivity = document.getElementById('task-time').value;
  var textActivity = document.getElementById('atividade').value;
  if (timeActivity == '' || textActivity == '') {
    alert('Por favor, preencha os campos necessários para adicionar uma atividade!')
  } else {
    const bank = getBank();
    bank.push({ 'time': timeActivity, 'task': textActivity })
    setBank(bank);
    updateScreen();
    document.getElementById('task-time').value = '';
    document.getElementById('atividade').value = '';

  }
}


const removeTask = (index) => {
  const bank = getBank();
  bank.splice(index, 1);
  setBank(bank);  
  updateScreen();

}

const clickTask = (evento) => {
  const elemento = evento.target;
  // const elementoTexto = elemento.type;
  // console.log(elementoTexto);
  if (elemento.type == "submit") {
    const index = elemento.dataset.index;
    // console.log(index);
    removeTask(index);
  }
}


document.getElementById('btn-adicionarAtvdd').addEventListener('click', insertTask);
document.getElementById('tab-monday').addEventListener('click', clickTask);

//task-area-main-monday

updateScreen();
