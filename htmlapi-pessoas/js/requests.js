const url_server = "http://localhost:3000";

function cadastrar() {
    window.alert(`Obrigado pelo seu cadastro`);
    location.reload();

    console.log('Enviando dados ao servidor...');

    // Recuperando dados do formulário e armazenando na variável dados, que está estruturada em formato JSON
    const dados = {
        id: document.querySelector('[name="id-pessoa"]').value,
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
    fetch(`${url_server}/pessoas`, {
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
    console.log(`Entrei na função`)
    // recupera o elemento da tabela
    const tabela = document.querySelector('table');
    // verifica quantas linhas existem na tabela
    const contadorLinhas = tabela.rows.length;
    // apaga todas as linhas da tabela
    for (var i = contadorLinhas - 1; i > 0; i--) {
        tabela.deleteRow(i);
    }

    // faça algo antes de montar a tabela, SE NECESSÁRIO
    console.log(`vou executar o fetch`)
    fetch(`${url_server}/pessoas`)
        .then(response => response.json())
        .then(data => {
            // Inserindo os dados da pessoa na tabela
            // fazendo um loop usando forEach para percorrer todos os dados retornados pelo servidor
            data.forEach(pessoa => {
                console.log(pessoa)
                // Criando os elementos HTML
                const tabela = document.querySelector('table');
                const elementTr = document.createElement('tr');
                const tId = document.createElement('td');
                const tdNome = document.createElement('td');
                const tdCpf = document.createElement('td');
                const tdDataNascimento = document.createElement('td');
                const tdTelefone = document.createElement('td');
                const tdEndereco = document.createElement('td');
                const tdPeso = document.createElement('td');
                const tdAltura = document.createElement('td');
                const tdAcao = document.createElement(`td`);
                const btnEditar = document.createElement('button');
                const btnDeletar = document.createElement('button');


                // Inserindo os dados da pessoa no elemento	
                tId.textContent = pessoa.id;
                tdNome.textContent = pessoa.nome;
                tdCpf.textContent = pessoa.cpf;
                tdDataNascimento.textContent = pessoa.data_nascimento;
                tdTelefone.textContent = pessoa.telefone;
                tdEndereco.textContent = pessoa.endereco;
                tdPeso.textContent = pessoa.peso;
                tdAltura.textContent = pessoa.altura;

                btnEditar.innerText = "Editar"
                btnDeletar.innerText = "Deletar"
                btnDeletar.addEventListener("click", () => Deletar(pessoa.id, pessoa.nome));
                btnEditar.addEventListener("click", () => editarPessoa(pessoa));
                tdAcao.appendChild(btnEditar);
                tdAcao.appendChild(btnDeletar);

                // Inserindo os elementos nas linhas da tabela (tr => TableRow)
                elementTr.appendChild(tId);
                elementTr.appendChild(tdNome);
                elementTr.appendChild(tdCpf);
                elementTr.appendChild(tdDataNascimento);
                elementTr.appendChild(tdTelefone);
                elementTr.appendChild(tdEndereco);
                elementTr.appendChild(tdPeso);
                elementTr.appendChild(tdAltura);
                elementTr.appendChild(tdAcao);

                // Adicionando a linha com as informações na tabela
                tabela.appendChild(elementTr);
            });
        })


}

function atualizarPessoa() {

    const dadosPessoa = {
        id: document.querySelector('[name="id-pessoa"]').value,
        nome: document.querySelector('[name="nome-pessoa-alt"]').value,
        cpf: document.querySelector('[name="cpf-alt"]').value,
        data_nascimento: document.querySelector('[name="data-de-nascimento-alt"]').value,
        telefone: document.querySelector('[name="telefone-alt"]').value,
        endereco: document.querySelector('[name="endereco-alt"]').value,
        altura: document.querySelector('[name="altura-alt"]').value,
        peso: document.querySelector('[name="peso-alt"]').value
    }

    console.log(dadosPessoa);

    fetch(`${server_url}/pessoas/:id/${dadosPessoa.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosPessoa),
    })
        .then(response => response.json())
        .then(data => {
            // Exibir a resposta do back-end
            console.log(data);
        })
        .catch(error => {
            console.error('Erro ao alterar registro: ' + error);
        });

}
function editarPessoa(pessoa) {
    console.log(pessoa);

    // Encapsula e serializa objeto pessoa para enviar para outra página
    const objetoPessoaSerializado = JSON.stringify(pessoa);
    const objetoPessoaCodificado = encodeURIComponent(objetoPessoaSerializado);

    // Redireciona para a página alterar.html, enviando o objeto pessoa como parâmetro
    window.location.href = `alterar.html?pessoa=${objetoPessoaCodificado}`;
}

function carregarInfo() {

    // Recupera o objeto pessoa passado como parâmetro
    const urlParams = new URLSearchParams(window.location.search);
    const pessoaCodificada = urlParams.get('pessoa');

    console.log(pessoaCodificada);

    // Desencapsula e serializa objeto pessoa para enviar para outra página
    const pessoaSerializada = decodeURIComponent(pessoaCodificada);
    const pessoa = JSON.parse(pessoaSerializada);

    // Faz um parse na data para podermos utilizar dia, mês e ano
    const dataParse = new Date(pessoa.data_nascimento);

    document.querySelector('[name="Id-alterar"]').innerText = pessoa.id;
    document.querySelector('[name="Nome-alterar"]').innerText = pessoa.nome;
    document.querySelector('[name="CPF-alterar"]').innerText = pessoa.cpf;

    // Verifica se o mês for menor que 10, coloca um zero antes, caso seja maior, não coloca o zero
    if (dataParse.getMonth() + 1 < 10) {
        document.querySelector('[name="Data-Nascimento-alterar"]').innerText = `${dataParse.getFullYear()}-0${dataParse.getMonth() + 1}-${dataParse.getDate()}`;
    } else {
        document.querySelector('[name="data-de-nascimento-alt"]').innerText = `${dataParse.getFullYear()}-${dataParse.getMonth() + 1}-${dataParse.getDate()}`;
    }

    document.querySelector('[name="Telefone-alterar"]').innerText = pessoa.telefone;
    document.querySelector('[name="Endereco-alterar"]').innerText = pessoa.endereco;
    document.querySelector('[name="Altura-alterar"]').innerText = pessoa.altura;
    document.querySelector('[name="Peso-alterar"]').innerText = pessoa.peso;
}


function Deletar(id, nome) {
    const resposta = window.confirm(`Tem certeza que deseja apagar ${nome}?`);

    if (resposta) {
        console.log()
        if (id !== -1) {
            fetch(`${url_server}/pessoas/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-type': 'application\json',
                }
            }).then(response => {
                if (response.ok) {
                    listarPessoas();
                    alert("Item excluido com sucesso");
                } else {
                    alert("Erro ao excluir item");
                }
            }).catch(error => {
                console.log("Erro:", error)
            })
        }
    }
}