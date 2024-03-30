document.addEventListener("DOMContentLoaded", function () {
    var currentNumber = 0;
    var temp_number = 0;
    var result = 0;
    var operation = null;
    var isTempShow = false; // Add this line
    var isCurrentNumberBtnClicked = false; // Add this line
    var display = document.querySelector('#display');
    display.innerHTML = temp_number.toString();
    function updateDisplay(value) {
        display.innerHTML = value.toString();
    }
    function updateOperationDisplay() {
        document.querySelector('#operation').innerHTML = operation !== null ? operation : '';
    }
    function updateNumberTempDisplay() {
        var tempDisplay;
        if (isTempShow && operation !== null) {
            tempDisplay = currentNumber;
        }
        else {
            tempDisplay = '';
        }
        document.querySelector('#temp').innerHTML = tempDisplay;
    }
    function resetOperation() {
        operation = null;
        updateOperationDisplay();
    }
    function checkoperation(operation) {
        var checkResult = result === 0; //มีผลลัพธ์หรือยัง
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
        updateDisplay(result ? "= ".concat(result) : currentNumber);
        isTempShow = false;
        updateNumberTempDisplay();
    }
    function operationSetValue(value) {
        console.log(!isTempShow);
        if (operation === null || !isTempShow) {
            operation = value;
            // if (result !== 0) {
            //     currentNumber = result; 
            //     result = 0; //
            // }
        }
        else {
            checkoperation(operation);
            operation = value;
            temp_number = 0;
        }
        updateOperationDisplay();
        updateNumberTempDisplay();
    }
    function ac() {
        currentNumber = 0;
        temp_number = 0;
        result = 0;
        resetOperation();
        updateNumberTempDisplay();
        updateDisplay(result);
    }
    function dc() {
        if (!result) {
            if (operation === null) {
                currentNumber = Math.floor(currentNumber / 10);
            }
            else {
                temp_number = Math.floor(temp_number / 10);
            }
            updateDisplay(operation === null ? currentNumber : temp_number);
            currentNumber === 0 && resetOperation();
        }
    }
    var _loop_1 = function (i) {
        document.querySelector("#btn_".concat(i)).addEventListener('click', function () {
            if (result !== 0 && operation !== null) {
                currentNumber = temp_number = result = parseFloat("".concat(0).concat(i));
                updateDisplay(currentNumber);
                resetOperation();
                return;
            }
            operation === null ? currentNumber = parseFloat("".concat(currentNumber).concat(i)) : temp_number = parseFloat("".concat(temp_number).concat(i));
            isTempShow = operation !== null;
            isCurrentNumberBtnClicked = true;
            updateDisplay(operation === null ? currentNumber : temp_number);
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
        ac();
    });
    document.querySelector('#dc').addEventListener('click', function () {
        dc();
    });
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Backspace') {
            dc();
        }
        if (event.key === 'Enter') {
            checkoperation(operation);
        }
    });
});
