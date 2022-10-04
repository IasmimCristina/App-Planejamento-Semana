//Interação com a página inicial - Apenas alertas simples.
const removeLocalStorage = () => {
  localStorage.clear();
 
  alert('Todas as atividades registradas foram excluídas com sucesso.');
}

const showErrorMessage = () => {
  alert('Primeiro você deve selecionar um dia de semana!');
 
}

document.getElementById('btn-adicionarAtvdd').addEventListener('click', showErrorMessage);
document.getElementById('btn-salvar-storage').addEventListener('click', showErrorMessage);
document.getElementById('task-excluirAtvdd').addEventListener('click', showErrorMessage);
document.getElementById('btn-excluir-storage').addEventListener('click', removeLocalStorage);