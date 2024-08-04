// Selecionar elementos do DOM
const calculator = document.querySelector('.calculator');
const calculatorScreen = calculator.querySelector('.calculator-screen');
const keys = calculator.querySelector('.calculator-keys');

// Estado inicial da calculadora
let currentInput = '';
let previousInput = '';
let operation = null;

// Função para atualizar a tela
function updateScreen(value) {
    calculatorScreen.value = value;
}

// Função para realizar cálculos básicos
function calculate() {
    let result;
    const current = parseFloat(currentInput);
    const previous = parseFloat(previousInput);

    switch (operation) {
        case '+':
            result = previous + current;
            break;
        case '-':
            result = previous - current;
            break;
        case '*':
            result = previous * current;
            break;
        case '/':
            if (current === 0) {
                updateScreen("Erro");
                return;
            }
            result = previous / current;
            break;
        default:
            return;
    }
    currentInput = result.toString();
    operation = null;
}

// Função para realizar cálculos científicos
function scientificCalculate(value) {
    const number = parseFloat(currentInput);
    let result;

    switch (value) {
        case 'sin':
            result = Math.sin(number);
            break;
        case 'cos':
            result = Math.cos(number);
            break;
        case 'tan':
            result = Math.tan(number);
            break;
        case 'sqrt':
            result = Math.sqrt(number);
            break;
        default:
            return;
    }
    currentInput = result.toString();
}

// Evento para cliques nos botões
keys.addEventListener('click', (event) => {
    const { target } = event;
    const { value } = target;

    if (!target.matches('button')) return;

    if (target.classList.contains('number')) {
        currentInput += value;
        updateScreen(currentInput);
    } 
    else if (target.classList.contains('operator')) {
        if (currentInput) {
            if (operation) {
                calculate();
            }
            operation = value;
            previousInput = currentInput;
            currentInput = '';
        }
    } 
    else if (target.classList.contains('decimal')) {
        if (!currentInput.includes('.')) {
            currentInput += '.';
            updateScreen(currentInput);
        }
    } 
    else if (target.classList.contains('all-clear')) {
        currentInput = '';
        previousInput = '';
        operation = null;
        updateScreen(currentInput);
    } 
    else if (target.classList.contains('equal-sign')) {
        if (operation && currentInput) {
            calculate();
            updateScreen(currentInput);
        }
    } 
    else if (['sin', 'cos', 'tan', 'sqrt'].includes(value)) {
        if (currentInput) {
            scientificCalculate(value);
            updateScreen(currentInput);
        }
    }
});
