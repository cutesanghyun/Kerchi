let a;
let b;
let operator;
let mathItUp = {
    '+': function(a,b) {return a+b},
    '-': function(a,b) {return a-b},
    '*': function(a,b) {return a*b},
    '/': function(a,b) {return a/b},
}
document.querySelector('#clear').addEventListener('click', () => {
    result.textContent = '';    
    a = 0;
    b = 0;
});
document.querySelector('#calculate').addEventListener('click', () => {
    b = Number(result.textContent);
    result.textContent = mathItUp[operator](a,b); 
    a = result.textContent;
    b = 0;
});
document.querySelector('#minus').addEventListener('click', () => {
    a = Number(result.textContent);    
    operator = '-';
    result.textContent = '';      
});
document.querySelector('#plus').addEventListener('click', () => {
    a = Number(result.textContent);    
    operator = '+';
    result.textContent = '';      
});
document.querySelector('#divide').addEventListener('click', () => {
    a = Number(result.textContent);    
    operator = '/';
    result.textContent = '';      
});
document.querySelector('#multiply').addEventListener('click', () => {
    a = Number(result.textContent);    
    operator = '*';
    result.textContent = '';      
});
document.querySelectorAll('.btn').forEach(function (e) {
    e.addEventListener('click', () => {
        let inputValue = e.firstChild.nodeValue;
        let addInputValue = document.createTextNode(inputValue);
        result.append(addInputValue);
    });
});

