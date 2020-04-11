// const operators = document.querySelectorAll(".operations");
// const numbers = document.querySelectorAll(".numpad");
// const backspace = document.querySelector("#backspace");
// const posNeg = document.querySelector("#sign");
// const allClear = document.querySelectorAll("#all-clear");
// const misc = document.querySelectorAll(".misc_buttons");
// const display = document.querySelector(".display");
const display = document.querySelector("#display");
const clearButton = document.querySelector('[data-action=Escape]');

// const calculator = document.querySelector(".calculator");
// const userInput = document.querySelector("#user-input");
// const decimal = document.querySelector("#decimal");



const add = (a,b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a,b) => a * b;
const divide = (a,b) => b != 0 ? a / b : display.textContent = "NaN";

function operate(operation, a, b) {  
    switch (operation) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case 'x':
            return multiply(a,b);
        case '/':
            return divide(a, b);
    }  
};

display.textContent = 0;

const calculator = {
    firstValue: '',
    displayedNum: display.textContent,
    operation: '',
    calcValue: '',
    previousKeyType: '',
    modValue: ''
}

const numbers = document.querySelectorAll("[data-key]");
numbers.forEach((button) => button.addEventListener('click', (e) => {
    operators.forEach((button) => button.classList.remove('is_pressed'));
    let number = e.target.dataset.key;
    console.log(number);
    numberPressed(number);
}));

const operators = document.querySelectorAll("[data-op]");
operators.forEach((button) => button.addEventListener('click', (e) => {
    let operator = e.target.dataset.op;
    operators.forEach((button) => button.classList.remove('is_pressed'));
    // e.target.classList.add('is_pressed');    
    operatorPressed(operator);
}));

const actions = document.querySelectorAll("[data-action]");
actions.forEach((action) => action.addEventListener('click', (e) => {
    let action = e.target.dataset.action;
 
    if (action === 'Escape') {
        clear();
    }
    if (action === 'Backspace') {
        backspace();
    }
    if (action === 'sign') {
        changeSign();
    }
    if (action === '.') {
        decimalPressed();
    }
    if (action === 'calculate') {
        calculate();
    }
}))



function ac_to_ce() {
    clearButton.textContent = 'CE';
}

function clear() {
    if (clearButton.textContent === 'AC') {
        calculator.firstValue = '',
        calculator.secondValue = '',
        display.textContent = 0,
        calculator.displayedNum = display.textContent,
        calculator.operation = '',
        calculator.modValue = ''
        operators.forEach((button) => button.classList.remove('is_pressed'));
    } else {
        clearButton.textContent = 'AC';
        display.textContent = 0;
        calculator.displayedNum = 0;
        const op = document.querySelector(`button[data-op="${calculator.operation}"]`);
        op.classList.add('is_pressed');
    }
    
    calculator.previousKeyType = 'clear';
}

function backspace() {
    if (display.textContent.length > 1) {
        display.textContent = display.textContent.slice(0, -1);
    }
}

function changeSign() {
    ac_to_ce();
    if (!display.textContent.includes('-')){
        display.textContent = '-' + display.textContent;
    } else if (display.textContent.includes('-')){
        display.textContent = -display.textContent;
    }
}

function numberPressed(number) {
    ac_to_ce();
    if ( calculator.firstValue && calculator.previousKeyType === 'calculate') {
        calculator.firstValue = '';
    } 
    if (display.textContent === 0 || 
        calculator.previousKeyType === 'operator' || 
        calculator.previousKeyType === 'calculate') {

        calculator.displayedNum =  parseFloat(number);
        display.textContent =  calculator.displayedNum;
          
    } 
    else {
        calculator.displayedNum = parseFloat(calculator.displayedNum + number);
        display.textContent = calculator.displayedNum;       
    }
    calculator.previousKeyType = 'number';
}

function decimalPressed() {
    ac_to_ce()
    if (calculator.previousKeyType === 'operator' || calculator.previousKeyType === 'calculate') {
        operators.forEach((button) => button.classList.remove('is_pressed'));
        calculator.displayedNum = 0 + '.';
        display.textContent = calculator.displayedNum;
    }
    if (!display.textContent.includes('.')) {
        calculator.displayedNum += '.';
        display.textContent = calculator.displayedNum;     
    }
    calculator.previousKeyType = 'decimal'; 
}

function operatorPressed(operator) {
    ac_to_ce()
    if (calculator.firstValue && 
        calculator.operation && 
        calculator.previousKeyType !== 'operator' && 
        calculator.previousKeyType !== 'calculate') {
            const calcValue = operate(calculator.operation, calculator.firstValue, calculator.displayedNum);
            display.textContent = calcValue;
            calculator.firstValue = calcValue;
        } else {
             calculator.firstValue = display.textContent;
    }
    calculator.previousKeyType = 'operator';
    calculator.firstValue = parseFloat(display.textContent);
    calculator.operation = operator.toString();
    const op = document.querySelector(`button[data-op="${calculator.operation}"]`);
    op.classList.add('is_pressed'); 
}

function calculate() {
    let secondValue = parseFloat(display.textContent);
        
    if (calculator.firstValue) {
        if (calculator.previousKeyType === 'calculate') {
            calculator.firstValue = calculator.displayedNum;
            secondValue = calculator.modValue;
            
        }
    calculator.displayedNum = operate(calculator.operation, calculator.firstValue, secondValue);
    display.textContent = calculator.displayedNum;
    }
    calculator.modValue = secondValue;
    calculator.previousKeyType = 'calculate';
    operators.forEach((button) => button.classList.remove('is_pressed'));
}
window.addEventListener("keydown", keyLogger);
function keyLogger(e) {
    let keyPressed = e.key;
    let numParsed = parseFloat(keyPressed);
    const ops = document.querySelectorAll('.operation');
    const op = document.querySelector(`button[data-op="${keyPressed}"]`);
    if (keyPressed === 'x') {
        keyPressed = '*';
    }
    if (!isNaN(keyPressed) ) {
        number = numParsed.toString();
        numberPressed(number);
        ops.forEach((op) => op.classList.remove('is_pressed'));
  
    } else if ( keyPressed === "Backspace") {
        //Backspace function here
        backspace();
    } else if (keyPressed === 'Escape') { 
        clear();
    } else if ( keyPressed === '.') {
        decimalPressed();
    }else if ( keyPressed === "=" || keyPressed === "Enter") {
        //computeEquals function here
        calculate();
    } else if ( keyPressed === "+" || keyPressed === "-"|| keyPressed === "*" || keyPressed === "x" || keyPressed === "/") {
        //assign keyPressed to operation
        // ops.classList.remove('is_pressed');
        ops.forEach((op) => op.classList.remove('is_pressed'));
        // op.classList.add('is_pressed');
        operator = keyPressed;
        operatorPressed(operator);
    } 


}