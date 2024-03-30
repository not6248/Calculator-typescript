document.addEventListener("DOMContentLoaded", function () {
    let number_memory: number = 0;
    let temp_number: number = 0;
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
        console.log(`Display updated to ${number_memory}`);
        console.log(`Display updated to ${temp_number}`);
    }

    function updateOperationDisplay() {
        document.querySelector('#operation')!.innerHTML = operation !== null ? operation : '';
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
        let checkResult = result === 0
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

    function operationSetValue(value: string) {
        if (number_memory !== 0) {
            if (operation === null) {
                operation = value;
            } else {
                checkoperation(operation);
                temp_number = 0;
                operation = value;
            }
        }

        updateOperationDisplay();
        updateNumberTempDisplay();

    }

    for (let i = 0; i <= 9; i++) {
        document.querySelector(`#btn_${i}`)!.addEventListener('click', () => {
            console.log(`Button clicked btn_${i}`);
            if (result !== 0 && operation !== null) {
                number_memory = 0;
                temp_number = 0;
                result = 0;
                number_memory = parseFloat(`${number_memory}${i}`);
                updateDisplay(number_memory);
                resetOperation();
                return;
            }

            operation === null
                ? number_memory = parseFloat(`${number_memory}${i}`)
                : temp_number = parseFloat(`${temp_number}${i}`);
            updateDisplay(
                operation === null
                    ? number_memory
                    : temp_number);

            updateNumberTempDisplay();
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
        temp_number = 0;
        result = 0;
        resetOperation();
        updateDisplay(result);
    });

    document.querySelector('#dc')!.addEventListener('click', () => {
        if (!result) {
            console.log('Button clicked delete');
            if (operation === null) {
                number_memory = Math.floor(number_memory / 10);
            } else {
                temp_number = Math.floor(temp_number / 10);
            }
            updateDisplay(operation === null ? number_memory : temp_number);
            number_memory === 0 && resetOperation();
        }
    });
});

