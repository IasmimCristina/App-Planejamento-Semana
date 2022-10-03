


//Bancos usados na aplicação
const getBank = () => JSON.parse(localStorage.getItem('taskAreaTaskMonday')) ?? [];
const setBank = (bank) => localStorage.setItem('taskAreaTaskMonday', JSON.stringify(bank));

//Banco para a vlaidação do conflito: não mais usado.
const getTimeTasks = () => JSON.parse(localStorage.getItem('timeTasks')) ?? [];
const setTimeTasks = (timeTasks) => localStorage.setItem('timeTasks', JSON.stringify(timeTasks));
//Modelo para segunda-feira.
//Talvez essa função possa ter atributos
//Algo com o dataset dos buttons.



const createTask = (time, activity, index) => {
  // const timeTasks = getTimeTasks();
  const task = document.createElement('div');
  task.classList.add('task-area-task');
  task.classList.add('task-area-task-monday');
  //Um if aqui com duas opções de inner.  
  // let qtdRepeticoes = 0;
  // let timeDuplicated = 0;
  // let indexTimeDuplicated = 0;
  // for (let i = 0; i < timeTasks.length; i++) {
  //   if (timeTasks[i] === time) {
  //     qtdRepeticoes += 1;
  //     if (qtdRepeticoes >= 2) { //Pega os tempos que se repetiram.        
  //       console.log(timeTasks[i]);
  //       timeDuplicated = timeTasks[i];
  //       indexTimeDuplicated = i;
  //       console.log(timeDuplicated);
  //     }

  //   }
  // }



  // // if (timeDuplicated != 0) {
  //   task.innerHTML = `
  // <div id="container-${index}"  data-index = ${index} class="task-container-complete">
  //   <div class="task-wrapper">
  //     <div class="task-area-task-time task-area-task-time-monday noselect">
  //       <span data-index= ${index} >${time}</span>
  //     </div>
  //     <div class="task-area-task-text task-area-task-text-monday noselect">
  //       <p>
  //         ${activity}
  //       </p>
  //       <button  class="btn-delete-task"  data-index = ${index} >Apagar</button>
  //     </div>
  //   </div>
  // </div>
  // `
  //   // var  imgConflict = document.createElement('img');

  //   //Adição da task no container correto.


  //   i = 'container-' + indexTimeDuplicated;

  //   // let taskDuplicatedInitial = document.getElementById('container-2'); 
  //   const taskDuplicatedInitial = document.getElementById(i);
  //   copia = taskDuplicatedInitial;
  //   //  taskDuplicatedInitial.className = 'task-duplicated-initial'; 
  //   const taskSelected = document.getElementsByClassName('conflict-container')
  //   console.log(i)
  //   console.log(taskSelected);
  //   task.classList.add('conflict-container');
    
  //   taskSelected.innerHTML = `
  //   <img class="conflict-arrow conflict-arrow-none" src="assets/images/conflict_arrow.svg"
  //                   alt="Seta que indica conflito de horário.">
    `
    // console.log(task);
    //  taskDuplicatedInitial.innerHTML = `
    //  oi
    //  `
    // taskDuplicatedInitial.innerHTML = task;
    // taskDuplicatedInitial.classList.add('container-duplicated');
    //  taskDuplicatedInitial.appendChild(task)   


    // document.getElementById('tab-monday').appendChild(task);
    // // task.classList.add('conflict-container');

  // } else {
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
  // }


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
  // const timeTasks = getTimeTasks();
  bank.forEach((task, index) => createTask(task.time, task.task, index));
  // timeTasks.forEach(timeTask => timeTasks.push(time))
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
  // const elementoTexto = elemento.type;
  // console.log(elementoTexto);
  if (elemento.type == "submit") {
    const index = elemento.dataset.index;
    // console.log(index);
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
  // const bank = getBank();
  // // bank.splice(0, bank.length);
  // const timeTasks = getTimeTasks();
  // // timeTasks.splice(0, timeTasks.length);
  
  localStorage.clear();
  // setBank(bank)
  // timeTasks = [];
  updateScreen();

}

document.getElementById('btn-adicionarAtvdd').addEventListener('click', insertTask);
document.getElementById('btn-salvar-storage').addEventListener('click', insertTask);
document.getElementById('task-excluirAtvdd').addEventListener('click', removeAllTasks);
document.getElementById('btn-excluir-storage').addEventListener('click', removeLocalStorage);

document.getElementById('tab-monday').addEventListener('click', clickTask);

//task-area-main-monday

updateScreen();
