// const operators = document.querySelectorAll(".operations");
// const numbers = document.querySelectorAll(".numpad");
// const backspace = document.querySelector("#backspace");
// const posNeg = document.querySelector("#sign");
// const allClear = document.querySelectorAll("#all-clear");
// const misc = document.querySelectorAll(".misc_buttons");
// const display = document.querySelector(".display");
const display = document.querySelector("#display");
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
        case 'x':
            return multiply(a, b);
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
    console.log(calculator.previousKeyType)
    
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
}));

const operators = document.querySelectorAll("[data-op]");
operators.forEach((button) => button.addEventListener('click', (e) => {
    let operator = e.target.dataset.op;
    console.log(calculator.previousKeyType)

    if (calculator.firstValue && 
        calculator.operation && 
        calculator.previousKeyType !== 'operator' && 
        calculator.previousKeyType !== 'calculate') {
        console.log( calculator.firstValue + calculator.operation + calculator.displayedNum)
        const calcValue = operate(calculator.operation, calculator.firstValue, calculator.displayedNum);
        display.textContent = calcValue;

        calculator.firstValue = calcValue;

    } else {
        calculator.firstValue = display.textContent;
    }
    operators.forEach((button) => button.classList.remove('is_pressed'));
    e.target.classList.add('is_pressed');
    calculator.previousKeyType = 'operator';
    calculator.firstValue = parseFloat(display.textContent);
    calculator.operation = operator.toString();    
}));

const actions = document.querySelectorAll("[data-action]");
actions.forEach((action) => action.addEventListener('click', (e) => {
    let action = e.target.dataset.action;

    if (action === 'Escape') {
        calculator.previousKeyType = 'clear';
        clear();
    }

    if (action === 'Backspace') {
        if (display.textContent.length > 1) {
            display.textContent = display.textContent.slice(0, -1);
        }
    }

    if (action === 'sign') {
        if (!display.textContent.includes('-')){
            display.textContent = '-' + display.textContent;
        } else if (display.textContent.includes('-')){
            display.textContent = -display.textContent;
        }
       
    }
    if (action === '.') {

        console.log(calculator.previousKeyType)
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
    if (action === 'calculate') {

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
}))

function clear() {
    calculator.firstValue = '',
    calculator.secondValue = '',
    display.textContent = 0,
    calculator.displayedNum = display.textContent,
    calculator.operation = '',
    calculator.modValue = ''
    operators.forEach((button) => button.classList.remove('is_pressed'));
}


window.addEventListener("keydown", keyLogger);
function keyLogger(e) {
    let keyPressed = e.key;
    let numParsed = parseFloat(keyPressed);
    if (!isNaN(numParsed) || keyPressed === ".") {
        currOperand = currOperand.toString() + keyPressed.toString();
    } else if ( keyPressed === "Backspace") {
        //Backspace function here
        display.textContent += "Backspace";
    } else if ( keyPressed === "=" || keyPressed === "Enter") {
        //computeEquals function here
        display.textContent += "=";
    } else if ( keyPressed === "+" || keyPressed === "-") {
        //assign keyPressed to operation
        display.textContent += keyPressed;
        let operator = keyPressed;
    } else if ( keyPressed === "*" || keyPressed === "x") {
        display.textContent += keyPressed;
        let operator = '*';
    } else if (keyPressed === "/") {
        e.preventDefault();
        display.textContent += keyPressed;
        // assign keyPressed to operation
    }
   //display equation function runs here
   const displayedNum = display.textContent;
    if (displayedNum === "0") {
       display.textContent =  numParsed;
    } else {
        display.textContent = displayedNum + numParsed;
    }
}