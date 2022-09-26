'use strict';

// Criação da constante display e pegando pelo ID
const display = document.getElementById('tela_calculadora');

// Criação da query para selecionar todos os id que tenham "tecla" neles
const numeros = document.querySelectorAll('[id*=tecla]');

// Criação da constante Operador
const operadores = document.querySelectorAll('[id*=operador]');

// Criação de variavel para apagar o numero quando clicar no operador.
let novoNumero = true;

// Criação de uma memoria para guardar o operador
let operador;

// Criação de uma memoria para guardar o número anterior
let numeroAnterior;

// Verificando se há operação anterior, ou seja se tem algo ou está vazio(undefined)
const OperacaoPendente = () => operador !== undefined;


// Criando a operação de Calcular, utilizando o eval podemos não fazer aninhamento de if para não criar um codigo enorme.
const calcular = () => {
    if (OperacaoPendente()){
        const numeroAtual = parseFloat(display.textContent.replace(',','.'));
        novoNumero = true;
        const resultado = eval (`${numeroAnterior}${operador}${numeroAtual}`);
        atualizarDisplay(resultado);
    }
}


/* Criação de Recebimento de um "texto qualquer" para receber o texto.
Criação de If para caso selecione um operador, limpe a tela para colocar outros números.*/
const atualizarDisplay = (texto) => {
    if (novoNumero){
        display.textContent = texto;
        novoNumero = false;
    }
    else{
        display.textContent += texto;
    }
}

// Criação da Constante para receber do EventListener, o evento de atualização do display
const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);


// Nessa linha, o comando forEach está varrendo todo o array, e está inserindo o evento de mostrar o numero ao clicar
numeros.forEach (numero => numero.addEventListener('click', inserirNumero));

// Criação da constante para o click de Selecionar Operador e quando clicar, guardar o número que está no display e o operador que foi clicado.
const selecionarOperador = (evento) => {
    if (!novoNumero){
        calcular();
        novoNumero = true;
        operador = evento.target.textContent;
        numeroAnterior = parseFloat(display.textContent.replace(',','.'));
        console.log(operador);
    }
}

operadores.forEach (operador => operador.addEventListener('click', selecionarOperador));

// Criando a funcão do igual, porém temos que anular um problema que ao clicar no operador, ele fica realizando a mesma função de calcular.
const acionarIgual = () => {
    calcular();
    operador = undefined;
}
document.getElementById('igual').addEventListener('click', acionarIgual);

// Criando a função de limpar toda a memoria da calculadora e zerar ela toda.
const limparCalculo = () => {
    display.textContent = '';
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
}
document.getElementById('limpaCalculo').addEventListener('click', limparCalculo);


// Criando a função do backspace, onde pegamos o texto que aparece no display, usando o comando slice para separar o array de string começando do 0, -1 para apagar o ultimo número.
const removerLastNumber = () => display.textContent = display.textContent.slice(0, -1);
document.getElementById('backspace').addEventListener('click', removerLastNumber);



// Criando a função de decimal
const existirDecimal = () => display.textContent.indexOf(',') !== -1;
const existirValor = () => display.textContent.length > 0;
const inserirDecimal = () => {
    if (!existirDecimal()){
        if(existirValor()){
            atualizarDisplay(',');
        }else{
            atualizarDisplay('0,');
        }
    }
}
document.getElementById('decimal').addEventListener('click', inserirDecimal);


const Teclado = {
    '0' : 'tecla0',
    '1' : 'tecla1',
    '2' : 'tecla2',
    '3' : 'tecla3',
    '4' : 'tecla4',
    '5' : 'tecla5',
    '6' : 'tecla6',
    '7' : 'tecla7',
    '8' : 'tecla8',
    '9' : 'tecla9',
    '/' : 'operadorDivisao',
    '*' : 'operadorMultiplicacao',
    '-' : 'operadorSubtracao',
    '+' : 'operadorSoma',
    'Enter' : 'igual',
    '=' : 'igual',
    'Backspace' : 'backspace',
    ',' : 'decimal',
    'Escape' : 'limpaCalculo'
}


// Mapeamento do Teclado.
const mapearTeclado = (evento) => {
    const tecla = evento.key;
    const teclaExiste = () => Object.keys(Teclado).indexOf(tecla) !== -1;
    if (teclaExiste()) document.getElementById(Teclado[tecla]).click();
}
document.addEventListener('keydown', mapearTeclado)