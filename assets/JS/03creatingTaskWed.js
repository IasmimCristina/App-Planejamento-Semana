//Bancos usados na aplicação.
const getBankWed = () => JSON.parse(localStorage.getItem('taskAreaTaskWed')) ?? [];
const setBankWed = (bankWed) => localStorage.setItem('taskAreaTaskWed', JSON.stringify(bankWed));

//Banco para a validação do conflito: não mais usado.
const getTimeTasksWed = () => JSON.parse(localStorage.getItem('timeTasksWed')) ?? [];
const setTimeTasksWed = (timeTasksWed) => localStorage.setItem('timeTasksWed', JSON.stringify(timeTasksWed));
//Modelo para quarta-feira.

const createTask = (time, activity, index) => {

  const task = document.createElement('div');
  task.classList.add('task-area-task');
  task.classList.add('task-area-task-wed');

  task.innerHTML = `
    <div id="container-${index}" data-index = ${index}  class="task-container-complete">
      <div class="task-wrapper">
        <div class="task-area-task-time task-area-task-time-wed noselect">
          <span data-index= ${index} >${time}</span>
        </div>
        <div class="task-area-task-text task-area-task-text-wed noselect">
          <p>
            ${activity}
          </p>
          <button  class="btn-delete-task"  data-index = ${index} >Apagar</button>
        </div>
      </div>
    </div>
    `

  //Adição da task no container correto.
  document.getElementById('tab-wed').appendChild(task);

}

const cleanActivities = () => {
  const tabWed = document.getElementById('tab-wed');
  while (tabWed.firstChild) {
    tabWed.removeChild(tabWed.lastChild);
  }
}

const updateScreen = () => {
  cleanActivities();
  const bankWed = getBankWed();
  bankWed.forEach((task, index) => createTask(task.time, task.task, index));

}


//Inserir tarefa.
const insertTask = () => {
  var timeActivity = document.getElementById('task-time').value;
  var textActivity = document.getElementById('atividade').value;
  if (timeActivity == '' || textActivity == '') {
    alert('Por favor, preencha os campos necessários para adicionar uma atividade!')
  } else {
    const bankWed = getBankWed();
    bankWed.push({ 'time': timeActivity, 'task': textActivity })
    setBankWed(bankWed);
    const timeTasksWed = getTimeTasksWed();
    timeTasksWed.push(timeActivity);
    setTimeTasksWed(timeTasksWed);
    updateScreen();
    document.getElementById('task-time').value = '';
    document.getElementById('atividade').value = '';

  }
}


const removeTask = (index) => {
  const bankWed = getBankWed();
  bankWed.splice(index, 1);
  const timeTasksWed = getTimeTasksWed();
  timeTasksWed.splice(index, 1);
  setTimeTasksWed(timeTasksWed);
  setBankWed(bankWed);
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
  const bankWed = getBankWed();
  bankWed.splice(0, bankWed.length);
  const timeTasksWed = getTimeTasksWed();
  timeTasksWed.splice(0, timeTasksWed.length);
  setBankWed(bankWed);
  setTimeTasksWed(timeTasksWed);
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

document.getElementById('tab-wed').addEventListener('click', clickTask);


updateScreen();
