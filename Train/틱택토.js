let body = document.body;
let table = document.createElement('table');
let lines = [];
let boxes = [];
let turn = 'X';
let result = document.createElement('div');

function checkWinner(whatLine, whatBox) {
    let getWin = false;
    if (boxes[whatLine][0].textContent === turn && //가로줄 승리
        boxes[whatLine][1].textContent === turn &&
        boxes[whatLine][2].textContent === turn) {
        getWin = true;
    }
    if (boxes[0][whatBox].textContent === turn && //세로줄 승리
        boxes[1][whatBox].textContent === turn &&
        boxes[2][whatBox].textContent === turn) {
        getWin = true;
    }
    if (whatLine - whatBox === 0 || Math.abs(whatLine - whatBox) === 2) { ///대각선 승리
        if (boxes[0][0].textContent === turn &&
            boxes[1][1].textContent === turn &&
            boxes[2][2].textContent === turn) {
            getWin = true;
        }
        if (boxes[0][2].textContent === turn &&
            boxes[1][1].textContent === turn &&
            boxes[2][0].textContent === turn) {
            getWin = true;
        }
    }
    return getWin;
}
function reset(Draw) {
    if (Draw) {
        result.textContent = 'Draw';
    } else {
        result.textContent = turn + '`s Victory!'
    }
    setTimeout(function () {
        result.textContent = '';
        boxes.forEach(function (line) {
            line.forEach(function (box) {
                box.textContent = '';
            });
        });
        턴 = 'X';
    }, 1000);
}

let asyncCall = function (event) {
    if (turn === 'O') { //컴터 턴일때 내가 클릭못하게
        return;
    }
    let whatLine = lines.indexOf(event.target.parentNode);
    let whatBox = boxes[whatLine].indexOf(event.target);
    if (boxes[whatLine][whatBox].textContent === '') {
        boxes[whatLine][whatBox].textContent = turn;
        let getWin = checkWinner(whatLine, whatBox); 
        let cpuChoicereserv = [];
        boxes.forEach(function (line) {
            line.forEach(function (box) {
                cpuChoicereserv.push(box);
            });
        });
        cpuChoicereserv = cpuChoicereserv.filter(function (box) {
            return !box.textContent
        }); 
        if (getWin) {
            reset(false)
        } else if (cpuChoicereserv.length === 0) {
            reset(true);
        } else {
            if (turn === 'X') {
                turn = 'O';
            }
            setTimeout(function () {
                let cpuChoice = cpuChoicereserv[Math.floor(Math.random() * cpuChoicereserv.length)];
                cpuChoice.textContent = turn;
                let whatLine = lines.indexOf(cpuChoice.parentNode);
                let whatBox = boxes[whatLine].indexOf(cpuChoice);
                let getWin = checkWinner(whatLine, whatBox);
                if (getWin) {
                    reset();
                };
                turn = 'X';
            }, 1000);
        }
    } else {
        console.log('빈칸이 아닙니다')
    }
};

for (i = 0; i < 3; i++) {
    let line = document.createElement('tr');
    lines.push(line);
    boxes.push([]);
    for (j = 0; j < 3; j++) {
        let box = document.createElement('td');
        box.addEventListener('click', asyncCall);
        boxes[i].push(box);
        line.appendChild(box);
    }
    table.appendChild(line);
}

body.appendChild(table);
body.appendChild(result);



