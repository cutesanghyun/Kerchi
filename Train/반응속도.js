let selscreen = document.querySelector('#screen');
let result = document.querySelector('#result');
let statScreen = {
};
let startTime;
let endTime;
let record = [];
let makeTimer;

selscreen.addEventListener('click', function () {
    if (selscreen.classList.contains('waiting')) {
        selscreen.classList.remove('waiting');
        selscreen.classList.add('ready');
        selscreen.textContent = '초록색으로 바뀌면 클릭'
        makeTimer = setTimeout(function () {
            startTime = new Date();            
            selscreen.click();            
        }, Math.floor(Math.random() * 1000) + 2000);
    } else if (selscreen.classList.contains('ready')) {
        if (!startTime) {
            clearTimeout(makeTimer);
            selscreen.classList.remove('ready');
            selscreen.classList.add('waiting');
            selscreen.textContent = '색이 바뀌고나서 클릭하세요.다시 시작하시려면 클릭'                        
        } else {            
            selscreen.classList.remove('ready');
            selscreen.classList.add('now');
            selscreen.textContent = '클릭 롸잇놔우'
        };
    } else if (selscreen.classList.contains('now')) {
        endTime = new Date();
        let timecheck = (endTime - startTime)/1000 + '초' ;
        let makeDiv = document.createElement('div');
        makeDiv.textContent = timecheck;         
        result.appendChild(makeDiv);
        record.push(endTime - startTime);
        selscreen.classList.remove('now');
        selscreen.classList.add('waiting');
        selscreen.textContent = '클릭하면 시작'
        startTime = null;
        endTime = null;
    };
});