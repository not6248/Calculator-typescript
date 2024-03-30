document.addEventListener("DOMContentLoaded", function () {
    var number_memory = 0;
    var temp_number = 0;
    var result = 0;
    var operation = null;
    var display = document.querySelector('#display');
    display.innerHTML = temp_number.toString();
    if (typeof number_memory === 'number') {
        console.log('number_memory is a number');
    }
    if (typeof temp_number === 'number') {
        console.log('temp_number is a number');
    }
    function updateDisplay(value) {
        display.innerHTML = value.toString();
        console.log("Display updated to ".concat(number_memory));
        console.log("Display updated to ".concat(temp_number));
    }
    function updateOperationDisplay() {
        document.querySelector('#operation').innerHTML = operation !== null ? operation : '';
    }
    function updateNumberTempDisplay() {
        // let temp: any
        // if (number_memory !== 0 && operation !== null && temp_number !== 0) {
        //     temp = number_memory
        // } else {
        //     temp = '';
        // }
        // document.querySelector('#temp')!.innerHTML = temp;
    }
    function resetOperation() {
        operation = null;
        updateOperationDisplay();
    }
    function checkoperation(operation) {
        var checkResult = result === 0;
        switch (operation) {
            case '+':
                result = checkResult ? temp_number + number_memory : result + temp_number;
                break;
            case '-':
                result = checkResult ? number_memory - temp_number : result - temp_number;
                break;
            case '*':
                result = checkResult ? temp_number * number_memory : result * temp_number;
                break;
            case '/':
                result = checkResult ? number_memory / temp_number : result / temp_number;
                break;
        }
        updateDisplay(result);
        updateNumberTempDisplay();
    }
    function operationSetValue(value) {
        if (number_memory !== 0) {
            if (operation === null) {
                operation = value;
            }
            else {
                checkoperation(operation);
                temp_number = 0;
                operation = value;
            }
        }
        updateOperationDisplay();
        updateNumberTempDisplay();
    }
    var _loop_1 = function (i) {
        document.querySelector("#btn_".concat(i)).addEventListener('click', function () {
            console.log("Button clicked btn_".concat(i));
            if (result !== 0 && operation !== null) {
                number_memory = 0;
                temp_number = 0;
                result = 0;
                number_memory = parseFloat("".concat(number_memory).concat(i));
                updateDisplay(number_memory);
                resetOperation();
                return;
            }
            operation === null
                ? number_memory = parseFloat("".concat(number_memory).concat(i))
                : temp_number = parseFloat("".concat(temp_number).concat(i));
            updateDisplay(operation === null
                ? number_memory
                : temp_number);
            updateNumberTempDisplay();
        });
    };
    for (var i = 0; i <= 9; i++) {
        _loop_1(i);
    }
    document.querySelector('#btn_plus').addEventListener('click', function () {
        operationSetValue('+');
    });
    document.querySelector('#minus').addEventListener('click', function () {
        operationSetValue('-');
    });
    document.querySelector('#btn_multiply').addEventListener('click', function () {
        operationSetValue('*');
    });
    document.querySelector('#btn_divide').addEventListener('click', function () {
        operationSetValue('/');
    });
    document.querySelector('#equal').addEventListener('click', function () {
        checkoperation(operation);
    });
    document.querySelector('#ac').addEventListener('click', function () {
        console.log('Button clicked ac');
        number_memory = 0;
        temp_number = 0;
        result = 0;
        resetOperation();
        updateDisplay(result);
    });
    document.querySelector('#dc').addEventListener('click', function () {
        if (!result) {
            console.log('Button clicked delete');
            if (operation === null) {
                number_memory = Math.floor(number_memory / 10);
            }
            else {
                temp_number = Math.floor(temp_number / 10);
            }
            updateDisplay(operation === null ? number_memory : temp_number);
            number_memory === 0 && resetOperation();
        }
    });
});
