const result = document.querySelector('#result');

document.querySelector('#calculate').addEventListener('click', () => {
    let inputValue = result.textContent;
    console.log(result.nodeValue);
    let addInputValue = document.textContent(inputValue);
    result.append(addInputValue);
});

document.querySelectorAll('button').forEach(function (e) {
    e.addEventListener('click', () => {
        let inputValue = e.firstChild.nodeValue;
        let addInputValue = document.createTextNode(inputValue);
        result.append(addInputValue);
    });
});

