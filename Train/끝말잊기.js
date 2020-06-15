let question = document.querySelector("#question")
let answer = document.querySelector("#answer")
let calculate = document.querySelector("#calculate")
let result = document.querySelector("#result")
question.textContent = '바보'

calculate.addEventListener('click', () => {    
    if (answer.value[0] === question.textContent[question.textContent.length - 1]) {
        result.textContent = '딩동댕'
        question.textContent = answer.value  
        answer.value = '';                          
    } else {
        result.textContent = '땡입니다'   
        answer.value = '';             
    }
    answer.focus()  
});