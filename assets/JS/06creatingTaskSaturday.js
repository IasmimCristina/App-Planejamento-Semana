//Bancos usados na aplicação.
const getBankSaturday = () => JSON.parse(localStorage.getItem('taskAreaTaskSaturday')) ?? [];
const setBankSaturday = (bankSaturday) => localStorage.setItem('taskAreaTaskSaturday', JSON.stringify(bankSaturday));

//Banco para a validação do conflito: não mais usado.
const getTimeTasksSaturday = () => JSON.parse(localStorage.getItem('timeTasksSaturday')) ?? [];
const setTimeTasksSaturday = (timeTasksSaturday) => localStorage.setItem('timeTasksSaturday', JSON.stringify(timeTasksSaturday));
//Modelo para quarta-feira.

const createTask = (time, activity, index) => {

  const task = document.createElement('div');
  task.classList.add('task-area-task');
  task.classList.add('task-area-task-wed');

  task.innerHTML = `
    <div id="container-${index}" data-index = ${index}  class="task-container-complete">
      <div class="task-wrapper">
        <div class="task-area-task-time task-area-task-time-saturday noselect">
          <span data-index= ${index} >${time}</span>
        </div>
        <div class="task-area-task-text task-area-task-text-saturday noselect">
          <p>
            ${activity}
          </p>
          <button  class="btn-delete-task"  data-index = ${index} >Apagar</button>
        </div>
      </div>
    </div>
    `

  //Adição da task no container correto.
  document.getElementById('tab-saturday').appendChild(task);

}

const cleanActivities = () => {
  const tabSaturday = document.getElementById('tab-saturday');
  while (tabSaturday.firstChild) {
    tabSaturday.removeChild(tabSaturday.lastChild);
  }
}

const updateScreen = () => {
  cleanActivities();
  const bankSaturday = getBankSaturday();
  bankSaturday.forEach((task, index) => createTask(task.time, task.task, index));

}


//Inserir tarefa.
const insertTask = () => {
  var timeActivity = document.getElementById('task-time').value;
  var textActivity = document.getElementById('atividade').value;
  if (timeActivity == '' || textActivity == '') {
    alert('Por favor, preencha os campos necessários para adicionar uma atividade!')
  } else {
    const bankSaturday = getBankSaturday();
    bankSaturday.push({ 'time': timeActivity, 'task': textActivity })
    setBankSaturday(bankSaturday);
    const timeTasksSaturday = getTimeTasksSaturday();
    timeTasksSaturday.push(timeActivity);
    setTimeTasksSaturday(timeTasksSaturday);
    updateScreen();
    document.getElementById('task-time').value = '';
    document.getElementById('atividade').value = '';

  }
}


const removeTask = (index) => {
  const bankSaturday = getBankSaturday();
  bankSaturday.splice(index, 1);
  const timeTasksSaturday = getTimeTasksSaturday();
  timeTasksSaturday.splice(index, 1);
  setTimeTasksSaturday(timeTasksSaturday);
  setBankSaturday(bankSaturday);
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
  const bankSaturday = getBankSaturday();
  bankSaturday.splice(0, bankSaturday.length);
  const timeTasksSaturday = getTimeTasksSaturday();
  timeTasksSaturday.splice(0, timeTasksSaturday.length);
  setBankSaturday(bankSaturday);
  setTimeTasksSaturday(timeTasksSaturday);
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

document.getElementById('tab-saturday').addEventListener('click', clickTask);


updateScreen();
