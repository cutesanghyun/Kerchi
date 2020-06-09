let imagePosition = '-36px';
let RPS = {
    바위: '-36px',
    보: '-110px',
    가위: '-179px',
}

function cpuChoice(imagePosition) {
    return Object.entries(RPS).find(function (v) {
        return v[1] === imagePosition;
    })[0];
}

let makeInterval;
function intervalMaker() {
    makeInterval = setInterval(function () {
        if (imagePosition === RPS.바위) {
            imagePosition = RPS.보;
        } else if (imagePosition === RPS.보) {
            imagePosition = RPS.가위;
        } else {
            imagePosition = RPS.바위;
        }
        document.querySelector('#computer').style.background = 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSUjCM4YIjGNjXhqXeMdXD5rdY-5h2-keHlnhQe5gJdCxLFQ_zA&usqp=CAU) '
            + imagePosition + ' -32px';
    }, 100);
};
intervalMaker();

let dic = {
    가위: -1,
    바위: 0,
    보: 1,
}
document.querySelectorAll('.btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
        clearInterval(makeInterval);
        setTimeout(function () {
            intervalMaker();
        }, 1000);
        let myChoice = this.textContent;
        let minec = dic[myChoice];
        let cpusc = dic[cpuChoice(imagePosition)];
        let selectResult = document.querySelector('#result');
        if (minec === cpusc) {
            selectResult.textContent = '비겼습니다.'
        } else if ([-1,2].includes(minec - cpusc)) {
            selectResult.textContent = '이겼습니다.'
        } else {
            selectResult.textContent = '졌습니다.'
        }
    });
});

