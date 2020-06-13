let table = document.querySelector('#table')
let data = [];

function reset() {
    let fragment = document.createDocumentFragment();
    [1, 2, 3, 4].forEach(function () {
        let horData = [];
        data.push(horData);
        let tr = document.createElement('tr');
        [1, 2, 3, 4].forEach(function () {
            horData.push(0);
            let td = document.createElement('td');
            tr.appendChild(td);
        });
        fragment.appendChild(tr);
    });
    table.appendChild(fragment);
}

function createRandNumber() {
    let emptyList = [];
    data.forEach(function (horData, i) {
        horData.forEach(function (verData, j) {
            if (!verData) {
                emptyList.push([i, j]);
            }
        });
    });
    let randomTd = emptyList[Math.floor(Math.random() * emptyList.length)];
    data[randomTd[0]][randomTd[1]] = 2;
    Draw();
}
function Draw() {
    data.forEach(function (horData, i) {
        horData.forEach(function (verData, j) {
            if (verData > 0) {
                table.children[i].children[j].textContent = verData;
            } else {
                table.children[i].children[j].textContent = '';
            }
        });
    });
}

reset();
createRandNumber();
Draw();

let startDrag = false;
let dragging = false;
let startPosion;
let endPosition;
window.addEventListener('mousedown', function (event) {
    startDrag = true;
    startPosion = [event.clientX, event.clientY];
})
window.addEventListener('mousemove', function (event) {
    if (startDrag) {
        dragging = true;
    }
})
window.addEventListener('mouseup', function (event) {
    startDrag = false;
    endPosition = [event.clientX, event.clientY];
    let direction;
    let gapX = endPosition[0] - startPosion[0]; // 왼쪽이 마이너스 오른쪽이 플러스
    let gapY = endPosition[1] - startPosion[1]; // 위쪽이 마이너스 아래쪽이 플러스
    if (gapX < 0 && Math.abs(gapX) / Math.abs(gapY) > 1) {     //오 아, 아 왼, 왼 위, 위 오
        direction = 'left';
    } else if (gapX > 0 && Math.abs(gapX) / Math.abs(gapY) > 1) {
        direction = 'right';
    } else if (gapY < 0 && Math.abs(gapX) / Math.abs(gapY) < 1) {
        direction = 'up';
    } else if (gapY > 0 && Math.abs(gapX) / Math.abs(gapY) < 1) {
        direction = 'down';
    }
    startDrag = false;
    dragging = false;
    let newData = [[], [], [], []];
    switch (direction) {
        case 'left':
            data.forEach(function (horData, i) {
                horData.forEach(function (verData, j) {
                    if (verData) {                        
                        newData[i].push(verData)
                    }
                });
            });
            [1, 2, 3, 4].forEach(function (horData, i) {
                [1, 2, 3, 4].forEach(function (verData, j) {
                    data[i][j] = newData[i][j] || 0;
                });
            });
            break;
        case 'right':
            data.forEach(function (horData, i) {
                horData.forEach(function (verData, j) {
                    if (verData) {
                        newData[i].push(verData)
                    }
                });
            });
            [1, 2, 3, 4].forEach(function (horData, i) {
                [1, 2, 3, 4].forEach(function (verData, j) {
                    data[i][3-j] = newData[i][j] || 0;
                });
            });
            break;
        case 'up':
            data.forEach(function (horData, i) {
                horData.forEach(function (verData, j) {
                    if (verData) {
                        newData[j].push(verData)
                    }
                });
            });
            [1, 2, 3, 4].forEach(function (horData, i) {
                [1, 2, 3, 4].forEach(function (verData, j) {
                    data[i][j] = newData[j][i] || 0;
                });
            });
            break;
        case 'down':
            data.forEach(function (horData, i) {
                horData.forEach(function (verData, j) {
                    if (verData) {
                        newData[j].push(verData)
                    }
                });
            });
            [1, 2, 3, 4].forEach(function (horData, i) {
                [1, 2, 3, 4].forEach(function (verData, j) {
                    data[3 - i][j] = newData[j][i] || 0;
                });
            });
            break;
    }
    // createRandNumber();
    Draw();
})