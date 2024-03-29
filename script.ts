document.addEventListener("DOMContentLoaded", function () {
    let number_memory: number = 0;
    let temp_number: number = 0;
    let temp_number_for_reuse: number = 0;
    let result: number = 0;
    let operation: string | null = null;

    const display = document.querySelector('#display') as HTMLInputElement;
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
        } else if (operation === '-') {
            result = number_memory - temp_number;
        } else if (operation === '*') {
            result = temp_number * number_memory;
        } else if (operation === '/') {
            result = temp_number / number_memory;
        }
        console.log(`Result: ${result}`);
        operation = null;
        updateDisplay(result);
    }

    function operationSetValue(operation) {
        operation = operation;
        temp_number_for_reuse = number_memory;
    }

    for (let i = 0; i <= 9; i++) {
        document.querySelector(`#btn_${i}`)!.addEventListener('click', () => {
            console.log(`Button clicked btn_${i}`);
            if (operation === null) {
                number_memory = parseFloat(`${number_memory}${i}`);
            } else {
                temp_number = parseFloat(`${temp_number}${i}`);
            }
            updateDisplay(operation === null ? number_memory : temp_number);
        });
    }
    document.querySelector('#btn_plus')!.addEventListener('click', () => {
        operationSetValue('+');
    });
    document.querySelector('#minus')!.addEventListener('click', () => {
        operationSetValue('-');

    });
    document.querySelector('#btn_multiply')!.addEventListener('click', () => {
        operationSetValue('*');
    });
    document.querySelector('#btn_divide')!.addEventListener('click', () => {
        operationSetValue('/');
    });

    document.querySelector('#equal')!.addEventListener('click', () => {
        checkoperation(operation);
    });
    document.querySelector('#ac')!.addEventListener('click', () => {
        console.log('Button clicked ac');
        number_memory = 0;
        operation = null;
        temp_number = 0;
        result = 0;
        temp_number_for_reuse = 0;
        updateDisplay(result);
    });

    document.querySelector('#dc')!.addEventListener('click', () => {
        console.log('Button clicked delete');
        number_memory = Math.floor(number_memory / 10);
        updateDisplay(number_memory);
    });
});

