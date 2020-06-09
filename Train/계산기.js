const result = document.querySelector('#result');

document.querySelector('#clear').addEventListener('click', () => {
    result.textContent = '';    
});

document.querySelector('#calculate').addEventListener('click', () => {
    let inputValue = result.textContent;    
});

document.querySelectorAll('.btn').forEach(function (e) {
    e.addEventListener('click', () => {
        let inputValue = e.firstChild.nodeValue;
        let addInputValue = document.createTextNode(inputValue);
        result.append(addInputValue);
    });
});

