
// --- 1. EVENTOS DOM (Via JavaScript Listeners) ---
var botao = document.getElementById('btn')
var res = document.getElementById('res')

botao.addEventListener('click', processar)
botao.addEventListener('mouseenter', entrou)
botao.addEventListener('mouseout', saiu)

function entrou() {
    botao.style.background = 'darkgreen'
}

function saiu() {
    botao.style.background = 'green'
}

// --- 2. LÓGICA DO SISTEMA ---
function processar() {
    var txtn = document.getElementById('txtnome')
    var txti = document.getElementById('txtidade')
    
    var nome = txtn.value
    var idade = Number(txti.value)

    // Validação simples para não rodar sem dados
    if (nome == '' || txti.value == '') {
        res.innerHTML = '[ERRO] Preencha todos os campos!'
        return 
    }

    // --- 3. MANIPULAÇÃO DE DATAS E HORAS ---
    var agora = new Date()
    var hora = agora.getHours()
    var diaSem = agora.getDay()

    // Texto de saudação baseado na hora
    var saudacao = ''
    if (hora < 12) {
        saudacao = 'Bom dia'
    } else if (hora <= 18) {
        saudacao = 'Boa tarde'
    } else {
        saudacao = 'Boa noite'
    }

    // --- 4. CONDIÇÃO ANINHADA (Prioridade por Idade) ---
    var classe = ''
    if (idade < 16) {
        classe = 'Atendimento Recusado (Menor de idade desacompanhado)'
    } else if (idade < 60) {
        classe = 'Fila Comum'
    } else if (idade < 80) {
        classe = 'Fila Prioritária'
    } else {
        classe = 'Fila Prioridade Especial (80+)'
    }

    // --- 5. CONDIÇÃO MÚLTIPLA (Destinação por Dia da Semana) ---
    var guiche = ''
    switch(diaSem) {
        case 0:
            guiche = 'Fechado (Domingo)'
            break
        case 1:
            guiche = 'Guichê A - Setor de Documentação'
            break
        case 2:
            guiche = 'Guichê B - Setor de Contratos'
            break
        case 3:
            guiche = 'Guichê C - Finanças'
            break
        case 4:
            guiche = 'Guichê D - Recursos Humanos'
            break
        case 5:
            guiche = 'Guichê E - Suporte Geral'
            break
        case 6:
            guiche = 'Fechado (Sábado)'
            break
        default:
            guiche = '[ERRO] Dia inválido'
            break
    }

    // --- 6. SAÍDA DE DADOS (Inner HTML + Template String) ---
    res.innerHTML = `<p>${saudacao}, <strong>${nome}</strong>!</p>`
    res.innerHTML += `<p>Sua classificação: <strong>${classe}</strong></p>`
    
    if (diaSem == 0 || diaSem == 6) {
        res.innerHTML += `<p>Status: <strong style="color:red">${guiche}</strong></p>`
    } else {
        res.innerHTML += `<p>Por favor, dirija-se ao: <strong>${guiche}</strong></p>`
    }
}
