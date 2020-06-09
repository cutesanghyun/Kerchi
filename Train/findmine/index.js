let tbody = document.querySelector('#table tbody');
let dataset = [];
let stopFlag = false;
let openedNum = 0;
let status = {
    opened: -1,
    questioned: -2,
    flaged: -3,
    flagedMine: -4,
    questionedMine: -5,
    mined: 1,
    normaled: 0,
}

document.querySelector('#exec').addEventListener('click', function () {
    tbody.innerHTML = '';
    dataset = [];
    openedNum = 0;
    stopFlag = false;
    let hor = parseInt(document.querySelector('#hor').value);
    let ver = parseInt(document.querySelector('#ver').value);
    let mine = parseInt(document.querySelector('#mine').value);

    // 지뢰 위치(세로)
    let mineNumY = Array(ver).fill().map(function (el, ind) {
        return ind;
    });
    let shuffleY = [];
    while (mineNumY.length > 0) {
        let moveValue = mineNumY.splice(Math.floor(Math.random() * mineNumY.length), 1)[0];
        shuffleY.push(moveValue);
    }

    //지뢰 위치(가로)
    let mineNumX = Array(hor).fill().map(function (el, ind) {
        return ind;
    });
    let shuffleX = [];
    while (mineNumX.length > 0) {
        let moveValue = mineNumX.splice(Math.floor(Math.random() * mineNumX.length), 1)[0];
        shuffleX.push(moveValue);
    }

    // 테이블 만들기     
    for (i = 0; i < ver; i++) {
        let arr = [];
        document.querySelector('#result').textContent = '';
        dataset.push(arr);
        let tr = document.createElement('tr')
        for (j = 0; j < hor; j++) {
            arr.push(status.normaled);
            let td = document.createElement('td');
            tr.appendChild(td);
            //우클릭할때
            td.addEventListener('contextmenu', function (event) {
                event.preventDefault();
                if (stopFlag) {
                    return;
                }
                let fatherTr = event.currentTarget.parentNode;
                let fatherTbody = event.currentTarget.parentNode.parentNode;
                let yPos = Array.prototype.indexOf.call(fatherTbody.children, tr);
                let xPos = Array.prototype.indexOf.call(fatherTr.children, td);
                if (event.currentTarget.textContent === '' || event.currentTarget.textContent === 'X') {
                    event.currentTarget.textContent = '!';                    
                    event.currentTarget.classList.add('flag');
                    if (dataset[yPos][xPos] === status.mined) {
                        dataset[yPos][xPos] = status.flagedMine;
                    } else {
                        dataset[yPos][xPos] = status.flaged;
                    }
                } else if (event.currentTarget.textContent === '!') {
                    event.currentTarget.textContent = '?';
                    event.currentTarget.classList.remove('flag');
                    event.currentTarget.classList.add('question');
                    if (dataset[yPos][xPos] === status.flagedMine) {
                        dataset[yPos][xPos] = status.questionedMine;
                    } else {
                        dataset[yPos][xPos] = status.questioned;
                    }
                } else if (event.currentTarget.textContent === '?') {
                    if (dataset[yPos][xPos] === status.questionedMine) {
                        event.currentTarget.textContent = 'X';                        
                        event.currentTarget.classList.remove('question');
                        dataset[yPos][xPos] = status.mined;
                    } else {
                        event.currentTarget.textContent = '';
                        dataset[yPos][xPos] = status.normaled;
                        event.currentTarget.classList.remove('question');
                    }
                }
            });
            //좌클릭할때
            td.addEventListener('click', function (event) {
                if (stopFlag) {
                    return;
                }
                let fatherTr = event.currentTarget.parentNode;
                let fatherTbody = event.currentTarget.parentNode.parentNode;
                let yPos = Array.prototype.indexOf.call(fatherTbody.children, tr);
                let xPos = Array.prototype.indexOf.call(fatherTr.children, td);
                if ([status.opened, status.questioned, status.flaged, status.flagedMine, status.questionedMine].includes(dataset[yPos][xPos])) {
                    return;
                };
                event.currentTarget.classList.add('opened');
                openedNum += 1;
                if (dataset[yPos][xPos] === status.mined) {
                    event.currentTarget.textContent = '펑!';
                    document.querySelector('#result').textContent = '실패했습니다.';
                    stopFlag = true;
                } else {
                    let envir = [
                        dataset[yPos][xPos - 1], dataset[yPos][xPos + 1]
                    ];
                    if (dataset[yPos - 1]) {
                        envir = envir.concat(dataset[yPos - 1][xPos - 1], dataset[yPos - 1][xPos], dataset[yPos - 1][xPos + 1]);
                    };
                    if (dataset[yPos + 1]) {
                        envir = envir.concat(dataset[yPos + 1][xPos - 1], dataset[yPos + 1][xPos], dataset[yPos + 1][xPos + 1]);
                    };
                    let envirMineNum = envir.filter(function (v) {
                        return [status.mined, status.questionedMine, status.flagedMine].includes(v);
                    }).length;
                    event.currentTarget.textContent = envirMineNum || '';
                    dataset[yPos][xPos] = status.opened;
                    // 좌클릭했을때 주변 지뢰 없으면 
                    if (envirMineNum === 0) {
                        let envir = [];
                        if (tbody.children[yPos - 1]) {
                            envir = envir.concat([
                                tbody.children[yPos - 1].children[xPos - 1],
                                tbody.children[yPos - 1].children[xPos],
                                tbody.children[yPos - 1].children[xPos + 1]
                            ]);
                        }
                        envir = envir.concat([
                            tbody.children[yPos].children[xPos - 1],
                            tbody.children[yPos].children[xPos + 1]
                        ]);
                        if (tbody.children[yPos + 1]) {
                            envir = envir.concat([
                                tbody.children[yPos + 1].children[xPos - 1],
                                tbody.children[yPos + 1].children[xPos],
                                tbody.children[yPos + 1].children[xPos + 1]
                            ]);
                        };
                        envir.filter((v) => !!v).forEach(function (event) {
                            let fatherTr = event.parentNode;
                            let fatherTbody = event.parentNode.parentNode;
                            let yPos = Array.prototype.indexOf.call(fatherTbody.children, fatherTr);
                            let xPos = Array.prototype.indexOf.call(fatherTr.children, event);
                            if (dataset[yPos][xPos] !== status.opened) {
                                event.click();
                            };
                        });
                    }
                }
                if (openedNum === hor * ver - mine) {
                    document.querySelector('#result').textContent = '클리어';
                    stopFlag = true;
                }
            });
        }
        tbody.appendChild(tr);
    }

    //지뢰 심기
    function creatMine() {
        let k = Math.floor(Math.random() * shuffleY.length);
        let l = Math.floor(Math.random() * shuffleX.length);
        if (dataset[shuffleY[k]][shuffleX[l]] === status.mined) {
            creatMine();
        } else {
            tbody.children[shuffleY[k]].children[shuffleX[l]].textContent = 'X';
            dataset[shuffleY[k]][shuffleX[l]] = status.mined;
            return;                
        }
    }
    for (i = 0; i < mine; i++) {
        creatMine();
    }
});