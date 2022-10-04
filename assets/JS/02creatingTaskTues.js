//Bancos usados na aplicação.
const getBankTues = () => JSON.parse(localStorage.getItem('taskAreaTaskTues')) ?? [];
const setBankTues = (bankTues) => localStorage.setItem('taskAreaTaskTues', JSON.stringify(bankTues));

//Banco para a validação do conflito: não mais usado.
const getTimeTasksTues = () => JSON.parse(localStorage.getItem('timeTasksTues')) ?? [];
const setTimeTasksTues = (timeTasksTues) => localStorage.setItem('timeTasksTues', JSON.stringify(timeTasksTues));
//Modelo para terça-feira.

const createTask = (time, activity, index) => {

  const task = document.createElement('div');
  task.classList.add('task-area-task');
  task.classList.add('task-area-task-tues');

  task.innerHTML = `
    <div id="container-${index}" data-index = ${index}  class="task-container-complete">
      <div class="task-wrapper">
        <div class="task-area-task-time task-area-task-time-tues noselect">
          <span data-index= ${index} >${time}</span>
        </div>
        <div class="task-area-task-text task-area-task-text-tues noselect">
          <p>
            ${activity}
          </p>
          <button  class="btn-delete-task"  data-index = ${index} >Apagar</button>
        </div>
      </div>
    </div>
    `

  //Adição da task no container correto.
  document.getElementById('tab-tues').appendChild(task);

}

const cleanActivities = () => {
  const tabTues = document.getElementById('tab-tues');
  while (tabTues.firstChild) {
    tabTues.removeChild(tabTues.lastChild);
  }
}

const updateScreen = () => {
  cleanActivities();
  const bankTues = getBankTues();
  bankTues.forEach((task, index) => createTask(task.time, task.task, index));

}


//Inserir tarefa.
const insertTask = () => {
  var timeActivity = document.getElementById('task-time').value;
  var textActivity = document.getElementById('atividade').value;
  if (timeActivity == '' || textActivity == '') {
    alert('Por favor, preencha os campos necessários para adicionar uma atividade!')
  } else {
    const bankTues = getBankTues();
    bankTues.push({ 'time': timeActivity, 'task': textActivity })
    setBankTues(bankTues);
    const timeTasksTues = getTimeTasksTues();
    timeTasksTues.push(timeActivity);
    setTimeTasksTues(timeTasksTues);
    updateScreen();
    document.getElementById('task-time').value = '';
    document.getElementById('atividade').value = '';

  }
}


const removeTask = (index) => {
  const bankTues = getBankTues();
  bankTues.splice(index, 1);
  const timeTasksTues = getTimeTasksTues();
  timeTasks.splice(index, 1);
  setTimeTasksTues(timeTasksTues);
  setBankTueTuess(bankTues);
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
  const bankTues = getBankTues();
  bankTues.splice(0, bankTues.length);
  const timeTasksTues = getTimeTasksTues();
  timeTasksTues.splice(0, timeTasksTues.length);
  setBankTues(bankTues);
  setTimeTasksTues(timeTasksTues);
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

document.getElementById('tab-tues').addEventListener('click', clickTask);


updateScreen();
