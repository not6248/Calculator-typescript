document.addEventListener("DOMContentLoaded", function () {
    let currentNumber: number = 0;
    let temp_number: number = 0;
    let result: number = 0;
    let operation: string | null = null;
    let isTempShow: boolean = false; // Add this line

    const display = document.querySelector('#display') as HTMLInputElement;
    display.innerHTML = temp_number.toString();

    function updateDisplay(value) {
        display.innerHTML = value.toString();
    }

    function updateOperationDisplay() {
        document.querySelector('#operation')!.innerHTML = operation !== null ? operation : '';
    }

    function updateNumberTempDisplay() {
        let tempDisplay : any
        if (isTempShow && operation !== null) {
            tempDisplay  = currentNumber

        } else {
            tempDisplay  = '';
        }
        document.querySelector('#temp')!.innerHTML = tempDisplay;
    }

    function resetOperation() {
        operation = null;
        updateOperationDisplay();
    }

    function checkoperation(operation) {
        let checkResult = result === 0 //มีผลลัพธ์หรือยัง
        switch (operation) {
            case '+':
                result =
                    checkResult
                        ? temp_number + currentNumber
                        : result + temp_number; //ถ้ามีผลลัพธ์ ให้คำรวณต่อจากผลลัพธ์
                break;
            case '-':
                result =
                    checkResult
                        ? currentNumber - temp_number
                        : result - temp_number; //ถ้ามีผลลัพธ์ ให้คำรวณต่อจากผลลัพธ์
                break;
            case '*':
                result =
                    checkResult
                        ? temp_number * currentNumber
                        : result * temp_number; //ถ้ามีผลลัพธ์ ให้คำรวณต่อจากผลลัพธ์
                break;
            case '/':
                if (temp_number === 0) {
                    alert("Error: Cannot divide by zero!"); //แสดงข้อความเมื่อหารด้วย 0
                    return;
                }
                result =
                    checkResult
                        ? currentNumber / temp_number
                        : result / temp_number; //ถ้ามีผลลัพธ์ ให้คำรวณต่อจากผลลัพธ์
                break;
        }
        updateDisplay(result ? `= ${result}` : currentNumber);
        isTempShow = false;
        updateNumberTempDisplay();
    }

    function operationSetValue(value: string) {
        if (operation === null) {
            operation = value;
            // if (result !== 0) {
            //     currentNumber = result; 
            //     result = 0; //
            // }
        } else {
            checkoperation(operation);
            operation = value;
            temp_number = 0;
        }

        updateOperationDisplay();
        updateNumberTempDisplay();

    }

    for (let i = 0; i <= 9; i++) {
        document.querySelector(`#btn_${i}`)!.addEventListener('click', () => {
            if (result !== 0 && operation !== null) {
                currentNumber = temp_number = result = parseFloat(`${0}${i}`);
                updateDisplay(currentNumber);
                resetOperation();
                return;
            }

            operation === null ? currentNumber = parseFloat(`${currentNumber}${i}`) : temp_number = parseFloat(`${temp_number}${i}`);
            isTempShow = operation !== null;
            updateDisplay(operation === null ? currentNumber : temp_number);
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
        currentNumber = 0;
        temp_number = 0;
        result = 0;
        resetOperation();
        updateNumberTempDisplay();
        updateDisplay(result);
    });

    document.querySelector('#dc')!.addEventListener('click', () => {
        if (!result) {
            if (operation === null) {
                currentNumber = Math.floor(currentNumber / 10);
            } else {
                temp_number = Math.floor(temp_number / 10);
            }
            updateDisplay(operation === null ? currentNumber : temp_number);
            currentNumber === 0 && resetOperation();
        }
    });
});

