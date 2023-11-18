//Create
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("save").addEventListener("click", save);
});

function save() {
    let nome = document.getElementById('name').value;
    localStorage.setItem('meusdados', nome);
    var dados = localStorage.getItem('meusdados');
}
function save(){
    var dadosExistentesString = localStorage.getItem('meusdados')
    var dadosExistente = [];
if (dadosExistentesString){
    dadosExistente = JSON.parse(dadosExistentesString)
}
var novasPessoas = document.getElementById('name').value;
dadosExistente.push(novasPessoas)
localStorage.setItem('meusdados', JSON.stringify(dadosExistente))
console,log('Nomes Salvos', dadosExistente)
}
