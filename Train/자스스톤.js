let rival = {
    hero: document.getElementById('rival-hero'),
    deck: document.getElementById('rival-deck'),
    cost: document.getElementById('rival-cost'),
    field: document.getElementById('rival-cards'),
    deckData: [],
    fieldData: [],
    heroData: [],
    selectedCard: null,
    selectedCardData: null,
}
let my = {
    hero: document.getElementById('my-hero'),
    deck: document.getElementById('my-deck'),
    cost: document.getElementById('my-cost'),
    field: document.getElementById('my-cards'),
    deckData: [],
    fieldData: [],
    heroData: [],
    selectedCard: null,
    selectedCardData: null,
}
let turnbtn = document.getElementById('turn-btn');
let turn = true;
function randomCard(hero, myCard) {
    if (hero) {
        this.atk = Math.ceil(Math.random() * 5);
        this.hp = Math.ceil(Math.random() * 5 + 25);
        this.hero = true;
        this.field = true;
    } else if (hero && myCard) {
        this.atk = Math.ceil(Math.random() * 5);
        this.hp = Math.ceil(Math.random() * 5 + 25);
        this.hero = true;
        this.field = true;
        this.mine = true;
    } else {
        this.atk = Math.ceil(Math.random() * 5);
        this.hp = Math.ceil(Math.random() * 5);
        this.cost = Math.floor((this.atk + this.hp) / 2);
    }
    if (myCard) {
        this.mine = true;
    }
}
function cardFactory(hero, myCard) {
    return new randomCard(hero, myCard);
}
function deckToField(data, myTurn) {   // 싹다지우고 새로 생성하다보니 의도치 않게 턴오버 클래스가 지워진다. 
    let obj = myTurn ? my : rival;     // 턴오버 클래스에 대한 데이터를 생성해주거나 지워지지 않게 예외처리 해야될듯하다.
    let idx = obj.deckData.indexOf(data);
    obj.deckData.splice(idx, 1);
    obj.fieldData.push(data);
    cardDomLink(data, obj.field);
    obj.deck.innerHTML = '';
    obj.field.innerHTML = '';
    obj.fieldData.forEach(function (data) {
        cardDomLink(data, obj.field);
        data.field = true;
    });
    obj.deckData.forEach(function (data) {
        cardDomLink(data, obj.deck);
        data.field = false;
    });
    let currentCost = Number(obj.cost.textContent);
    obj.cost.textContent = currentCost - data.cost;
}
function resetScreen(myTurn) {
    let obj = myTurn ? rival : my;
    obj.field.innerHTML = '';
    obj.hero.innerHTML = '';
    obj.fieldData.forEach(function (data) {
        cardDomLink(data, obj.field);
    });
    cardDomLink(obj.heroData, obj.hero, true);
}
function battle(data, myTurn) {
    let obj = myTurn ? my : rival;
    let obj2 = myTurn ? rival : my;
    data.hp = data.hp - obj.selectedCardData.atk;
    if (data.hp <= 0) {
        let inx = obj2.fieldData.indexOf(data);
        if (inx > -1) {
            obj2.fieldData.splice(inx, 1);
        } else {
            alert('Victory')
            setting();
            return;
        }
    }
    obj.selectedCard.classList.remove('card-selected')
    obj.selectedCard.classList.add('card-turnover')
    obj.selectedCard = null;
    obj.selectedCardData = null;
    resetScreen(myTurn);
    return;
}
function readyForBattle(card, data, myTurn) {
    let obj = myTurn ? my : rival;
    document.querySelectorAll('.card').forEach(function (card) {
        card.classList.remove('card-selected');
    });
    card.classList.add('card-selected');
    obj.selectedCardData = data;
    obj.selectedCard = card;
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
    card.addEventListener('click', function () {
        let myCurrentcost = Number(my.cost.textContent);
        let rivalCurrentcost = Number(rival.cost.textContent);
        let availableCard = !card.classList.contains('card-turnover')
        if (turn) {
            if (data.field && !data.mine && my.selectedCard) { //활성화된 카드로 공격대상 선정
                battle(data, true);
            }
            if (data.field && data.mine && availableCard) { //필드에 있는 턴오버되지않은 카드 선택해서 활성화
                readyForBattle(card, data, true);
            } else if (data.mine && !data.hero && myCurrentcost >= data.cost) {  //덱에서 필드로 카드 선택          
                deckToField(data, true);
            }
        } else {
            if (data.field && data.mine && rival.selectedCard) {
                battle(data, false);
            }
            if (data.field && !data.mine && availableCard) {
                readyForBattle(card, data, false);
            } else if (!data.mine && !data.hero && rivalCurrentcost >= data.cost) {
                deckToField(data, false);
            }
        }
    });
    dom.appendChild(card);
}
function createRivaldeck(N) {
    for (i = 0; i < N; i++) {
        rival.deckData.push(cardFactory());
    }
    rival.deck.innerHTML = '';
    rival.deckData.forEach(function (data) {
        cardDomLink(data, rival.deck);
    });
}
function createMydeck(N) {
    for (i = 0; i < N; i++) {
        my.deckData.push(cardFactory(false, true));
    }
    my.deck.innerHTML = '';
    my.deckData.forEach(function (data) {
        cardDomLink(data, my.deck);
    });
}
function createRivalHero() {
    rival.heroData = cardFactory(true);
    cardDomLink(rival.heroData, rival.hero, true);
}
function createMyHero() {
    my.heroData = cardFactory(true, true);
    cardDomLink(my.heroData, my.hero, true)
}
function setting() {
    [rival, my].forEach(function (item) {
        item.deckData = [];
        item.heroData = [];
        item.fieldData = [];
        item.selectedCard = [];
        item.selectedCardData = [];
    });
    createRivaldeck(5);
    createMydeck(5);
    createMyHero();
    createRivalHero();
    resetScreen(true);
    resetScreen(false);
}
setting();
turnbtn.addEventListener('click', function () {
    turn = !turn;
    if (turn) {
        my.cost.textContent = 10;
        let supply = 5 - my.deckData.length;
        createMydeck(supply)
    } else {
        rival.cost.textContent = 10;
        let supply = 5 - rival.deckData.length;
        createRivaldeck(supply)
    }
    document.getElementById('rival').classList.toggle('turn');
    document.getElementById('my').classList.toggle('turn');
    document.querySelectorAll('.card').forEach(function (card) {
        card.classList.remove('card-selected');
        card.classList.remove('card-turnover');
    });
});

