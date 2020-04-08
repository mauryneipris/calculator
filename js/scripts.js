// const operators = document.querySelectorAll(".operations");
// const numbers = document.querySelectorAll(".numpad");
// const backspace = document.querySelector("#backspace");
// const posNeg = document.querySelector("#sign");
// const allClear = document.querySelectorAll("#all-clear");
// const misc = document.querySelectorAll(".misc_buttons");
// const display = document.querySelector(".display");
const display = document.querySelector("#display");
const calculator = document.querySelector(".calculator");
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


// userInput.textContent = 0;
display.textContent = "0";
calculator.dataset.firstValue = '';
calculator.dataset.secondValue = '';
calculator.dataset.displayedNum = '';

// const calculator = {
//     firstValue: '',
//     secondValue: '',
//     displayedNum: display.textContent,
//     operation: '',
//     previousKeyType: '',
//     action: ''
// }


// fix bug for second number. If decimal is pressed, it is not displayed
const numbers = document.querySelectorAll("[data-key]");
numbers.forEach((button) => button.addEventListener('click', (e) => {
    let number = e.target.dataset.key;
    // console.log(number);
    const previousKeyType = calculator.dataset.previousKeyType;
    const displayedNum = display.textContent;
    if (displayedNum === "0" || previousKeyType === 'operator') {
       display.textContent =  number;
    } 
    else {
        display.textContent = displayedNum + number;
    }
}));

const operators = document.querySelectorAll("[data-op]");
operators.forEach((button) => button.addEventListener('click', (e) => {
    let operator = e.target.dataset.op;
    // console.log(operator);
    calculator.dataset.previousKeyType = 'operator'
    calculator.dataset.firstValue = display.textContent;
    calculator.dataset.operator = operator.toString();
    
}));

const actions = document.querySelectorAll("[data-action]");
actions.forEach((action) => action.addEventListener('click', (e) => {
    let action = e.target.dataset.action;
    // console.log(action);
    if (action === 'escape') {
        console.log('All Clear key');
    }
    if (action === '.' && !display.textContent.includes('.')) {
        display.textContent += '.';
    }
    if (action === 'calculate') {
        const firstValue = parseFloat(calculator.dataset.firstValue);
        const operation = calculator.dataset.operator;
        const secondValue = parseFloat(display.textContent);

        console.log(firstValue);
        console.log(secondValue);
        console.log(operation); 
        display.textContent = operate(operation, firstValue, secondValue);
    }

}))

function clear() {
    firstValue = '';
    secondValue = '';
    currOperand = '';
    operated = false;
    display.textContent = "0";
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