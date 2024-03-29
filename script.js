document.addEventListener("DOMContentLoaded", function () {
    var number_memory = 0;
    var temp_number = 0;
    var temp_number_for_reuse = 0;
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
    }
    function checkoperation(operation) {
        if (operation === '+') {
            result = temp_number + number_memory;
        }
        else if (operation === '-') {
            result = number_memory - temp_number;
        }
        else if (operation === '*') {
            result = temp_number * number_memory;
        }
        else if (operation === '/') {
            result = temp_number / number_memory;
        }
        console.log("Result: ".concat(result));
        operation = null;
        updateDisplay(result);
    }
    var _loop_1 = function (i) {
        document.querySelector("#btn_".concat(i)).addEventListener('click', function () {
            console.log("Button clicked btn_".concat(i));
            if (operation === null) {
                number_memory = parseFloat("".concat(number_memory).concat(i));
            }
            else {
                temp_number = parseFloat("".concat(temp_number).concat(i));
            }
            updateDisplay(operation === null ? number_memory : temp_number);
        });
    };
    for (var i = 0; i <= 9; i++) {
        _loop_1(i);
    }
    document.querySelector('#minus').addEventListener('click', function () {
        console.log('Button clicked btn_multiply');
        operation = '-';
        temp_number_for_reuse = number_memory;
    });
    document.querySelector('#btn_divide').addEventListener('click', function () {
        console.log('Button clicked btn_divide');
        operation = '/';
        temp_number_for_reuse = number_memory;
    });
    document.querySelector('#btn_multiply').addEventListener('click', function () {
        console.log('Button clicked btn_multiply');
        operation = '*';
        temp_number_for_reuse = number_memory;
    });
    document.querySelector('#btn_plus').addEventListener('click', function () {
        console.log('Button clicked btn_plus');
        operation = '+';
        temp_number_for_reuse = number_memory;
    });
    document.querySelector('#equal').addEventListener('click', function () {
        checkoperation(operation);
    });
    document.querySelector('#ac').addEventListener('click', function () {
        console.log('Button clicked ac');
        number_memory = 0;
        operation = null;
        temp_number = 0;
        result = 0;
        temp_number_for_reuse = 0;
        updateDisplay(result);
    });
    document.querySelector('#dc').addEventListener('click', function () {
        console.log('Button clicked delete');
        number_memory = Math.floor(number_memory / 10);
        updateDisplay(number_memory);
    });
});
