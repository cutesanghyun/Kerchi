let body = document.body;
let table = document.createElement('table');
let lines = [];
let boxes = [];
let turn = 'X';
let result = document.createElement('div');

let asyncCall = function (event) {
    let whatLine = lines.indexOf(event.target.parentNode);
    let whatBox = boxes[whatLine].indexOf(event.target);

    if (boxes[whatLine][whatBox].textContent === '') {
        boxes[whatLine][whatBox].textContent = turn;
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

        if (getWin) {
            result.textContent = turn + '`s Victory!'
            turn = 'X';
            boxes.forEach(function (line) {
                line.forEach(function (box) {
                    box.textContent = '';
                })
            });
        } else { 
            if (turn === 'X') {
                turn = 'O';
            } 
            setTimeout(function() {
                console.log('컴퓨터 턴,');
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
console.log(lines, boxes);


