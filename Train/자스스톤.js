let rival = {
    hero: document.getElementById('rival-hero'),
    deck: document.getElementById('rival-deck'),
    cost: document.getElementById('rival-cost'),
    field: document.getElementById('rival-cards'),
    deckData: [],
    fieldData: [],
    heroData: [],    
}

let my = {
    hero: document.getElementById('my-hero'),
    deck: document.getElementById('my-deck'),
    cost: document.getElementById('my-cost'),
    field: document.getElementById('my-cards'),
    deckData: [],
    fieldData: [],
    heroData: [],    
}
let turnbtn = document.getElementById('turn-btn');
let turn = true;

function randomCard(hero, myCard) {
    if (hero) {
        this.atk = Math.ceil(Math.random() * 5);
        this.hp = Math.ceil(Math.random() * 5 + 25);
        this.hero = true;
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
function deckToField() {
    
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
    card.addEventListener('click', function(card) {
        let myCurrentcost = Number(my.cost.textContent);
        let rivalCurrentcost = Number(rival.cost.textContent);
        if (turn && data.mine && !data.hero && myCurrentcost >= data.cost && !data.field) {           
            let idx = my.deckData.indexOf(data);
            my.deckData.splice(idx, 1);
            my.fieldData.push(data);
            cardDomLink(data, my.field);
            my.deck.innerHTML = '';
            my.field.innerHTML = '';
            my.fieldData.forEach(function(data) {
                cardDomLink(data, my.field);                    
            });
            my.deckData.forEach(function(data) {
                cardDomLink(data, my.deck);                    
            });
            data.field = true;
            my.cost.textContent = myCurrentcost - data.cost;   
        } else if (!turn && !data.mine && !data.hero && rivalCurrentcost >= data.cost && !data.field){ 
            let idx = rival.deckData.indexOf(data);
            rival.deckData.splice(idx, 1);
            rival.fieldData.push(data);
            cardDomLink(data, rival.field);  
            rival.deck.innerHTML = '';
            rival.field.innerHTML = '';
            rival.fieldData.forEach(function(data) {
                cardDomLink(data, rival.field);                    
            });
            rival.deckData.forEach(function(data) {
                cardDomLink(data, rival.deck);                    
            });
            data.field = true;
            rival.cost.textContent = rivalCurrentcost - data.cost;
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
    my.heroData = cardFactory(true);
    cardDomLink(my.heroData, my.hero, true)
}
function setting() {
    createRivaldeck(5);
    createMydeck(5);
    createMyHero();
    createRivalHero();
}

setting();

turnbtn.addEventListener('click', function(){
    turn = !turn;
    if (turn) {
        my.cost.textContent = 10;
        let supply = 5 - rival.deckData.length;
        createRivaldeck(supply)
    } else {
        rival.cost.textContent = 10;
        let supply = 5 - my.deckData.length;
        createMydeck(supply)

    }
    document.getElementById('rival').classList.toggle('turn');
    document.getElementById('my').classList.toggle('turn');
});

