let hor = 4;
let ver = 3;
let deck = document.createElement('div');
deck.className = 'deck';
let clickFlag = true;
let clickCard = [];
let clearCard = [];
let startTime;
const colors = ['#FFADC5', '#B8F3B8', '#CCD1FF', '#FFDDA6', '#EBE5E4', '#9197B5', '#FFADC5', '#B8F3B8', '#CCD1FF', '#FFDDA6', '#EBE5E4', '#9197B5'];
let colorsBackup = colors.slice();
let shuffleColors = [];
function shuffle() {
    for (i = 0; colorsBackup.length > 0; i++) {
        shuffleColors = shuffleColors.concat(colorsBackup.splice(Math.floor(Math.random() * colorsBackup.length), 1));
    }
}
shuffle();

function setCard(hor, ver) {
    for (i = 0; i < hor * ver; i++) {
        clickFlag = false;
        let card = document.createElement('div');
        card.className = 'card';
        let cardInner = document.createElement('div');
        cardInner.className = 'card-inner';
        let cardFront = document.createElement('div');
        cardFront.className = 'card-front';
        let cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        cardBack.style.backgroundColor = shuffleColors[i];
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        deck.appendChild(card);
        card.addEventListener('click', function () {
            let targetCard = card
            if (clickFlag && !clearCard.includes(card)) {
                card.classList.toggle('flipped');
                clickCard.push(targetCard);
                if (clickCard.length === 2) {
                    if (clickCard[0].querySelector('.card-back').style.backgroundColor === clickCard[1].querySelector('.card-back').style.backgroundColor &&
                        clickCard[0].querySelector('.card-back') !== clickCard[1].querySelector('.card-back')) {
                        clearCard.push(clickCard[0]);
                        clearCard.push(clickCard[1]);
                        clickCard = [];
                        if (clearCard.length === ver * hor) {
                            let endTime = new Date();
                            setTimeout(function () {
                                alert('클리어 성공 ' + (endTime - startTime) / 1000 + '초 걸렸습니다.')
                                document.querySelector('.deck').innerHTML = '';
                                colorsBackup = colors.slice();
                                clearCard = [];
                                shuffleColors = [];
                                startTime = null;
                                shuffle();
                                setCard(hor, ver);
                            }, 1000)
                        }
                    } else {
                        clickFlag = false;
                        setTimeout(function () {
                            clickCard[0].classList.remove('flipped');
                            clickCard[1].classList.remove('flipped');
                            clickCard = [];
                            clickFlag = true;
                        }, 1000)
                    }
                }
            }
        });
        document.querySelector('#wrapper').appendChild(deck);
    }
    document.querySelectorAll('.card').forEach(function (card, index) {
        setTimeout(function () {
            card.classList.add('flipped');
        }, 1000 + 100 * index);
    });
    setTimeout(function () {
        document.querySelectorAll('.card').forEach(function (card, index) {
            card.classList.remove('flipped');
            clickFlag = true;
            startTime = new Date();
        });
    }, 3000);
}
setCard(hor, ver);

