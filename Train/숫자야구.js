let input = document.querySelector('#input')
let calculate = document.querySelector('#calculate')
let result = document.querySelector('#result')

number0 = []
for (i = 0; i < 10; i++) {
    number0.push(i)
}

answer = []
for (i = 0; i < 4; i++) {
    randomNumber = Math.floor(Math.random() * (10 - i))
    answer.push(number0[randomNumber])
    number0.splice(randomNumber, 1)
}

let count = 0
calculate.addEventListener('click', () => {
    if (count < 10) {
        if (input.value.length === 4) {
            if (answer.join('') === input.value) {
                result.append('홈런~!!', document.createElement('br'))
                result.append('새로운 게임을 하시려면 새로고침(f5)을 눌러주세요')
                count = count + 10
            } else {
                strike = 0
                ball = 0
                for (i = 0; i < 4; i++) {
                    if (answer[i] === Number(input.value.split('')[i])) {
                        strike = strike + 1
                    } else {
                        for (ii = 0; ii < 4; ii++) {
                            if (answer[i] === Number(input.value.split('')[ii])) {
                                ball = ball + 1
                            }
                        }
                    }
                }                
                result.append(`${input.value}: ${strike}스트라이크 ${ball}볼, 남은횟수:${10-count}회`, document.createElement('br'));
            }
            count = count + 1
        } else {
            result.append('4자리수를 입력해주세요', document.createElement('br'));
        }
    }
    if (count === 10) {
        result.append(`Game Over! 정답은 ${answer.join('')} 이었습니다.`, document.createElement('br'));
        result.append('새로운 게임을 하시려면 새로고침(f5)을 눌러주세요')
        count = count + 1
    }  
})


