let atendimentos = [];
const botao = document.getElementById('btn');
const nome = document.getElementById('txtnome');
const idade = document.getElementById('txtidade');
const res = document.getElementById('res');
const lista = document.getElementById('listaAtendimentos');
const busca = document.getElementById('txtbusca');
const resultadoBusca = document.getElementById('resultadoBusca');
const estatisticas = document.getElementById('estatisticas');
let contador = 0;


botao.addEventListener('click', processar);
document.getElementById('btnbuscar')
    .addEventListener('click', pesquisar);
document.getElementById('btnlimpar')
    .addEventListener('click', limparFila);


function processar() {

    let n = nome.value.trim().toUpperCase();
    let i = Number(idade.value);

    if (n === '' || idade.value === '') {
        res.textContent = 'Preencha todos os campos!';
        return;
    }

    if (!Number.isInteger(i) || i < 1 || i > 120) {
        res.textContent = 'Idade inválida!';
        return;
    }

    if (i < 18) {
        res.textContent = 'Atendimento recusado!';
        return;
    }

    let classe = classificar(i);

    contador++;

    let senha = 'A-' + String(contador).padStart(3, '0');

    let cliente = {
        nome: n,
        idade: i,
        senha: senha,
        classe: classe
    };

    atendimentos.push(cliente);

    res.innerHTML = `
        Cliente: <strong>${n}</strong><br>
        Senha: <strong>${senha}</strong><br>
        Classificação: <strong>${classe}</strong>
    `;

    exibirLista();
    exibirEstatisticas();

    nome.value = '';
    idade.value = '';

}


function pesquisar() {
    let termo = busca.value.trim().toLowerCase();

    if (termo === '') {
        resultadoBusca.textContent = 'Digite um nome ou uma senha para pesquisar!';
        return;
    }

    let encontrados = atendimentos.filter(
        cliente => cliente.nome.toLowerCase().includes(termo)
        || cliente.senha.toLowerCase() === termo
    );

    // let encontrados = atendimentos.filter(function(cliente) {
    //     return cliente.nome.includes("Maria");
    // });

    resultadoBusca.innerHTML = '';

    if (encontrados.length === 0) {
        resultadoBusca.textContent = 'Cliente não encontrado!';
        return;
    }

    encontrados.forEach(cliente => {
        resultadoBusca.innerHTML += `
            <p>
                ${cliente.nome} - ${cliente.senha}
                - ${cliente.classe}
            </p>
        `;
    });
}


function limparFila() {
    atendimentos = [];
    contador = 0;

    lista.innerHTML = '';
    estatisticas.innerHTML = '';
    res.textContent = 'Fila limpa com sucesso!';
}


function exibirLista() {

    lista.innerHTML = '';

    for (let cliente of atendimentos) {

        lista.innerHTML += `
            <p>
                ${cliente.senha} -
                ${cliente.nome} -
                ${cliente.classe}
            </p>
        `;
    }


    // for(let i = 0; i < atendimentos.length; i++){
    //      lista.innerHTML += `
    //         <p>
    //             ${atendimentos[i].senha} -
    //             ${atendimentos[i].nome} -
    //             ${atendimentos[i].classe}
    //         </p>
    //     `;
    // }


    // let i = 0;
    // while(i < atendimentos.length){
    //      lista.innerHTML += `
    //         <p>
    //             ${atendimentos[i].senha} -
    //             ${atendimentos[i].nome} -
    //             ${atendimentos[i].classe}
    //         </p>
    //     `;
    //     i++;
    // }


    // let i = 0;
    // do {
    //     lista.innerHTML += `
    //         <p>
    //             ${atendimentos[i].senha} -
    //             ${atendimentos[i].nome} -
    //             ${atendimentos[i].classe}
    //         </p>
    //     `;

    //     i++;
    // } while (i < atendimentos.length);

}


function classificar(idade) {

    if (idade < 18) {
        return 'Menor de idade';
    } else if (idade < 60) {
        return 'Comum';
    } else if (idade < 80) {
        return 'Prioritária';
    } else {
        return 'Especial';
    }

}


function exibirEstatisticas() {

    let prioritarios = atendimentos.filter(
        cliente => cliente.idade >= 60
    );

    estatisticas.innerHTML = `
        Total de clientes: ${atendimentos.length}<br>
        Clientes prioritários: ${prioritarios.length}
    `;

}
