//Bancos usados na aplicação.
const getBank = () => JSON.parse(localStorage.getItem('taskAreaTaskMonday')) ?? [];
const setBank = (bank) => localStorage.setItem('taskAreaTaskMonday', JSON.stringify(bank));

//Banco para a vlaidação do conflito: não mais usado.
const getTimeTasks = () => JSON.parse(localStorage.getItem('timeTasks')) ?? [];
const setTimeTasks = (timeTasks) => localStorage.setItem('timeTasks', JSON.stringify(timeTasks));
//Modelo para segunda-feira.

const createTask = (time, activity, index) => {

  const task = document.createElement('div');
  task.classList.add('task-area-task');
  task.classList.add('task-area-task-monday');

  task.innerHTML = `
    <div id="container-${index}" data-index = ${index}  class="task-container-complete">
      <div class="task-wrapper">
        <div class="task-area-task-time task-area-task-time-monday noselect">
          <span data-index= ${index} >${time}</span>
        </div>
        <div class="task-area-task-text task-area-task-text-monday noselect">
          <p>
            ${activity}
          </p>
          <button  class="btn-delete-task"  data-index = ${index} >Apagar</button>
        </div>
      </div>
    </div>
    `

  //Adição da task no container correto.
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

}


//Inserir tarefa.
const insertTask = () => {
  var timeActivity = document.getElementById('task-time').value;
  var textActivity = document.getElementById('atividade').value;
  if (timeActivity == '' || textActivity == '') {
    alert('Por favor, preencha os campos necessários para adicionar uma atividade!')
  } else {
    const bank = getBank();
    bank.push({ 'time': timeActivity, 'task': textActivity })
    setBank(bank);
    const timeTasks = getTimeTasks();
    timeTasks.push(timeActivity);
    setTimeTasks(timeTasks);
    updateScreen();
    document.getElementById('task-time').value = '';
    document.getElementById('atividade').value = '';

  }
}


const removeTask = (index) => {
  const bank = getBank();
  bank.splice(index, 1);
  const timeTasks = getTimeTasks();
  timeTasks.splice(index, 1);
  setTimeTasks(timeTasks);
  setBank(bank);
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
  const bank = getBank();
  bank.splice(0, bank.length);
  const timeTasks = getTimeTasks();
  timeTasks.splice(0, timeTasks.length);
  setBank(bank);
  setTimeTasks(timeTasks);
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

document.getElementById('tab-monday').addEventListener('click', clickTask);


updateScreen();
