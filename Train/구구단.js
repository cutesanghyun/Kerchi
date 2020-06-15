const question = document.querySelector('#question');
const input = document.querySelector('#input');
const calculate = document.querySelector('#calculate');
const result = document.querySelector('#result');

let questionNumber = Math.ceil(Math.random() * 9);
let questionNumber2 = Math.ceil(Math.random() * 9);
question.textContent = questionNumber + ' * ' + questionNumber2 + ' = ?';
let answer = questionNumber * questionNumber2;

calculate.addEventListener('click', () => {
    const inputValue = input.value;
    if (answer === Number(inputValue)) {
        result.textContent = '정답입니다.'
        input.value = ''
        input.focus()
    } else {
        result.textContent = '오답입니다. 등신이세요?'
        input.value = ''
        input.focus()
    }
    questionNumber = Math.ceil(Math.random() * 9);
    questionNumber2 = Math.ceil(Math.random() * 9);
    answer = questionNumber * questionNumber2;
    setTimeout(function() {
        question.textContent = questionNumber + ' * ' + questionNumber2 + ' = ?';
    }, 1000)
})