document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.js-form').addEventListener('submit', function (event) {
        event.preventDefault();
        saveData();
    });

    loadData();
});

function saveData() {
    var dadosExistenteString = localStorage.getItem('pessoas');
    var dadosExistente = [];

    if (dadosExistenteString) {
        dadosExistente = JSON.parse(dadosExistenteString);
    }

    var novoNome = document.getElementById('name').value;
    var novaDataNascimento = document.getElementById('date').value;

    var novoRegistro = {
        nome: novoNome,
        dataNascimento: novaDataNascimento
    };

    dadosExistente.push(novoRegistro);

    localStorage.setItem('pessoas', JSON.stringify(dadosExistente));

    exibirDadosNaTabela(dadosExistente);

    document.getElementById('name').value = '';
    document.getElementById('date').value = '';
}

function loadData() {
    var dadosExistenteString = localStorage.getItem('pessoas');
    if (dadosExistenteString) {
        var dadosExistente = JSON.parse(dadosExistenteString);
        exibirDadosNaTabela(dadosExistente);
    }
}

function exibirDadosNaTabela(dados) {
    var tabela = document.getElementById('table');

    while (tabela.rows.length > 1) {
        tabela.deleteRow(1);
    }

    // Ordena os dados pelo nome em ordem alfabética
    dados.sort(function (a, b) {
        return a.nome.localeCompare(b.nome);
    });

    dados.forEach(function (registro, index) {
        var linha = tabela.insertRow(index + 1);
        var celulaNome = linha.insertCell(0);
        var celulaData = linha.insertCell(1);
        var celulaAcoes = linha.insertCell(2);

        celulaNome.innerHTML = registro.nome;
        celulaData.innerHTML = registro.dataNascimento;

        var botaoEditar = document.createElement('button');
        botaoEditar.innerText = 'Editar';
        botaoEditar.addEventListener('click', function () {
            editarRegistro(index, registro);
        });

        var botaoExcluir = document.createElement('button');
        botaoExcluir.innerText = 'Excluir';
        botaoExcluir.addEventListener('click', function () {
            excluirRegistro(index);
        });

        celulaAcoes.appendChild(botaoEditar);
        celulaAcoes.appendChild(botaoExcluir);
    });
}


function excluirRegistro(index) {
    var dadosExistenteString = localStorage.getItem('pessoas');
    if (dadosExistenteString) {
        var dadosExistente = JSON.parse(dadosExistenteString);

        // Remove o registro pelo índice
        dadosExistente.splice(index, 1);

        // Atualiza o localStorage
        localStorage.setItem('pessoas', JSON.stringify(dadosExistente));

        // Exibe os dados atualizados na tabela
        exibirDadosNaTabela(dadosExistente);
    }
}

function editarRegistro(index, registro) {
    // Preenche os campos de entrada com os dados do registro selecionado
    document.getElementById('name').value = registro.nome;
    document.getElementById('date').value = registro.dataNascimento;

    // Remove o registro atual da lista sem atualizar a tabela ainda
    var dadosExistenteString = localStorage.getItem('pessoas');
    if (dadosExistenteString) {
        var dadosExistente = JSON.parse(dadosExistenteString);
        dadosExistente.splice(index, 1);
        localStorage.setItem('pessoas', JSON.stringify(dadosExistente));
    }

    // Agora, exibe os dados atualizados na tabela
    loadData();
}