const btnAdd = document.querySelector('#btnAdd');
const tarefaInput = document.querySelector('#tarefaInput');
const colunas = document.querySelectorAll('.coluna');

let contadorId = 0;

// Atualiza os contadores
function atualizarContadores() {
  document.querySelector('#count-novas').textContent =
    document.querySelectorAll('#novas .tarefa').length;

  document.querySelector('#count-afazer').textContent =
    document.querySelectorAll('#afazer .tarefa').length;

  document.querySelector('#count-andamento').textContent =
    document.querySelectorAll('#andamento .tarefa').length;

  document.querySelector('#count-concluido').textContent =
    document.querySelectorAll('#concluido .tarefa').length;
}

// Criar tarefa
btnAdd.addEventListener('click', () => {
  const texto = tarefaInput.value.trim();
  if (texto === "") return;

  contadorId++;
  const novaTarefa = document.createElement('div');
  novaTarefa.classList.add('tarefa');
  novaTarefa.setAttribute('draggable', 'true');
  novaTarefa.id = 'tarefa-' + contadorId;
  novaTarefa.textContent = texto;

  document.querySelector('#novas').appendChild(novaTarefa);
  tarefaInput.value = "";

  addDragEvents(novaTarefa);
  atualizarContadores();
});

// Função para adicionar eventos de drag
function addDragEvents(item) {
  item.addEventListener('dragstart', (evento) => {
    evento.dataTransfer.setData('text/plain', item.id);
  });
}

// Eventos das colunas (dragover e drop)
colunas.forEach(coluna => {
  coluna.addEventListener('dragover', (evento) => {
    evento.preventDefault();
  });

  coluna.addEventListener('drop', (evento) => {
    evento.preventDefault();
    const idTarefa = evento.dataTransfer.getData('text/plain');
    const tarefa = document.getElementById(idTarefa);
    coluna.insertBefore(tarefa, coluna.querySelector('.contador'));
    atualizarContadores();
  });
});
