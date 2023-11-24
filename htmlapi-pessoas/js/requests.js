const url_server = "http://localhost:3000";

function cadastrar() {
    window.alert(`Obrigado pelo seu cadastro`);
    location.reload();

    console.log('Enviando dados ao servidor...');

    // Recuperando dados do formulário e armazenando na variável dados, que está estruturada em formato JSON
    const dados = {
        nome: document.querySelector('[name="nome-pessoa"]').value,
        cpf: document.querySelector('[name="cpf"]').value,
        data_nascimento: document.querySelector('[name="data-de-nascimento"]').value,
        telefone: document.querySelector('[name="telefone"]').value,
        endereco: document.querySelector('[name="endereco"]').value,
        altura: document.querySelector('[name="altura"]').value,
        peso: document.querySelector('[name="peso"]').value,
    }

    console.log(dados);

    // Requisição para back-end

    // Faz requisição ao servidor usando o verbo POST, enviando os dados para o servidor
    fetch(`${url_server}/cadastro`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
        // Depois de feita a requisição, o front-end irá receber um retorno do servidor
        .then(response => response.json())
        // Se toda a requisição deu certo, será informado no log
        .then(dados => {
            console.log('Resposta do servidor:', dados);
            // Faça algo com a resposta do servidor, se necessário
        })
        // Caso tenha algum tipo de erro na requisição, é lançada a excessão
        .catch(error => {
            console.error('Erro ao enviar dados para o servidor:', error);
            // Trate os erros, se necessário
        });

    function listarPessoas() {
        fetch(`${url_server}/pessoas`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
            });
    }

}






function listarPessoas() {

    // recupera o elemento da tabela
    const tabela = document.querySelector('table');
    // verifica quantas linhas existem na tabela
    const contadorLinhas = tabela.rows.length;
    // apaga todas as linhas da tabela
    for (var i = contadorLinhas - 1; i > 0; i--) {
        tabela.deleteRow(i);
    }

    // faça algo antes de montar a tabela, SE NECESSÁRIO

    fetch(`${url_server}/pessoas`)
        .then(response => response.json())
        .then(data => {
            // Inserindo os dados da pessoa na tabela
            // fazendo um loop usando forEach para percorrer todos os dados retornados pelo servidor
            data.forEach(pessoa => {
                // Criando os elementos HTML
                const tabela = document.querySelector('table');
                const elementTr = document.createElement('tr');
                const tdNome = document.createElement('td');
                const tdCpf = document.createElement('td');
                const tdDataNascimento = document.createElement('td');
                const tdTelefone = document.createElement('td');
                const tdEndereco = document.createElement('td');
                const tdPeso = document.createElement('td');
                const tdAltura = document.createElement('td');
                

                // Inserindo os dados da pessoa no elemento	
                tdNome.textContent = pessoa.nome;
                tdCpf.textContent = pessoa.cpf;
                tdDataNascimento.textContent = pessoa.data_nascimento;
                tdTelefone.textContent = pessoa.telefone;
                tdEndereco.textContent = pessoa.endereco;
                tdPeso.textContent = pessoa.peso;
                tdAltura.textContent = pessoa.altura;

                // Inserindo os elementos nas linhas da tabela (tr => TableRow)
                elementTr.appendChild(tdNome);
                elementTr.appendChild(tdCpf);
                elementTr.appendChild(tdDataNascimento);
                elementTr.appendChild(tdTelefone);
                elementTr.appendChild(tdEndereco);
                elementTr.appendChild(tdPeso);
                elementTr.appendChild(tdAltura);

                // Adicionando a linha com as informações na tabela
                tabela.appendChild(elementTr);
            });
        })
}

