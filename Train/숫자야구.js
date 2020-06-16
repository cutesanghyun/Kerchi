const input = document.querySelector('#input');
const result = document.querySelector('#result');
const check = document.querySelector('#check')
let question = [];
let count = 10;
function reset() {
    count = 10;
    question = [];
    let baseNum = [...Array(9).keys()].map((v) => v + 1);
    for (i = 0; i < 4; i++) {
        let ranNum = Math.floor(Math.random() * baseNum.length);
        question.push(baseNum.splice(ranNum, 1)[0]);
    }
}
reset();
check.addEventListener('click', () => {
    if (input.value.length === 4) {
        if (count <= 0) {
            answer = question.join('');
            result.append(document.createTextNode(`Game Over, 정답은 ${answer} 이었습니다.`));
            setTimeout(function () {
                result.innerHTML = '';
                reset();
            }, 5000);
        } else if (input.value === question.join('')) {
            result.append(document.createTextNode('홈런'));            
            setTimeout(function () {
                result.innerHTML = '';
                reset();
            }, 2500);
        } else {
            let strike = 0;
            let ball = 0;
            for (i = 0; i < 4; i++) {
                if (Number(input.value[i]) === question[i]) {
                    strike += 1;
                } else if (Number(input.value[i]) !== question[i] && question.includes(Number(input.value[i]))) {
                    ball += 1;
                }
            }
            count = count - 1;
            result.append(document.createTextNode(`[${input.value}] ${strike}strike ${ball}ball, 남은 시도: ${count}`), document.createElement('br'));
        }
    } else {
        alert('4자리 수를 입력해주세요');
    }
    input.value = '';
    input.focus();
});











