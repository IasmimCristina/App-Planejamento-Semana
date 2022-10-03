//Bancos usados na aplicação.
const getBankFriday = () => JSON.parse(localStorage.getItem('taskAreaTaskFriday')) ?? [];
const setBankFriday = (bankFriday) => localStorage.setItem('taskAreaTaskFriday', JSON.stringify(bankFriday));

//Banco para a validação do conflito: não mais usado.
const getTimeTasksFriday = () => JSON.parse(localStorage.getItem('timeTasksFriday')) ?? [];
const setTimeTasksFriday = (timeTasksFriday) => localStorage.setItem('timeTasksFriday', JSON.stringify(timeTasksFriday));
//Modelo para quarta-feira.

const createTask = (time, activity, index) => {

  const task = document.createElement('div');
  task.classList.add('task-area-task');
  task.classList.add('task-area-task-wed');

  task.innerHTML = `
    <div id="container-${index}" data-index = ${index}  class="task-container-complete">
      <div class="task-wrapper">
        <div class="task-area-task-time task-area-task-time-friday noselect">
          <span data-index= ${index} >${time}</span>
        </div>
        <div class="task-area-task-text task-area-task-text-friday noselect">
          <p>
            ${activity}
          </p>
          <button  class="btn-delete-task"  data-index = ${index} >Apagar</button>
        </div>
      </div>
    </div>
    `

  //Adição da task no container correto.
  document.getElementById('tab-friday').appendChild(task);

}

const cleanActivities = () => {
  const tabFriday = document.getElementById('tab-friday');
  while (tabFriday.firstChild) {
    tabFriday.removeChild(tabFriday.lastChild);
  }
}

const updateScreen = () => {
  cleanActivities();
  const bankFriday = getBankFriday();
  bankFriday.forEach((task, index) => createTask(task.time, task.task, index));

}


//Inserir tarefa.
const insertTask = () => {
  var timeActivity = document.getElementById('task-time').value;
  var textActivity = document.getElementById('atividade').value;
  if (timeActivity == '' || textActivity == '') {
    alert('Por favor, preencha os campos necessários para adicionar uma atividade!')
  } else {
    const bankFriday = getBankFriday();
    bankFriday.push({ 'time': timeActivity, 'task': textActivity })
    setBankFriday(bankFriday);
    const timeTasksFriday = getTimeTasksFriday();
    timeTasksFriday.push(timeActivity);
    setTimeTasksFriday(timeTasksFriday);
    updateScreen();
    document.getElementById('task-time').value = '';
    document.getElementById('atividade').value = '';

  }
}


const removeTask = (index) => {
  const bankFriday = getBankFriday();
  bankFriday.splice(index, 1);
  const timeTasksFriday = getTimeTasksFriday();
  timeTasksFriday.splice(index, 1);
  setTimeTasksFriday(timeTasksFriday);
  setBankFriday(bankFriday);
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
  const bankFriday = getBankFriday();
  bankFriday.splice(0, bankFriday.length);
  const timeTasksFriday = getTimeTasksFriday();
  timeTasksFriday.splice(0, timeTasksFriday.length);
  setBankFriday(bankFriday);
  setTimeTasksFriday(timeTasksFriday);
  updateScreen();
  document.getElementById('task-time').value = '';
  document.getElementById('atividade').value = '';
}

const removeLocalStorage = () => {
  localStorage.clear();
  updateScreen();
}

document.getElementById('btn-adicionarAtvdd').addEventListener('click', insertTask);
document.getElementById('btn-salvar-storage').addEventListener('click', insertTask);
document.getElementById('task-excluirAtvdd').addEventListener('click', removeAllTasks);
document.getElementById('btn-excluir-storage').addEventListener('click', removeLocalStorage);

document.getElementById('tab-friday').addEventListener('click', clickTask);


updateScreen();
