let balls = Array(45).fill().map(function (ele, index) {
    return index + 1;
});

let shuffle = [];
while (balls.length > 0) {
    let moveValue = balls.splice(Math.floor(Math.random() * balls.length), 1)[0];
    shuffle.push(moveValue);
}

let bonus = shuffle[shuffle.length - 1];
let lottoNumber = shuffle
    .slice(0, 6)
    .sort(function (a, b) {
        return a - b;
    });

let selectResult = document.getElementById('result')
function paintBall(i, target) {
    ;
    let ball = document.createElement('div');
    ball.textContent = i;
    ball.style.display = 'inline-block';
    ball.style.border = '1px solid black';
    ball.style.borderRadius = '10px';
    ball.style.width = '20px';
    ball.style.height = '20px';
    ball.style.textAlign = 'center';
    ball.style.marginRight = '5px';
    console.log(Number(i));
    let ballColor;
    if (i <= 10) {
        ballColor = 'yellow';
    } else if (i <= 20) {
        ballColor = 'blue';
    } else if (i <= 30) {
        ballColor = 'red';
    } else if (i <= 40) {
        ballColor = 'black';
    } else if (i <= 45) {
        ballColor = 'green'
    }
    console.log(ballColor);
    ball.style.backgroundColor = ballColor;
    ball.style.color = 'gray';
    target.appendChild(ball);
};

setTimeout(function () {
    paintBall(lottoNumber[0], selectResult);
}, 500);
setTimeout(function () {
    paintBall(lottoNumber[1], selectResult);
}, 1000);
setTimeout(function () {
    paintBall(lottoNumber[2], selectResult);
}, 1500);
setTimeout(function () {
    paintBall(lottoNumber[3], selectResult);
}, 2000);
setTimeout(function () {
    paintBall(lottoNumber[4], selectResult);
}, 2500);
setTimeout(function () {
    paintBall(lottoNumber[5], selectResult);
}, 3000);

let selectlBonus = document.getElementsByClassName('lbonus')[0];
setTimeout(function () {
    selectlBonus.textContent = '보너스 번호는'
}, 3500);
setTimeout(function () {
    paintBall(bonus, selectlBonus);
}, 4000);







