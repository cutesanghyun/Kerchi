let rivalHero = document.getElementById('rival-hero')
let myHero = document.getElementById('my-hero')
let rivalDeck = document.getElementById('rival-deck')
let myDeck = document.getElementById('my-deck')
let rivalDeckData = [];
let myDeckData = [];
let rivalHeroData;
let myHeroData;

function randomCard(hero) {
    if (hero) {
        this.atk = Math.ceil(Math.random() * 5);
        this.hp = Math.ceil(Math.random() * 5 + 25);
        this.hero = true;
    } else {
        this.atk = Math.ceil(Math.random() * 5);
        this.hp = Math.ceil(Math.random() * 5);
        this.cost = Math.floor((this.atk + this.hp) / 2);
    }
}
function cardFactory(hero) {
    return new randomCard(hero);
}
function cardDomLink(data, dom, hero) {
    let card = document.querySelector('.card-hidden .card').cloneNode(true);
    card.querySelector('.card-cost').textContent = data.cost;
    card.querySelector('.card-atk').textContent = data.atk;
    card.querySelector('.card-hp').textContent = data.hp; 
    if (hero) {
        card.querySelector('.card-cost').style.display = 'none';
        let name = document.createElement('div');
        name.textContent = 'Hero';
        card.appendChild(name);        
    }
    dom.appendChild(card);       
}
function createRivalDeck(N) {
    for (i = 0; i < N; i++) {
        rivalDeckData.push(cardFactory());
    }
    rivalDeckData.forEach(function (data) {
        cardDomLink(data, rivalDeck);
    });
}
function createMyDeck(N) {
    for (i = 0; i < N; i++) {
        myDeckData.push(cardFactory());
    }
    myDeckData.forEach(function (data) {
        cardDomLink(data, myDeck);
    });
}
function createRivalHero() {
    rivalHeroData = cardFactory(true);  
    cardDomLink(rivalHeroData, rivalHero, true);
}
function createMyHero() {
    myHeroData = cardFactory(true);
    cardDomLink(myHeroData, myHero, true)
}
function setting() {
    createRivalDeck(5);
    createMyDeck(5);
    createMyHero();
    createRivalHero();
}

setting();
