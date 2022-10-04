//Bancos usados na aplicação.
const getBankThurs = () => JSON.parse(localStorage.getItem('taskAreaTaskThurs')) ?? [];
const setBankThurs = (bankThurs) => localStorage.setItem('taskAreaTaskThurs', JSON.stringify(bankThurs));

//Banco para a validação do conflito: não mais usado.
const getTimeTasksThurs = () => JSON.parse(localStorage.getItem('timeTasksThurs')) ?? [];
const setTimeTasksThurs = (timeTasksThurs) => localStorage.setItem('timeTasksThurs', JSON.stringify(timeTasksThurs));
//Modelo para quarta-feira.

const createTask = (time, activity, index) => {

  const task = document.createElement('div');
  task.classList.add('task-area-task');
  task.classList.add('task-area-task-wed');

  task.innerHTML = `
    <div id="container-${index}" data-index = ${index}  class="task-container-complete">
      <div class="task-wrapper">
        <div class="task-area-task-time task-area-task-time-thurs noselect">
          <span data-index= ${index} >${time}</span>
        </div>
        <div class="task-area-task-text task-area-task-text-thurs noselect">
          <p>
            ${activity}
          </p>
          <button  class="btn-delete-task"  data-index = ${index} >Apagar</button>
        </div>
      </div>
    </div>
    `

  //Adição da task no container correto.
  document.getElementById('tab-thurs').appendChild(task);

}

const cleanActivities = () => {
  const tabThurs = document.getElementById('tab-thurs');
  while (tabThurs.firstChild) {
    tabThurs.removeChild(tabThurs.lastChild);
  }
}

const updateScreen = () => {
  cleanActivities();
  const bankThurs = getBankThurs();
  bankThurs.forEach((task, index) => createTask(task.time, task.task, index));

}


//Inserir tarefa.
const insertTask = () => {
  var timeActivity = document.getElementById('task-time').value;
  var textActivity = document.getElementById('atividade').value;
  if (timeActivity == '' || textActivity == '') {
    alert('Por favor, preencha os campos necessários para adicionar uma atividade!')
  } else {
    const bankThurs = getBankThurs();
    bankThurs.push({ 'time': timeActivity, 'task': textActivity })
    setBankThurs(bankThurs);
    const timeTasksThurs = getTimeTasksThurs();
    timeTasksThurs.push(timeActivity);
    setTimeTasksThurs(timeTasksThurs);
    updateScreen();
    document.getElementById('task-time').value = '';
    document.getElementById('atividade').value = '';

  }
}


const removeTask = (index) => {
  const bankThurs = getBankThurs();
  bankThurs.splice(index, 1);
  const timeTasksThurs = getTimeTasksThurs();
  timeTasksThurs.splice(index, 1);
  setTimeTasksThurs(timeTasksThurs);
  setBankThurs(bankThurs);
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
  const bankThurs = getBankThurs();
  bankThurs.splice(0, bankThurs.length);
  const timeTasksThurs = getTimeTasksThurs();
  timeTasksThurs.splice(0, timeTasksThurs.length);
  setBankThurs(bankThurs);
  setTimeTasksThurs(timeTasksThurs);
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

document.getElementById('tab-thurs').addEventListener('click', clickTask);


updateScreen();
