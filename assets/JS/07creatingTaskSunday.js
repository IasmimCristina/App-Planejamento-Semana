//Bancos usados na aplicação.
const getBankSunday = () => JSON.parse(localStorage.getItem('taskAreaTaskSunday')) ?? [];
const setBankSunday = (bankSunday) => localStorage.setItem('taskAreaTaskSunday', JSON.stringify(bankSunday));

//Banco para a validação do conflito: não mais usado.
const getTimeTasksSunday = () => JSON.parse(localStorage.getItem('timeTasksSunday')) ?? [];
const setTimeTasksSunday = (timeTasksSunday) => localStorage.setItem('timeTasksSunday', JSON.stringify(timeTasksSunday));
//Modelo para quarta-feira.

const createTask = (time, activity, index) => {

  const task = document.createElement('div');
  task.classList.add('task-area-task');
  task.classList.add('task-area-task-wed');

  task.innerHTML = `
    <div id="container-${index}" data-index = ${index}  class="task-container-complete">
      <div class="task-wrapper">
        <div class="task-area-task-time task-area-task-time-sunday noselect">
          <span data-index= ${index} >${time}</span>
        </div>
        <div class="task-area-task-text task-area-task-text-sunday noselect">
          <p>
            ${activity}
          </p>
          <button  class="btn-delete-task"  data-index = ${index} >Apagar</button>
        </div>
      </div>
    </div>
    `

  //Adição da task no container correto.
  document.getElementById('tab-sunday').appendChild(task);

}

const cleanActivities = () => {
  const tabSunday = document.getElementById('tab-sunday');
  while (tabSunday.firstChild) {
    tabSunday.removeChild(tabSunday.lastChild);
  }
}

const updateScreen = () => {
  cleanActivities();
  const bankSunday = getBankSunday();
  bankSunday.forEach((task, index) => createTask(task.time, task.task, index));

}


//Inserir tarefa.
const insertTask = () => {
  var timeActivity = document.getElementById('task-time').value;
  var textActivity = document.getElementById('atividade').value;
  if (timeActivity == '' || textActivity == '') {
    alert('Por favor, preencha os campos necessários para adicionar uma atividade!')
  } else {
    const bankSunday = getBankSunday();
    bankSunday.push({ 'time': timeActivity, 'task': textActivity })
    setBankSunday(bankSunday);
    const timeTasksSunday = getTimeTasksSunday();
    timeTasksSunday.push(timeActivity);
    setTimeTasksSunday(timeTasksSunday);
    updateScreen();
    document.getElementById('task-time').value = '';
    document.getElementById('atividade').value = '';

  }
}


const removeTask = (index) => {
  const bankSunday = getBankSunday();
  bankSunday.splice(index, 1);
  const timeTasksSunday = getTimeTasksSunday();
  timeTasksSunday.splice(index, 1);
  setTimeTasksSunday(timeTasksSunday);
  setBankSunday(bankSunday);
  updateScreen();

}

const clickTask = (evento) => {
  const elemento = evento.target;

  if (elemento.type == "submit") {
    const index = elemento.dataset.index;
    removeTask(index);
  }
}

//Apenas rmeove os itens dentro, mas ela ainda existe.
const removeAllTasks = () => {
  const bankSunday = getBankSunday();
  bankSunday.splice(0, bankSunday.length);
  const timeTasksSunday = getTimeTasksSunday();
  timeTasksSunday.splice(0, timeTasksSunday.length);
  setBankSunday(bankSunday);
  setTimeTasksSunday(timeTasksSunday);
  updateScreen();
  document.getElementById('task-time').value = '';
  document.getElementById('atividade').value = '';
}

const removeLocalStorage = () => {
  localStorage.clear();
  updateScreen();
  alert('Todas as atividades registradas foram excluídas com sucesso.');
}

document.getElementById('btn-adicionarAtvdd').addEventListener('click', insertTask);
document.getElementById('btn-salvar-storage').addEventListener('click', insertTask);
document.getElementById('task-excluirAtvdd').addEventListener('click', removeAllTasks);
document.getElementById('btn-excluir-storage').addEventListener('click', removeLocalStorage);

document.getElementById('tab-sunday').addEventListener('click', clickTask);


updateScreen();
