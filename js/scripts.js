const operators = document.querySelectorAll(".operations");
const numbers = document.querySelectorAll(".numpad");
const backspace = document.querySelector("#backspace");
const posNeg = document.querySelector("#sign");
const allClear = document.querySelectorAll("#all-clear");
const misc = document.querySelectorAll(".misc_buttons");
const display = document.querySelector(".display");
const result = document.querySelector("#result");
const userInput = document.querySelector("#user-input");
const decimal = document.querySelector("#decimal");

const add = (a,b) => a + b;
const subtract = (a,b) => a - b;
const multipy = (a,b) => a * b;
const divide = (a,b) => b != 0 ? a / b : "Can't divide by zero!";

let firstOperand = '';
let secondOperand = '';
let currOperand = '';
let operated = false;
let decimaled = false;

userInput.textContent = '1' + " + " + "1";
result.textContent = '0';

numbers.forEach((num) => num.addEventListener('click', () => numButtonHandler(num.textContent)));
operators.forEach((operation) => operation.addEventListener('click', () => operationButtonHandler(operation.textContent)));
misc.forEach((m) => m.addEventListener('click', () => miscButtonHandler(m.textContent)));

function operate(operation, a, b) {
    switch (operation) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case 'x':
            return multiply(a, b);
        case '÷':
            return divide(a, b);
    }
};

function operationButtonHandler(operation) {
    operated = true;
    if (operation != '=') {
        if (secondOperand) {
            //calculate display reset
        }
        currOperand = operation;
    } else {
        if (secondOperand) {
            //calculate display reset
        } else {
            firstOperand = result.textContent;
        }
        currOperand = '';
    }
};

function clear() {
    firstOperand = '';
    secondOperand = '';
    currOperand = '';
    operated = false;
    decimaled = false;
}

function miscButtonHandler(operation) {

}