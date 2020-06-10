let hor = 4;
let ver = 3;
let deck = document.createElement('div');
deck.className = 'deck';
let clickFlag = true;
let colors = [
    '#FFADC5', '#B8F3B8', '#CCD1FF', '#FFDDA6',
    '#EBE5E4', '#9197B5', '#FFADC5', '#B8F3B8',
    '#CCD1FF', '#FFDDA6', '#EBE5E4', '#9197B5'
];
let shuffleColors = [];
for (i = 0; colors.length > 0; i++) {
    shuffleColors = shuffleColors.concat(colors.splice(Math.floor(Math.random() * colors.length), 1));
}
console.log(shuffleColors);

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
            if (clickFlag) {
                card.classList.toggle('flipped');
            }
        });
        document.body.appendChild(deck);
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
        });
    }, 5000);
    
}
setCard(hor, ver);

