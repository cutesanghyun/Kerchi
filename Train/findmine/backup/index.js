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
    let mineNumSero = Array(ver).fill().map(function (el, ind) {
        return ind;
    });
    let shuffleSero = [];
    while (mineNumSero.length > 0) {
        let moveValue = mineNumSero.splice(Math.floor(Math.random() * mineNumSero.length), 1)[0];
        shuffleSero.push(moveValue);
    }

    //지뢰 위치(가로)
    let mineNumGaro = Array(hor).fill().map(function (el, ind) {
        return ind;
    });
    let shuffleGaro = [];
    while (mineNumGaro.length > 0) {
        let moveValue = mineNumGaro.splice(Math.floor(Math.random() * mineNumGaro.length), 1)[0];
        shuffleGaro.push(moveValue);
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
                let seroP = Array.prototype.indexOf.call(fatherTbody.children, tr);
                let garoP = Array.prototype.indexOf.call(fatherTr.children, td);
                if (event.currentTarget.textContent === '' || event.currentTarget.textContent === 'X') {
                    event.currentTarget.textContent = '!';                    
                    event.currentTarget.classList.add('flag');
                    if (dataset[seroP][garoP] === status.mined) {
                        dataset[seroP][garoP] = status.flagedMine;
                    } else {
                        dataset[seroP][garoP] = status.flaged;
                    }
                } else if (event.currentTarget.textContent === '!') {
                    event.currentTarget.textContent = '?';
                    event.currentTarget.classList.remove('flag');
                    event.currentTarget.classList.add('question');
                    if (dataset[seroP][garoP] === status.flagedMine) {
                        dataset[seroP][garoP] = status.questionedMine;
                    } else {
                        dataset[seroP][garoP] = status.questioned;
                    }
                } else if (event.currentTarget.textContent === '?') {
                    if (dataset[seroP][garoP] === status.questionedMine) {
                        event.currentTarget.textContent = 'X';                        
                        event.currentTarget.classList.remove('question');
                        dataset[seroP][garoP] = status.mined;
                    } else {
                        event.currentTarget.textContent = '';
                        dataset[seroP][garoP] = status.normaled;
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
                let seroP = Array.prototype.indexOf.call(fatherTbody.children, tr);
                let garoP = Array.prototype.indexOf.call(fatherTr.children, td);
                if ([status.opened, status.questioned, status.flaged, status.flagedMine, status.questionedMine].includes(dataset[seroP][garoP])) {
                    return;
                };
                event.currentTarget.classList.add('opened');
                openedNum += 1;
                if (dataset[seroP][garoP] === status.mined) {
                    event.currentTarget.textContent = '펑!';
                    document.querySelector('#result').textContent = '실패했습니다.';
                    stopFlag = true;
                } else {
                    let envir = [
                        dataset[seroP][garoP - 1], dataset[seroP][garoP + 1]
                    ];
                    if (dataset[seroP - 1]) {
                        envir = envir.concat(dataset[seroP - 1][garoP - 1], dataset[seroP - 1][garoP], dataset[seroP - 1][garoP + 1]);
                    };
                    if (dataset[seroP + 1]) {
                        envir = envir.concat(dataset[seroP + 1][garoP - 1], dataset[seroP + 1][garoP], dataset[seroP + 1][garoP + 1]);
                    };
                    let envirMineNum = envir.filter(function (v) {
                        return [status.mined, status.questionedMine, status.flagedMine].includes(v);
                    }).length;
                    event.currentTarget.textContent = envirMineNum || '';
                    dataset[seroP][garoP] = status.opened;
                    // 좌클릭했을때 주변 지뢰 없으면 
                    if (envirMineNum === 0) {
                        let envir = [];
                        if (tbody.children[seroP - 1]) {
                            envir = envir.concat([
                                tbody.children[seroP - 1].children[garoP - 1],
                                tbody.children[seroP - 1].children[garoP],
                                tbody.children[seroP - 1].children[garoP + 1]
                            ]);
                        }
                        envir = envir.concat([
                            tbody.children[seroP].children[garoP - 1],
                            tbody.children[seroP].children[garoP + 1]
                        ]);
                        if (tbody.children[seroP + 1]) {
                            envir = envir.concat([
                                tbody.children[seroP + 1].children[garoP - 1],
                                tbody.children[seroP + 1].children[garoP],
                                tbody.children[seroP + 1].children[garoP + 1]
                            ]);
                        };
                        envir.filter((v) => !!v).forEach(function (event) {
                            let fatherTr = event.parentNode;
                            let fatherTbody = event.parentNode.parentNode;
                            let seroP = Array.prototype.indexOf.call(fatherTbody.children, fatherTr);
                            let garoP = Array.prototype.indexOf.call(fatherTr.children, event);
                            if (dataset[seroP][garoP] !== status.opened) {
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
        let k = Math.floor(Math.random() * shuffleSero.length);
        let l = Math.floor(Math.random() * shuffleGaro.length);
        if (dataset[shuffleSero[k]][shuffleGaro[l]] === status.mined) {
            creatMine();
        } else {
            tbody.children[shuffleSero[k]].children[shuffleGaro[l]].textContent = 'X';
            dataset[shuffleSero[k]][shuffleGaro[l]] = status.mined;
            return;                
        }
    }
    for (i = 0; i < mine; i++) {
        creatMine();
    }
});