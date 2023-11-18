//Create
document.addEventListener('DOMContentLoaded', function(){
document.getElementById('save').addEventListener('click', save);})

function save() {
  let nome = document.getElementById('name').value;
  let novaTarefa = document.getElementById('save').textContent;
  localStorage.setItem('meusdados', novaTarefa);
  var dados = localStorage.getItem('meusDados');
  var dadosRecuperados = JSON.parse(dados);
  console.log(dadosRecuperados.novaTarefa);
}




