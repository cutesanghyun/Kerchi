let table = document.querySelector('#table');
let result = document.querySelector('#result');
data = [];
turn = 'X';
function reset() {
    result.textContent = `${turn}'s Victory`
    setTimeout(function () {
        table.innerHTML = '';
        result.innerHTML = '';
        data = [];
        turn = 'x';
        start();
    }, 2000);
}

function start() {
    for (let i = 0; i < 3; i++) {
        tr = document.createElement('tr');
        column = [];
        data.push(column);
        for (let j = 0; j < 3; j++) {
            let td = document.createElement('td');
            column.push(0)
            tr.append(td);
            td.addEventListener('click', () => {
                td.textContent = turn;                
                data[i][j] = turn;
                if (data[0][0] === turn && data[0][1] === turn && data[0][2] === turn ||
                    data[1][0] === turn && data[1][1] === turn && data[1][2] === turn ||
                    data[2][0] === turn && data[2][1] === turn && data[2][2] === turn ||
                    data[0][0] === turn && data[1][0] === turn && data[2][0] === turn ||
                    data[0][1] === turn && data[1][1] === turn && data[2][1] === turn ||
                    data[0][2] === turn && data[1][2] === turn && data[2][2] === turn) {
                    reset();
                } else if (data[0][0] === turn && data[1][1] === turn && data[2][2] === turn ||
                    data[2][0] === turn && data[1][1] === turn && data[0][2] === turn) {
                    reset();
                }
                if (turn === 'X') {
                    turn = 'O';
                } else {
                    turn = 'X';
                }
            });
        }
        table.append(tr);
    }
}
start();

