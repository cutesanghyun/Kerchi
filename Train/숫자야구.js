let input = document.querySelector('#input');
let result = document.querySelector('#result');
let check = document.querySelector('#check')
let question = [];
let strike = 0;
let ball = 0;
let count = 10;

function reset() {
    count = 10;
    question = [];
    let baseNum = [...Array(9).keys()].map((v) => v + 1);
    for (i = 0; i < 4; i++) {
        let ranNum = Math.floor(Math.random() * baseNum.length);
        question.push(baseNum.splice(ranNum, 1)[0]);
        console.log(question);
    }
}

reset();

check.addEventListener('click', () => {
    let addDiv = document.createElement('div');
    if (input.value.length === 4) {
        if (count <= 0) {
            addDiv.textContent = 'Game Over';
            result.append(addDiv);            
            setTimeout(function() {
                result.innerHTML = '';
                reset();
            }, 2500);
        } else if (Number(input.value) === Number(question.join(''))) {
            addDiv.textContent = '홈런';
            result.append(addDiv);        
            setTimeout(function() {
                result.innerHTML = '';
                reset();
            }, 2500);
        } else {
            for (i = 0; i < 4; i++) {
                if (Number(input.value[i]) === question[i]) {
                    strike = strike + 1;
                } else if (Number(input.value[i]) !== question[i] && question.includes(Number(input.value[i]))) {
                    ball = ball + 1;
                }
            }
            count = count - 1;
            addDiv.textContent = `${strike}strike ${ball}ball, 남은 시도: ${count}`
            result.append(addDiv);
            strike = 0;
            ball = 0;
        }
    } else {
        alert('4자리 수를 입력해주세요');
    }
});











